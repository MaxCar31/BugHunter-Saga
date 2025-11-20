# Tech Stack Analysis - BugHunter Saga

## Core Technology Analysis

### Programming Languages
- **Frontend:** TypeScript (strict mode enabled with `noUncheckedIndexedAccess`)
- **Backend:** Java 17 (Spring Boot 3.4.11)
- **Build Tools:** 
  - Frontend: Next.js with pnpm
  - Backend: Gradle

### Primary Framework
**Frontend:** Next.js 14.2.11 (Pages Router)
- React 18.3.1
- Server-side rendering and static generation capabilities
- File-based routing system
- i18n configuration (currently English only)

**Backend:** Spring Boot 3.4.11
- Spring Data JPA for persistence
- Spring Security with OAuth2 Resource Server
- Spring Boot Admin for monitoring
- RESTful API architecture

### Secondary/Tertiary Frameworks

**Frontend Stack:**
- **State Management:** Zustand (4.5.7) - lightweight state management with bound stores pattern
- **Styling:** Tailwind CSS 3.4.11 with custom configuration
- **Date/Time:** dayjs (1.11.13)
- **Validation:** Zod (3.23.8) for runtime type validation
- **Environment Variables:** @t3-oss/env-nextjs for type-safe env validation

**Backend Stack:**
- **Data Access:** Spring Data JPA with Hibernate
- **Database Migration:** Flyway (flyway-core, flyway-database-postgresql)
- **Security:** Spring Security + JWT (jjwt 0.12.3)
- **Validation:** Spring Boot Starter Validation
- **Documentation:** SpringDoc OpenAPI (Swagger UI) 2.7.0
- **Object Mapping:** MapStruct 1.6.3 + Lombok forDTO/Entity conversions
- **Development:** Spring Boot DevTools

### State Management Approach
- **Frontend:** Zustand with slice pattern (createLingotSlice, createXpSlice, createStreakSlice, etc.)
  - Bound store pattern using `useBoundStore` hook
  - Multiple domain-specific slices: goals, leagues, lessons, lingots, modules, questions, settings, streaks, user, XP
- **Backend:** Stateless JWT-based authentication
  - No session management
  - Token-based authorization

### Database
- **Primary:** PostgreSQL
- **ORM:** Hibernate (via Spring Data JPA)
- **Migrations:** Flyway with versioned SQL scripts in `db/migration/`

### Other Relevant Technologies
- **Testing:** 
  - Backend: JUnit, Spring Security Test, Testcontainers for PostgreSQL
  - Frontend: (setup present but no test files in provided structure)
- **Code Quality:** ESLint, Prettier with Tailwind plugin
- **Containerization:** Docker with docker-compose.yml for backend deployment
- **Build Pattern:** T3 Stack inspired (create-t3-app metadata present)

---

## Domain Specificity Analysis

### Problem Domain
**Gamified Software Testing Education Platform**

BugHunter Saga is an interactive, gamified learning platform designed to teach software testing techniques and quality assurance concepts. It draws inspiration from language-learning apps (specifically Duolingo's UX patterns) but applies the mechanics to software testing education.

### Core Business Concepts

1. **Educational Content Structure**
   - **Modules:** High-level learning units (e.g., "Partición de Equivalencia", "Tablas de Decisión")
   - **Units:** Sub-sections within modules
   - **Lessons:** Individual learning sessions containing multiple problems
   - **Problems:** Individual questions/challenges with multiple types:
     - INFO: Informational content with objectives
     - MULTIPLE_CHOICE: Traditional multiple-choice questions
     - FILL_IN_THE_BLANK: Completion exercises
     - MATCH_PAIRS: Matching/pairing exercises

2. **Gamification Mechanics**
   - **XP (Experience Points):** Earned by completing lessons, tracked daily/weekly/total
   - **Lingots:** Virtual currency for in-app purchases (shop items)
   - **Streaks:** Daily activity tracking to encourage consistent learning
   - **Leaderboards/Leagues:** Competitive ranking based on weekly XP
   - **Treasure Chests:** Bonus rewards claimable after completing lessons
   - **Daily XP Goals:** Personalized daily targets (configurable by user)

3. **User Progress System**
   - Lesson completion tracking
   - Lesson status: LOCKED, ACTIVE, COMPLETE
   - Practice mode vs. first-time completion (affects rewards)
   - Correct answer counting and validation
   - XP history with timestamps

4. **Shop/Store System**
   - Virtual items purchasable with lingots
   - User inventory management
   - Insufficient funds handling

5. **User Profile Management**
   - Account details (name, username, email)
   - Settings (daily XP goal, sound effects toggle)
   - Authentication (JWT-based with forgot password flow)

### User Interactions

1. **Learning Flow**
   - Browse available modules
   - Select and complete lessons sequentially
   - Answer various question types
   - Receive immediate feedback
   - Track progress through units

2. **Progress Tracking**
   - View personal statistics (XP, lingots, streaks)
   - Check leaderboard rankings
   - Monitor daily/weekly goals
   - Claim treasure rewards

3. **Customization**
   - Adjust daily XP goals
   - Toggle sound effects
   - Update account information

4. **Social/Competitive**
   - Compare rankings with other learners
   - League-based competition

### Primary Data Types and Structures

**Frontend Types:**
```typescript
- Module: { moduleCode, name, description, color, unitCount }
- Unit: { title, description, tiles[] }
- Tile: { type: "star" | "dumbbell" | "book" | "trophy" | "fast-forward" | "treasure", 
         status: "LOCKED" | "ACTIVE" | "COMPLETE", lessonId, title }
- ModuleLesson: LessonInfo | LessonMultipleChoice | LessonFillInTheBlank | LessonMatchPairs
- UserProfileDTO: { userId, name, username, email, totalLingots, dailyXpGoal, soundEffectsEnabled, joinedDate }
- UserStatsDTO: { totalXp, todayXp, weeklyXp, currentStreak, totalLingots, leagueRank }
```

**Backend Domain Models:**
- User, UserProfile (with lingots, goals, settings)
- Module, Unit, Lesson, Problem (content hierarchy)
- UserLessonProgress, UserXpHistory (progress tracking)
- UserStreak (engagement tracking)
- ShopItem, UserInventory (economy system)
- League (competitive rankings)

---

## Application Boundaries

### Features CLEARLY In Scope

1. **Content Delivery**
   - Display learning modules, units, and lessons
   - Multiple problem types (info, multiple choice, fill-in-blank, match pairs)
   - Sequential lesson progression
   - Module-based curriculum organization

2. **Gamification**
   - XP earning and tracking (daily, weekly, total)
   - Lingot economy with shop
   - Daily streak tracking
   - League/leaderboard system
   - Treasure chest rewards
   - Progress visualization

3. **User Management**
   - Registration and login (JWT-based)
   - Profile viewing and editing
   - Settings management (XP goals, sound preferences)
   - Password recovery flow

4. **Progress Tracking**
   - Lesson completion recording
   - Answer validation and scoring
   - Historical progress data
   - Statistics dashboard

5. **Social Features**
   - Weekly leaderboards
   - League rankings
   - Competitive XP comparison

### Features OUTSIDE Scope (Based on Current Architecture)

1. **Real-time Collaboration**
   - No WebSocket infrastructure
   - No real-time multiplayer features
   - No live chat or messaging

2. **Advanced Content Creation**
   - No built-in content authoring tools
   - No rich media uploads (videos, animations)
   - Content appears to be database-seeded

3. **Third-party Integrations**
   - No social media login (OAuth providers)
   - No external API integrations visible
   - No analytics platforms (Google Analytics, etc.)

4. **Mobile Native Features**
   - Pure web application (no native mobile code)
   - No push notifications
   - No offline-first capabilities

5. **Advanced Testing Features**
   - No actual code execution/testing environment
   - No IDE integration
   - No automated test generation

### Architecturally Consistent Features

Features that would fit naturally:
- Additional problem types following existing patterns
- New gamification mechanics (badges, achievements)
- Enhanced statistics and analytics
- Community features (friends, challenges)
- Practice mode enhancements
- More shop items and customization options
- Multiple language support (i18n already configured)
- Additional learning modules following existing content structure

### Architecturally INCONSISTENT Features

Would require significant architectural changes:
- Real-time code execution/compilation
- Video streaming or conferencing
- Complex social networking features
- Native mobile app features
- Blockchain/NFT integration
- AI-powered content generation at runtime
- Multi-tenant SaaS architecture (currently single-tenant)

### Specialized Libraries and Domain Constraints

**Frontend Specialized Libraries:**
- dayjs: Indicates date/time is important (streaks, progress tracking)
- zustand: Suggests need for lightweight, flexible state management
- Tailwind CSS: Rapid UI development with utility-first approach

**Backend Specialized Libraries:**
- Flyway: Database schema must be versioned and migration-controlled
- MapStruct: Strong emphasis on clean architecture with DTO/Entity separation
- jjwt: Security-first approach with industry-standard token auth
- Testcontainers: Integration testing with real PostgreSQL instances

**Domain Constraints:**
1. **Hexagonal Architecture (Backend):** Clear separation of concerns with ports/adapters pattern
2. **JWT Statelessness:** All authentication must be token-based, no server-side sessions
3. **Sequential Learning:** Lessons must be completed in order (LOCKED → ACTIVE → COMPLETE)
4. **Transactional Integrity:** Lingot economy and progress must maintain consistency
5. **Immutable History:** XP history and progress records are append-only
6. **Daily/Weekly Cycles:** Time-based mechanics require date-aware business logic

---

## Summary

BugHunter Saga is a **Next.js + Spring Boot gamified educational platform** that teaches software testing concepts through a Duolingo-inspired interface. The architecture emphasizes:

- **Clean separation:** Hexagonal architecture on backend, domain-driven design
- **Type safety:** TypeScript strict mode, Zod validation, MapStruct mappings
- **Gamification-first:** XP, lingots, streaks, leagues as core features
- **Stateless authentication:** JWT-based security
- **Sequential learning:** Structured curriculum with progression mechanics
- **Database-driven content:** PostgreSQL with Flyway migrations

The platform is well-suited for expanding educational content, enhancing gamification mechanics, and adding community features, but would require architectural refactoring for real-time collaboration, code execution environments, or native mobile features.
