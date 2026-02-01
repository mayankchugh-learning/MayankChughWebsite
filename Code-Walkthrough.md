# Code Walkthrough

## Project Structure
- `client/`: React frontend application.
  - `src/components/`: Reusable UI components (Hero, Projects, Skills, ChatBot).
  - `src/hooks/`: Custom React hooks for data fetching and state management.
  - `src/pages/`: Main page layouts.
- `server/`: Express backend application.
  - `routes.ts`: API endpoint definitions and database seeding logic.
  - `storage.ts`: Data access layer using Drizzle ORM.
  - `db.ts`: Database connection configuration.
- `shared/`: Shared TypeScript types and Zod schemas used by both frontend and backend.
  - `schema.ts`: Database table definitions.
  - `routes.ts`: Type-safe API route definitions.

## Key Workflows
1. **Data Loading**: On initial load, the frontend fetches profile, experience, projects, and skills from `/api` endpoints.
2. **AI Chat**: The `ChatBot` component communicates with `/api/chat`, sending message history to maintain context.
3. **Contact Form**: Submissions are validated with Zod on the frontend before being sent to the backend storage.
