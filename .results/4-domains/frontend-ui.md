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

### Embedding Strategy
Icons are embedded directly in components as inline SVG, not from an icon library:

```typescript
icon: (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
    <path d="..." fill="#FEC701" />
    <path opacity="0.3" d="..." fill="white" />
  </svg>
)
```

### Icon States Pattern
Components like `TileIcon` implement multi-state icons:
```typescript
switch (tileType) {
  case "star":
    return status === "COMPLETE" ? <CheckmarkSvg /> 
         : status === "ACTIVE" ? <StarSvg /> 
         : <LockSvg />;
  // ... other types
}
```

### Shared SVG Components
Common icons exported from `~/components/Svgs.tsx`:
- CheckmarkSvg, LockSvg, StarSvg
- ActiveBookSvg, LockedBookSvg, GoldenBookSvg
- ActiveDumbbellSvg, LockedDumbbellSvg, GoldenDumbbellSvg
- etc.

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
