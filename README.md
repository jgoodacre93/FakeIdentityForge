FakeIdentityForge


# Identity Profile Generator

A full-stack web application for generating and managing fictional identity profiles with social media previews and relationship networks.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Tailwind CSS + shadcn/ui components

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd <your-repo-name>
npm install
```

### 2. Database Setup

Make sure PostgreSQL is running on your system, then set up the database:

```bash
# Set up the local database
npm run db:setup

# Generate and push database schema
npm run db:generate
npm run db:push
```

### 3. Environment Configuration

The app uses PostgreSQL with the following default configuration:
- Host: localhost
- Port: 5432
- User: postgres
- Password: postgres
- Database: identity_db

If you need different database credentials, you can modify the connection settings in `server/db.ts`.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:setup` - Set up local PostgreSQL database
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions and data
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express server
│   ├── db.ts              # Database configuration
│   ├── routes.ts          # API routes
│   └── index.ts           # Server entry point
├── shared/                 # Shared TypeScript types
└── scripts/               # Setup and utility scripts
```

## Features

- **Profile Generation**: Generate realistic fictional identity profiles
- **Social Media Previews**: See how profiles would appear on different platforms
- **Relationship Networks**: Visualize connections between profiles
- **Export Functionality**: Export profiles and database data
- **Responsive Design**: Works on desktop and mobile devices

## Database Schema

The app uses the following main tables:
- `profiles` - Store generated identity profiles
- `relationships` - Store connections between profiles

## Development Notes

- The frontend uses Vite for fast development and hot reload
- Backend uses Express with TypeScript for type safety
- Database migrations are handled by Drizzle ORM
- UI components are built with shadcn/ui and Tailwind CSS

## Troubleshooting

If you encounter issues:

1. **Database connection errors**: Ensure PostgreSQL is running and credentials are correct
2. **Port conflicts**: The app runs on port 5000 by default
3. **Dependencies**: Run `npm install` to ensure all packages are installed
4. **Database schema**: Run `npm run db:push` to sync schema changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request
