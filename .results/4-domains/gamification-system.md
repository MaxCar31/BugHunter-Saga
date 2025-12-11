# Gamification System Domain

## Overview
BugHunter Saga uses a comprehensive gamification system modeled after Duolingo to motivate learning software testing concepts. The system includes XP (experience points), streaks, lingots (virtual currency), leaderboards, and progress tracking.

## Core Gamification Elements

### 1. **XP (Experience Points)**
The primary reward system for completing learning activities.

#### XP Calculation Logic
```java
// From CompleteLessonService.java
@Value("${app.rewards.lesson.baseXp:10}")
private int BASE_XP;

int xpEarned = BASE_XP + command.getCorrectAnswerCount();
```

**XP Formula:**
- Base XP per lesson: 10 points (configurable via `app.rewards.lesson.baseXp`)
- Bonus XP: +1 point per correct answer
- Total XP = Base XP + Correct Answer Count

**XP Tracking:**
All XP is stored in `UserXpHistory` with:
- `userId`: Who earned it
- `xpEarned`: How much
- `sourceType`: Where it came from (e.g., "LESSON")
- `sourceId`: Which specific lesson/activity
- `createdAt`: Timestamp

```java
// Saving XP History
userXpHistoryRepositoryPort.save(UserXpHistory.builder()
    .userId(currentUser.getId())
    .xpEarned(xpEarned)
    .sourceType("LESSON")
    .sourceId(command.getLessonId())
    .createdAt(now)
    .build());
```

#### XP Goals
Users can set daily XP goals:
- Available goals: 1, 10, 20, 30, 50 XP per day
- Stored in `UserProfile.dailyXpGoal`
- Frontend tracks progress toward goal
- Motivates daily engagement

### 2. **Lingots (Virtual Currency)**
The in-game currency used to purchase items in the shop.

#### Earning Lingots

**Completing Lessons (First Time Only):**
```java
@Value("${app.rewards.lesson.lingot:5}")
private int LINGOT_REWARD;

// Lingots only awarded on first completion
int lingotsEarned = command.getIsPractice() ? 0 : LINGOT_REWARD;
```

- First lesson completion: 5 lingots (configurable via `app.rewards.lesson.lingot`)
- Practice mode: 0 lingots (no double-dipping)
- Prevents repeated farming of same lesson

**Claiming Treasure Lessons:**
```java
@Value("${app.rewards.treasure:20}")
private int TREASURE_REWARD_LINGOTS;

userProfile.setLingots(userProfile.getLingots() + TREASURE_REWARD_LINGOTS);
```

- Treasure lessons award: 20 lingots (configurable via `app.rewards.treasure`)
- One-time claim per treasure
- Special lesson type separate from regular lessons

#### Spending Lingots
Lingots are spent in the shop on virtual items (streak freezes, power-ups, cosmetics):

```java
// From PurchaseItemService (conceptual)
if (userProfile.getLingots() < shopItem.getPrice()) {
    throw new InsufficientLingotsException();
}

userProfile.setLingots(userProfile.getLingots() - shopItem.getPrice());
```

#### Lingot Persistence
- Stored in `UserProfile.lingots` (Integer)
- Updated transactionally with lesson completion
- Current total returned in `CompleteLessonResult` and `ClaimTreasureResult`

### 3. **Streaks (Daily Activity Tracking)**
The streak system encourages daily engagement by tracking consecutive days of activity.

#### Streak Calculation Algorithm

```java
/**
 * Central streak logic: counts consecutive days backward from today.
 */
private int calculateAndUpdateStreak(UUID userId, LocalDate today) {
    // 1. Get all activity dates for user
    Set<LocalDate> allDates = userStreakRepositoryPort.findAllActivityDatesByUserId(userId);

    // 2. Record today's activity (if not already recorded)
    if (!allDates.contains(today)) {
        userStreakRepositoryPort.save(UserStreak.builder()
            .userId(userId)
            .activityDate(today)
            .build());
        
        allDates.add(today);
    }

    // 3. Count backwards from today
    int currentStreak = 0;
    LocalDate dayToCheck = today;

    while (allDates.contains(dayToCheck)) {
        currentStreak++;
        dayToCheck = dayToCheck.minusDays(1);  // Move back one day
    }

    return currentStreak;
}
```

**Streak Logic Rules:**
- ✅ Activity recorded once per day (idempotent)
- ✅ Streak counts consecutive days including today
- ✅ Missing one day breaks the streak
- ✅ Calculated on-the-fly (not stored as a number)
- ✅ Uses `Clock` injection for testability

**Example Scenarios:**

| Activity Dates | Today | Result | Explanation |
|----------------|-------|--------|-------------|
| [2024-01-10, 2024-01-11, 2024-01-12] | 2024-01-12 | 3 | Three consecutive days |
| [2024-01-10, 2024-01-11, 2024-01-13] | 2024-01-13 | 1 | Missed day 12, streak reset |
| [2024-01-05, 2024-01-10, 2024-01-11] | 2024-01-11 | 2 | Only counts from day 10 onward |
| [] | 2024-01-12 | 1 | First day of activity |

#### Streak Persistence
- Stored in `UserStreak` table with composite key `(userId, activityDate)`
- Each row represents one day of activity
- Streak number calculated dynamically, not stored

### 4. **Lesson Progress Tracking**
Tracks which lessons each user has completed.

#### Progress Model
```java
UserLessonProgress.builder()
    .userId(currentUser.getId())
    .lessonId(command.getLessonId())
    .completedAt(now)
    .build()
```

**Fields:**
- `userId` + `lessonId`: Composite primary key
- `completedAt`: Timestamp of first completion

#### Progress Validation

**Preventing Duplicate Completions:**
```java
// Check if lesson already completed
boolean alreadyCompleted = userLessonProgressRepositoryPort
    .existsByUserIdAndLessonId(userId, lessonId);

if (alreadyCompleted) {
    throw new LessonAlreadyCompletedException("Lección ya completada: " + lessonId);
}
```

**Practice Mode:**
- Allows replaying completed lessons
- Uses `command.getIsPractice()` flag
- Earns XP but NOT lingots
- Does NOT update progress (already exists)

### 5. **Leaderboards (League System)**
Users compete in leagues based on XP earned over time periods.

#### League Calculation
- Ranks users by total XP
- Typically organized by time periods (weekly, monthly)
- Uses `UserXpHistory` aggregation for ranking
- Retrieved via `GetLeaderboardService`

**Conceptual Query:**
```sql
SELECT user_id, SUM(xp_earned) as total_xp
FROM user_xp_history
WHERE created_at >= [period_start]
GROUP BY user_id
ORDER BY total_xp DESC
LIMIT 10;
```

#### Leaderboard Response
Returns top users with:
- Username
- Total XP
- Rank position
- Current user's position (even if not in top 10)

### 6. **Lesson Types**
Different lesson types provide variety in gameplay:

| Lesson Type | Behavior | XP | Lingots | Purpose |
|-------------|----------|-------|---------|---------|
| `normal` | Standard problems | Base + Correct | 5 (first time) | Core learning |
| `treasure` | Claim-only | 0 | 20 (one-time) | Bonus rewards |
| `practice` | Replay mode | Base + Correct | 0 | Skill reinforcement |
| `boss` | Harder problems | Base + Correct | 10 (first time) | Milestone challenges |

### 7. **Shop System**
Virtual items purchasable with lingots.

#### Shop Items
Items are stored in the `shop_items` table and managed via `ShopItemRepositoryPort`:
- **Streak Freeze**: Protects streak if you miss a day
- **Double XP**: 2x XP for next lesson
- **Outfits/Cosmetics**: Visual customization
- **Bonus Content**: Extra lessons or hints

Each item has:
- `itemCode`: Unique identifier (e.g., "streak-freeze")
- `name`: Display name (e.g., "Congelador de Racha")
- `description`: Item description
- `cost`: Price in lingots
- `itemType`: Category (POWER_UP, COSMETIC, CONSUMABLE)

#### Shop API Services

**GetShopItemsService:**
```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetShopItemsService implements GetShopItemsUseCase {
    private final ShopItemRepositoryPort shopItemRepositoryPort;
    private final UserRepositoryPort userRepositoryPort;

    @Override
    public List<ShopItem> getShopItems() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado: " + username));
        
        // Returns only items user hasn't purchased (or can purchase multiple times)
        return shopItemRepositoryPort.findAvailableItemsForUser(currentUser.getId());
    }
}
```

**PurchaseItemService:**
```java
@Service
@RequiredArgsConstructor
public class PurchaseItemService implements PurchaseItemUseCase {
    private final UserRepositoryPort userRepositoryPort;
    private final UserProfileRepositoryPort userProfileRepositoryPort;
    private final ShopItemRepositoryPort shopItemRepositoryPort;
    private final UserInventoryRepositoryPort userInventoryRepositoryPort;
    private final GetUserStatsUseCase getUserStatsUseCase;
    private final Clock clock;

    @Override
    @Transactional
    public UserStatsResult purchaseItem(String itemCode) {
        // 1. Get current user and profile
        User currentUser = getCurrentUser();
        UUID userId = currentUser.getId();
        UserProfile userProfile = getUserProfile(userId);

        // 2. Validate item exists
        ShopItem item = shopItemRepositoryPort.findByItemCode(itemCode)
                .orElseThrow(() -> new ResourceNotFoundException("Artículo no encontrado: " + itemCode, itemCode));

        // 3. Validate sufficient lingots
        if (userProfile.getLingots() < item.getCost()) {
            throw new InsufficientFundsException("Fondos insuficientes. Necesita " + item.getCost() + " lingots.");
        }

        // 4. Deduct lingots
        userProfile.setLingots(userProfile.getLingots() - item.getCost());
        userProfileRepositoryPort.save(userProfile);

        // 5. Add to inventory (update quantity if exists)
        Optional<UserInventory> existingInventory = userInventoryRepositoryPort
                .findByUserIdAndItemCode(userId, itemCode);

        UserInventory inventoryToSave;
        if (existingInventory.isPresent()) {
            inventoryToSave = existingInventory.get();
            inventoryToSave.setQuantity(inventoryToSave.getQuantity() + 1);
        } else {
            inventoryToSave = UserInventory.builder()
                    .userId(userId)
                    .itemCode(itemCode)
                    .quantity(1)
                    .createdAt(ZonedDateTime.now(clock))
                    .build();
        }
        userInventoryRepositoryPort.save(inventoryToSave);

        // 6. Return updated stats
        return getUserStatsUseCase.getUserStats();
    }
}
```

#### Frontend Integration
Shop state managed via Zustand `ShopSlice`:

```typescript
// From createShopSlice.ts
export type ShopSlice = {
    shopItems: ShopItemDTO[];
    loading: boolean;
    error: string | null;
    setShopItems: (items: ShopItemDTO[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};
```

**Shop Service:**
```typescript
// From shopService.ts
export const getShopItems = async (): Promise<ShopItemDTO[]> => {
  const response = await fetch(`${apiBase}/shop/items`, {
    headers: createAuthHeaders(),
  });
  return response.json();
};

export const purchaseItem = async (itemId: string): Promise<UserStatsDTO> => {
  const response = await fetch(`${apiBase}/shop/purchase/${itemId}`, {
    method: 'POST',
    headers: createAuthHeaders(),
  });
  return response.json();
};
```

## Transactional Integrity

### Critical Transaction Boundaries

All reward-granting operations use `@Transactional`:

```java
@Service
@RequiredArgsConstructor
public class CompleteLessonService implements CompleteLessonUseCase {

    @Override
    @Transactional  // All-or-nothing: XP, lingots, progress, streak
    public CompleteLessonResult handle(CompleteLessonCommand command) {
        // 1. Save lesson progress
        // 2. Save XP history
        // 3. Update lingots
        // 4. Update streak
        // All succeed or all rollback
    }
}
```

**Why Transactional?**
- Prevents partial rewards (e.g., XP awarded but lingots not)
- Ensures database consistency
- Atomic streak calculation
- Rollback on validation failures

### Read-Only Queries

Services that only query data use `@Transactional(readOnly = true)`:

```java
@Service
@Transactional(readOnly = true)
public class GetUserStatsService implements GetUserStatsUseCase {
    // Only reads data, no writes
}
```

## Configuration Properties

All reward values are externalized for easy tuning:

```properties
# application.properties
app.rewards.lesson.baseXp=10           # Base XP per lesson
app.rewards.lesson.lingot=5            # Lingots for first completion
app.rewards.treasure=20                # Lingots for treasure lessons
```

Benefits:
- ✅ Change rewards without code changes
- ✅ Different values per environment (dev, prod)
- ✅ Easy A/B testing of reward structures

## Result Objects

Services return structured results with all reward details:

### CompleteLessonResult
```java
public class CompleteLessonResult {
    private int xpEarned;          // XP awarded this lesson
    private int lingotsEarned;     // Lingots awarded this lesson
    private int totalLingots;      // New lingot balance
    private int streak;            // Current streak count
}
```

### ClaimTreasureResult
```java
public class ClaimTreasureResult {
    private int lingotsEarned;     // Lingots from treasure
    private int totalLingots;      // New lingot balance
}
```

These objects:
- ✅ Provide immediate feedback to frontend
- ✅ Show incremental rewards (earned) and totals
- ✅ Enable animations/celebrations in UI
- ✅ Self-documenting API responses

## Frontend Integration

### Displaying Rewards
Frontend components display gamification elements:

```typescript
// From TopBar.tsx (conceptual)
<div className="xp-display">
  <FireIcon /> {userXp} XP
</div>
<div className="lingot-display">
  <GemIcon /> {lingots}
</div>
<div className="streak-display">
  <FlameIcon /> {streak} day streak
</div>
```

### Celebrating Achievements
After lesson completion:

```typescript
// From TreasureCelebration.tsx
const celebrateRewards = (result: CompleteLessonResult) => {
  showXpAnimation(result.xpEarned);
  if (result.lingotsEarned > 0) {
    showLingotAnimation(result.lingotsEarned);
  }
  if (result.streak > prevStreak) {
    showStreakAnimation(result.streak);
  }
};
```

### Zustand State Updates
Reward results update global state:

```typescript
// After lesson completion API call
const result = await lessonService.completeLesson(data);

// Update Zustand stores
useBoundStore.getState().addXp(result.xpEarned);
useBoundStore.getState().setLingots(result.totalLingots);
useBoundStore.getState().setStreak(result.streak);
```

## Anti-Cheating Measures

### 1. **Idempotency**
- Lesson progress uses composite key (`userId`, `lessonId`)
- Cannot complete same lesson twice for rewards
- `existsByUserIdAndLessonId()` check before rewards

### 2. **Practice Mode Flag**
- `isPractice` flag prevents lingot farming
- Replay completed lessons for XP only
- Frontend must send correct flag

### 3. **Transactional Atomicity**
- All reward operations in single transaction
- Prevents race conditions
- Rollback on any failure

### 4. **Server-Side Validation**
- All reward calculations on backend
- Frontend cannot spoof XP/lingot amounts
- Lesson existence validated before rewards

### 5. **Streak Integrity**
- Streak calculated from persistent date records
- Cannot manipulate streak count directly
- Uses `Clock` injection (can mock for testing)

## Best Practices

### DO:
✅ Use `@Transactional` for all reward-granting operations
✅ Externalize reward values to application.properties
✅ Validate lesson completion status before awarding
✅ Return structured result objects with all reward details
✅ Calculate streaks dynamically from activity dates
✅ Use `Clock` injection for testable date logic
✅ Check `isPractice` flag to prevent lingot farming

### DON'T:
❌ Store streak count as a number (calculate from dates)
❌ Allow frontend to send XP/lingot amounts
❌ Award lingots in practice mode
❌ Forget to check for existing lesson progress
❌ Use `new Date()` or `LocalDate.now()` directly (inject Clock)
❌ Return partial reward information
❌ Mix read-only and write operations in same transaction

## Summary

The gamification system provides:
- **XP System**: Base + bonus formula, daily goals, full history tracking
- **Lingot Economy**: Earned from lessons/treasures, spent in shop, transactional updates
- **Streak Tracking**: Consecutive day calculation, activity date persistence, motivational feedback
- **Progress System**: Idempotent lesson completion, practice mode support
- **Leaderboards**: XP-based ranking, competitive motivation
- **Shop System**: Virtual items, lingot spending
- **Transactional Safety**: All-or-nothing reward granting
- **Configuration**: Externalized reward values for easy tuning
- **Anti-Cheating**: Idempotency, server-side validation, transactional integrity
