# replit.md

## Overview

This is a personal portfolio website for an AI/ML engineer and enterprise architect. The application showcases professional experience, projects, skills, and provides a contact form for visitors. It's built as a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom dark theme (teal/cyan accent colors)
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for scroll reveals and transitions
- **Smooth Scrolling**: react-scroll for single-page navigation
- **Build Tool**: Vite with custom plugins for Replit environment

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in `shared/routes.ts`
- **Validation**: Zod schemas for request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL
- **Schema Location**: `shared/schema.ts`
- **Tables**:
  - `profile` - Single row for portfolio owner info (name, title, bio, social links)
  - `experiences` - Work history with ordering
  - `projects` - Portfolio projects with tech stack, links, featured flag
  - `skills` - Technical skills organized by category with proficiency levels
  - `messages` - Contact form submissions
- **Migrations**: Drizzle Kit (`drizzle-kit push`)

### Shared Code Pattern
- The `shared/` directory contains code used by both frontend and backend
- `shared/schema.ts` - Database table definitions and Zod validation schemas
- `shared/routes.ts` - API route definitions with types for type-safe API calls

### Build Process
- Development: `tsx` for TypeScript execution with Vite dev server
- Production: Custom build script using esbuild (server) + Vite (client)
- Output: `dist/` directory with bundled server and static client files

## External Dependencies

### Database
- **PostgreSQL**: Primary database (connection via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Database queries and schema management
- **connect-pg-simple**: PostgreSQL session store (available but sessions not currently implemented)

### Frontend Libraries
- **@tanstack/react-query**: Data fetching and caching
- **framer-motion**: Animation library
- **react-scroll**: Smooth scroll navigation
- **@radix-ui/***: Headless UI primitives (dialogs, dropdowns, forms, etc.)
- **react-hook-form**: Form state management with Zod resolver

### Development Tools
- **Vite**: Frontend bundler with HMR
- **@replit/vite-plugin-***: Replit-specific development plugins
- **esbuild**: Server bundling for production

### Fonts
- Google Fonts: Inter (sans-serif), JetBrains Mono (monospace), DM Sans, Geist Mono