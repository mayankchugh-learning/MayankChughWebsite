# Comprehensive React Application Guide for Developers

This guide explains the architecture and design patterns used in this portfolio application to help you maintain, debug, and extend the code.

## 1. The Core Architecture: Components
React is built on **Components**—self-contained pieces of UI.
- **Location**: `client/src/components/`
- **Logic**: Each component (like `Hero.tsx` or `ProjectCard.tsx`) handles its own display logic and styles.
- **UI Library**: We use **shadcn/ui**, which provides high-quality, accessible primitives (Buttons, Cards, Dialogs).

## 2. State Management & Data Fetching
Instead of complex global state, we use **TanStack Query (React Query)**.
- **How it works**: It fetches data from our Express API and caches it.
- **Usage**: Look for `useQuery` in files like `client/src/hooks/use-portfolio.ts`.
- **Benefit**: Automatic loading states (`isLoading`) and error handling.

## 3. Styling: The Utility-First Approach
We use **Tailwind CSS**.
- **Syntax**: `className="flex items-center gap-2"`
- **Theming**: Colors are defined as CSS variables in `client/src/index.css` and mapped in `tailwind.config.ts`. This allows easy toggling between Light and Dark modes.

## 4. Routing
We use **wouter** for lightweight routing.
- **Location**: `client/src/App.tsx`
- **Pattern**: Routes map URL paths (e.g., `/`) to specific Page components.

## 5. Backend Integration (The "Shared" Pattern)
A critical feature of this app is the `shared/` directory.
- **Schema**: `shared/schema.ts` defines the database structure *and* validation rules (using Zod).
- **Type Safety**: Because both frontend and backend import from here, if you change a database column, the frontend will immediately show an error if it's using it incorrectly.

## 6. Common Debugging Steps
- **UI Issues**: Check the browser console (F12) for React warnings or Tailwind class typos.
- **Data Issues**: Check the "Network" tab in browser dev tools to see if API calls to `/api/...` are failing.
- **Build Errors**: Usually caused by TypeScript type mismatches. Look at the terminal output for specific file/line errors.

## 7. How to Add a New Feature
1. **Define Schema**: Add a new table in `shared/schema.ts`.
2. **Add Route**: Add an API endpoint in `server/routes.ts`.
3. **Create Component**: Build a new `.tsx` file in `client/src/components/`.
4. **Fetch Data**: Use a `useQuery` hook to bring the data into your component.
