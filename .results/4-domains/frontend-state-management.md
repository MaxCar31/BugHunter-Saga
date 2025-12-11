# Frontend State Management Domain

## Overview
State management uses Zustand 4.5.7 with a custom "bound store" pattern that composes multiple domain slices into a single store. This provides lightweight, flexible global state without the complexity of Redux.

## Architecture Pattern: Bound Store with Slices

### Core Concept
Instead of creating multiple independent Zustand stores, all state slices are composed into one `useBoundStore` that combines:
- GoalXpSlice
- ModuleSlice
- LessonSlice
- LingotSlice
- SoundSettingsSlice
- StreakSlice
- UserSlice
- XpSlice
- QuestionsSlice
- LeagueSlice
- ShopSlice

### Implementation: useBoundStore.ts

```typescript
import { create } from "zustand";
import type { StateCreator } from "zustand";

// Import all slice types
import type { UserSlice } from "~/stores/createUserStore";
import { createUserSlice } from "~/stores/createUserStore";
// ... (other imports)

// Combine all slices into one type
type BoundState = GoalXpSlice &
  ModuleSlice &
  LessonSlice &
  LingotSlice &
  SoundSettingsSlice &
  StreakSlice &
  UserSlice &
  XpSlice &
  QuestionsSlice &
  LeagueSlice &
  ShopSlice;

// Custom StateCreator type for slice compatibility
export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

// Create the unified store using spread operator
export const useBoundStore = create<BoundState>((...args) => ({
  ...createGoalXpSlice(...args),
  ...createModuleSlice(...args),
  ...createLessonSlice(...args),
  ...createLingotSlice(...args),
  ...createSoundSettingsSlice(...args),
  ...createStreakSlice(...args),
  ...createUserSlice(...args),
  ...createXpSlice(...args),
  ...createQuestionsSlice(...args),
  ...createLeagueSlice(...args),
  ...createShopSlice(...args),
}));

// Optional: Initialize state on client-side
if (typeof window !== "undefined") {
  const currentModule = useBoundStore.getState().module;
  if (currentModule?.code) {
    useBoundStore.getState().loadQuestions(currentModule.code);
  }
}
```

## Slice Creation Pattern

### Example: createUserSlice.ts

```typescript
import dayjs from "dayjs";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

// 1. Define the slice type (state + actions)
export type UserSlice = {
  // State
  name: string;
  username: string;
  email: string;
  joinedAt: dayjs.Dayjs;
  loggedIn: boolean;
  
  // Actions (setters)
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setJoinedAt: (joinedAt: dayjs.Dayjs) => void;
  logIn: () => void;
  logOut: () => void;
};

// 2. Create the slice using BoundStateCreator
export const createUserSlice: BoundStateCreator<UserSlice> = (set) => ({
  // Initial state
  name: "",
  username: "",
  email: "",
  joinedAt: dayjs(),
  loggedIn: false,
  
  // Action implementations
  setName: (name: string) => set(() => ({ name })),
  setUsername: (username: string) => set(() => ({ username })),
  setEmail: (email: string) => set(() => ({ email })),
  setJoinedAt: (joinedAt: dayjs.Dayjs) => set(() => ({ joinedAt })),
  logIn: () => set(() => ({ loggedIn: true })),
  logOut: () => set(() => ({ loggedIn: false })),
});
```

### Slice Structure Requirements

1. **Export Type**: Always export the slice type interface
2. **BoundStateCreator**: Use the custom `BoundStateCreator<SliceType>` wrapper
3. **State + Actions**: Combine state properties and setter functions
4. **set() function**: Use Zustand's `set` with arrow function for updates
5. **Initial values**: Provide defaults for all state properties

## Usage in Components

### Accessing State
Use selector functions to access specific state:

```typescript
import { useBoundStore } from "~/hooks/useBoundStore";

const Component = () => {
  // Select single property
  const loggedIn = useBoundStore((x) => x.loggedIn);
  
  // Select multiple properties
  const { name, username, email } = useBoundStore((x) => ({
    name: x.name,
    username: x.username,
    email: x.email,
  }));
  
  // Access action directly
  const logIn = useBoundStore((x) => x.logIn);
  
  return (/* JSX */);
};
```

### Updating State
Call action functions from the store:

```typescript
const handleLogin = () => {
  useBoundStore.getState().setName("John");
  useBoundStore.getState().setEmail("john@example.com");
  useBoundStore.getState().logIn();
};

// Or from within component
const logIn = useBoundStore((x) => x.logIn);
const setName = useBoundStore((x) => x.setName);

const handleLogin = () => {
  setName("John");
  logIn();
};
```

## Domain-Specific Slices

### 1. UserSlice
Manages authentication state and user identity:
- `loggedIn: boolean`
- `name, username, email: string`
- `joinedAt: dayjs.Dayjs`
- Actions: `logIn()`, `logOut()`, setters

### 2. XpSlice
Tracks experience points:
- `xp: number`
- Actions: `setXp()`, `addXp()`

### 3. StreakSlice
Manages daily streak count:
- `streak: number`
- Actions: `setStreak()`, `incrementStreak()`

### 4. LingotSlice
Manages virtual currency:
- `lingots: number`
- Actions: `setLingots()`, `addLingots()`, `spendLingots()`

### 5. GoalXpSlice
Tracks daily XP goal:
- `goalXp: number`
- Actions: `setGoalXp()`

### 6. ModuleSlice
Tracks current module:
- `module: Module | null`
- Actions: `setModule()`

### 7. LessonSlice
Manages current lesson state:
- `lesson: Lesson | null`
- Actions: `setLesson()`, `clearLesson()`

### 8. QuestionsSlice
Manages lesson questions/problems:
- `questions: Problem[]`
- `currentQuestionIndex: number`
- Actions: `loadQuestions()`, `nextQuestion()`, `previousQuestion()`

### 9. SoundSettingsSlice
Manages audio preferences:
- `soundEffectsEnabled: boolean`
- Actions: `toggleSoundEffects()`

### 10. LeagueSlice
Manages leaderboard/league state:
- `league: League | null`
- `rank: number`
- Actions: `setLeague()`, `setRank()`

### 11. ShopSlice
Manages shop/store state:
- `shopItems: ShopItemDTO[]`
- `loading: boolean`
- `error: string | null`
- Actions: `setShopItems()`, `setLoading()`, `setError()`

## State Initialization

### Client-Side Initialization
Some state can be initialized when the store is created:

```typescript
if (typeof window !== "undefined") {
  const currentModule = useBoundStore.getState().module;
  if (currentModule?.code) {
    useBoundStore.getState().loadQuestions(currentModule.code);
  }
}
```

### localStorage Integration
While not built into the slices, state can be persisted manually:

```typescript
// On login
const handleLogin = (userData) => {
  localStorage.setItem('bh_token', userData.token);
  useBoundStore.getState().logIn();
  useBoundStore.getState().setName(userData.name);
  // ...
};

// On app load
useEffect(() => {
  const token = localStorage.getItem('bh_token');
  if (token) {
    // Fetch user data and populate store
    fetchUserProfile().then((profile) => {
      useBoundStore.getState().setName(profile.name);
      useBoundStore.getState().logIn();
    });
  }
}, []);
```

## Best Practices

### DO:
✅ Access state via `useBoundStore` hook
✅ Use selector functions for performance
✅ Create separate slices for different domains
✅ Export both type and creator from slice files
✅ Use `BoundStateCreator` type for slice compatibility
✅ Keep slices focused on single domain concern

### DON'T:
❌ Create multiple independent stores
❌ Use Redux or Context API for global state
❌ Put business logic in slices (keep them simple setters)
❌ Mutate state directly (always use `set()`)
❌ Forget to add new slices to useBoundStore composition
❌ Use field injection instead of selector functions

## Performance Optimization

### Selector Functions
Always use selector functions to prevent unnecessary re-renders:

```typescript
// ❌ BAD: Component re-renders when ANY state changes
const state = useBoundStore();

// ✅ GOOD: Component only re-renders when loggedIn changes
const loggedIn = useBoundStore((x) => x.loggedIn);
```

### Multiple Selectors
When selecting multiple values, return an object:

```typescript
const { name, email, lingots } = useBoundStore((x) => ({
  name: x.name,
  email: x.email,
  lingots: x.lingots,
}));
```

## Naming Conventions

1. **Slice files**: `createXxxSlice.ts` (e.g., `createUserSlice.ts`)
2. **Slice types**: `XxxSlice` (e.g., `UserSlice`)
3. **State properties**: camelCase (e.g., `loggedIn`, `dailyGoalXp`)
4. **Action functions**: verb-based (e.g., `setName`, `addXp`, `logIn`)
5. **Selectors**: Same as property name (e.g., `x => x.loggedIn`)

## Summary

The Bound Store pattern provides:
- **Single source of truth**: One store for all global state
- **Type safety**: Full TypeScript support across all slices
- **Composability**: Easy to add new slices without refactoring
- **Performance**: Selector-based subscriptions prevent unnecessary renders
- **Simplicity**: Lightweight alternative to Redux
- **Flexibility**: Each slice is independent but shares the same store
