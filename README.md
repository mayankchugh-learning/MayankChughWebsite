# Portfolio Website - Mayank Chugh

Professional portfolio for a Generative AI Engineer and Solutions Architect.

## Setup Instructions

### Prerequisites
- Node.js 20+
- PostgreSQL database

### Local Development
1. Clone the repository.
2. Install dependencies: `npm install`
3. Set environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `AI_INTEGRATIONS_OPENAI_API_KEY`: Your OpenAI API key.
4. Push the schema: `npm run db:push`
5. Start the application: `npm run dev`

### Deployment (Docker)
1. Build the image: `docker build -t portfolio-app .`
2. Run with Docker Compose: `docker-compose up -d`

## Maintenance
- Data can be updated via the `server/routes.ts` seeding function or directly in the PostgreSQL database.
