# Frontend UI Domain

## Overview
The frontend UI is built with React 18, Next.js 14 Pages Router, and Tailwind CSS. Components follow a functional, TypeScript-first approach with strict typing and mobile-first responsive design.

## Component Structure

### Organization Pattern
```
components/
├── [TopLevel].tsx          # Global navigation (TopBar, BottomBar, LeftBar, RightBar)
├── learn/                  # Learn page specific components
│   ├── TileIcon.tsx
│   ├── UnitHeader.tsx
│   └── ...
└── lessons/                # Lesson page specific components
    ├── MultipleChoiceQuestion.tsx
    ├── FillInTheBlankQuestion.tsx
    └── ...
```

### Component Patterns

**1. Export Pattern**
```typescript
// Named export for component
export const BottomBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  // Implementation
};

// Type definitions co-located
export type Tab = "Aprender" | "Tienda" | "Perfil" | "Clasificaciones";
```

**2. Props Typing**
All props must be explicitly typed inline or via interface:
```typescript
interface TileIconProps {
  tileType: TileType;
  status: TileStatus;
}

export const TileIcon = ({ tileType, status }: TileIconProps): JSX.Element => {
  // Implementation
};
```

**3. State Access Pattern**
Use Zustand store via `useBoundStore` hook:
```typescript
import { useBoundStore } from "~/hooks/useBoundStore";

export const useBottomBarItems = () => {
  const loggedIn = useBoundStore((x) => x.loggedIn);
  // Use state...
};
```

## Styling Conventions

### Tailwind CSS Utility Classes
- **Mobile-first**: Base classes for mobile, `md:` breakpoint for desktop
- **Fixed positioning**: Bottom navigation is `fixed bottom-0 left-0 right-0`
- **Flexbox layout**: Use `flex` with `items-center` and `justify-center`
- **Custom spacing**: Use bracket notation for precise values: `h-[88px]`, `w-[50px]`
- **Conditional classes**: Use ternary for active states

Example from BottomBar:
```typescript
className={
  item.name === selectedTab
    ? "rounded-xl border-2 border-[#84d8ff] bg-[#ddf4ff] px-2 py-1"
    : "px-2 py-1"
}
```

### Color Palette
- Primary: `#4F46E5` (indigo)
- Background: `#FFFFFF` (white)
- Border: `#E5E5E5` (light gray)
- Active/Selected: `#84D8FF` (light blue) with `#DDF4FF` background
- Gray tones: `#6B7280`, `#312E81`

## SVG Icons

### Icon System Architecture
Icons are organized in a **modular structure** (76 total icon components) replacing the old monolithic `Svgs.tsx`:

```
components/icons/
├── index.ts                    # Main export barrel
├── gamification/               # 19 gamification icons
│   ├── index.ts
│   ├── BadgeBugHunterSvg.tsx
│   ├── BadgeQualityInspectorSvg.tsx
│   ├── CheckmarkSvg.tsx
│   ├── EmptyFireSvg.tsx
│   ├── FireSvg.tsx
│   ├── GemSvg.tsx
│   ├── LightningProgressSvg.tsx
│   ├── LingotsTreasureChestSvg.tsx
│   ├── LockSvg.tsx
│   ├── StarSvg.tsx
│   └── ...
├── league/                     # 8 league/leaderboard icons
│   ├── index.ts
│   ├── BronzeLeagueSvg.tsx
│   ├── FirstPlaceSvg.tsx
│   ├── LeaderboardBannerSvg.tsx
│   └── ...
├── lessons/                    # 32 lesson-related icons
│   ├── index.ts
│   ├── book/
│   │   ├── index.ts
│   │   ├── ActiveBookSvg.tsx
│   │   ├── GoldenBookSvg.tsx
│   ├── dumbbell/
│   │   ├── index.ts
│   │   ├── ActiveDumbbellSvg.tsx
│   │   ├── GoldenDumbbellSvg.tsx
│   ├── treasure/
│   │   ├── index.ts
│   │   ├── ActiveTreasureSvg.tsx
│   │   ├── GoldenTreasureSvg.tsx
│   │   ├── LockedTreasureSvg.tsx
│   ├── trophy/
│   │   ├── index.ts
│   │   ├── ActiveTrophySvg.tsx
│   │   ├── GoldenTrophySvg.tsx
│   ├── FastForwardSvg.tsx
│   ├── GuidebookSvg.tsx
│   ├── LessonCompletionSvg0.tsx
│   ├── LessonTopBarHeart.tsx
│   └── ...
├── navigation/                 # 10 navigation icons
│   ├── index.ts
│   ├── ChevronDownSvg.tsx
│   ├── ChevronLeftSvg.tsx
│   ├── GlobeSvg.tsx
│   ├── MoreOptionsSvg.tsx
│   └── ...
├── profile/                    # 5 profile icons
│   ├── index.ts
│   ├── EmptyMedalSvg.tsx
│   ├── ProfileFriendsSvg.tsx
│   ├── QATesterRobotSvg.tsx
│   └── ...
└── ui/                         # 6 UI utility icons
    ├── index.ts
    ├── BigCloseSvg.tsx
    ├── CloseSvg.tsx
    ├── DoneSvg.tsx
    ├── EditPencilSvg.tsx
    └── ...
```

### Import Pattern
Icons are imported via barrel exports:

```typescript
// Import specific icons from category
import { FireSvg, GemSvg, StarSvg } from "~/components/icons/gamification";
import { ActiveBookSvg, GoldenBookSvg } from "~/components/icons/lessons/book";

// Or import from main index (re-exports all categories)
import { FireSvg, ActiveBookSvg } from "~/components/icons";
```

### Icon Component Pattern
Each icon is a standalone React component:

```typescript
// Example: FireSvg.tsx
export const FireSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="..." fill="#FF9600" />
    <path d="..." fill="#FF6B00" />
  </svg>
);
```

### Benefits of Modular Structure
- ✅ **Tree-shaking**: Only imports used icons
- ✅ **Maintainability**: Easy to find and update specific icons
- ✅ **Semantic organization**: Icons grouped by purpose
- ✅ **Type safety**: Each icon exported with proper TypeScript types
- ✅ **Performance**: Smaller bundle sizes vs monolithic file

### Icon States Pattern
Components like `TileIcon` implement multi-state icons:
```typescript
import { CheckmarkSvg, StarSvg, LockSvg } from "~/components/icons";
import { ActiveBookSvg, GoldenBookSvg } from "~/components/icons/lessons/book";

switch (tileType) {
  case "star":
    return status === "COMPLETE" ? <CheckmarkSvg /> 
         : status === "ACTIVE" ? <StarSvg /> 
         : <LockSvg />;
  case "book":
    return status === "COMPLETE" ? <GoldenBookSvg />
         : status === "ACTIVE" ? <ActiveBookSvg />
         : <LockSvg />;
  // ... other types
}
```

### Modular Icon Categories
**Gamification Icons** (`~/components/icons/gamification`):
- CheckmarkSvg, LockSvg, StarSvg, FireSvg, GemSvg
- Badge icons: BadgeBugHunterSvg, BadgeQualityInspectorSvg
- Progress icons: LightningProgressSvg, TreasureProgressSvg

**Lesson Icons** (`~/components/icons/lessons/[type]`):
- Book: ActiveBookSvg, GoldenBookSvg
- Dumbbell: ActiveDumbbellSvg, GoldenDumbbellSvg  
- Trophy: ActiveTrophySvg, GoldenTrophySvg
- Treasure: ActiveTreasureSvg, GoldenTreasureSvg, LockedTreasureSvg

**League Icons** (`~/components/icons/league`):
- BronzeLeagueSvg, FirstPlaceSvg, SecondPlaceSvg, ThirdPlaceSvg
- LeaderboardBannerSvg, LockedLeagueSvg

**Navigation Icons** (`~/components/icons/navigation`):
- ChevronDownSvg, ChevronLeftSvg, ChevronRightSvg
- GlobeSvg, MoreOptionsSvg, UpArrowSvg

**Profile Icons** (`~/components/icons/profile`):
- QATesterRobotSvg, ProfileFriendsSvg, EmptyMedalSvg

**UI Icons** (`~/components/icons/ui`):
- CloseSvg, BigCloseSvg, DoneSvg, EditPencilSvg, SettingsGearSvg

## Responsive Design

### Mobile Layout
- Bottom navigation bar (BottomBar component)
- Hidden on desktop with `md:hidden`
- Fixed height of 88px
- 3-4 navigation items with icons

### Desktop Layout
- Left sidebar (LeftBar component)
- Top navigation (TopBar/TopBarNew component)
- Right sidebar (RightBar component)
- Different layout structure using Next.js dynamic imports or conditional rendering

## Accessibility

### Screen Reader Support
Always include `sr-only` labels for icon-only buttons:
```typescript
<Link href={item.href}>
  {item.icon}
  <span className="sr-only">{item.name}</span>
</Link>
```

### Semantic HTML
- Use `<nav>` for navigation containers
- Use `<ul>` and `<li>` for navigation lists
- Use Next.js `<Link>` for navigation (client-side routing)

## Routing

### Next.js Pages Router
File-based routing from `pages/` directory:
- `/` → `pages/index.tsx` (landing/login)
- `/learn` → `pages/learn.tsx`
- `/lesson` → `pages/lesson.tsx`
- `/profile` → `pages/profile.tsx`
- `/shop` → `pages/shop.tsx`
- `/leaderboard` → `pages/leaderboard.tsx`
- `/settings/account` → `pages/settings/account.tsx`

### Conditional Navigation
Links can be conditional based on authentication state:
```typescript
href: loggedIn ? "/profile" : "/learn?sign-up"
```

## Component Example: BottomBar

This is a representative example showing all conventions:

```typescript
import Link from "next/link";
import { useBoundStore } from "~/hooks/useBoundStore";

type BottomBarItem = {
  name: Tab;
  href: string;
  icon: JSX.Element;
};

export type Tab = "Aprender" | "Tienda" | "Perfil" | "Clasificaciones";

export const useBottomBarItems = () => {
  const loggedIn = useBoundStore((x) => x.loggedIn);

  const bottomBarItems: BottomBarItem[] = [
    {
      name: "Aprender",
      href: "/learn",
      icon: (/* SVG */),
    },
    // ... more items
  ];

  return bottomBarItems;
};

export const BottomBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  const bottomBarItems = useBottomBarItems();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t-2 border-[#e5e5e5] bg-white md:hidden">
      <ul className="flex h-[88px]">
        {bottomBarItems.map((item) => (
          <li key={item.href} className="flex flex-1 items-center justify-center">
            <Link
              href={item.href}
              className={
                item.name === selectedTab
                  ? "rounded-xl border-2 border-[#84d8ff] bg-[#ddf4ff] px-2 py-1"
                  : "px-2 py-1"
              }
            >
              {item.icon}
              <span className="sr-only">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

## Key Conventions Summary

1. **TypeScript strict mode** - All props and return types explicitly typed
2. **Functional components** - No class components
3. **Zustand for global state** - via useBoundStore hook
4. **Tailwind utility classes** - No custom CSS files (except globals.css)
5. **Inline SVG icons** - No icon library
6. **Mobile-first responsive** - md: breakpoint for desktop
7. **Accessibility** - sr-only labels for icons
8. **Next.js routing** - File-based with Link component
9. **Named exports** - Export const ComponentName
10. **Co-located types** - Types defined in same file as component
