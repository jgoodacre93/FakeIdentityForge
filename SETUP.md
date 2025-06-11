
# Local Development Setup Guide

Follow these steps to set up the Identity Profile Generator for local development.

## Step 1: System Requirements

Ensure you have the following installed:

- **Node.js**: Version 18 or higher
  - Download from: https://nodejs.org/
  - Verify: `node --version`

- **PostgreSQL**: Version 12 or higher
  - Download from: https://www.postgresql.org/download/
  - Verify: `psql --version`

- **Git**: For version control
  - Download from: https://git-scm.com/
  - Verify: `git --version`

## Step 2: PostgreSQL Setup

### On Windows:
1. Install PostgreSQL from the official website
2. During installation, set the password for the `postgres` user
3. Make note of the port (default: 5432)

### On macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Create postgres user if needed
createuser -s postgres
```

### On Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Set password for postgres user
sudo -u postgres psql
\password postgres
\q
```

## Step 3: Project Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   ```bash
   npm run db:setup
   ```

4. **Generate and apply database schema**:
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Step 4: Configuration

The application uses these default database settings:
- **Host**: localhost
- **Port**: 5432
- **Username**: postgres
- **Password**: postgres
- **Database**: identity_db

If your PostgreSQL setup uses different credentials, you'll need to update the connection configuration in `server/db.ts`.

## Step 5: Start Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

## Step 6: Verify Setup

You should see the Identity Profile Generator homepage. Try:
1. Generating a new profile
2. Viewing the profile details
3. Checking the social media previews

## Development Workflow

### Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Database commands
npm run db:generate    # Generate new migrations
npm run db:push       # Apply schema changes
npm run db:studio     # Open database GUI

# View database
npm run db:studio
```

### File Structure Overview

```
├── client/src/
│   ├── components/    # UI components
│   ├── pages/        # Page components  
│   ├── lib/          # Utilities and data
│   └── hooks/        # Custom React hooks
├── server/
│   ├── db.ts         # Database config
│   ├── routes.ts     # API endpoints
│   └── index.ts      # Server entry
└── shared/
    └── schema.ts     # Shared types
```

## Troubleshooting

### Database Issues

**Error: "database does not exist"**
```bash
npm run db:setup
```

**Error: "password authentication failed"**
- Check PostgreSQL is running
- Verify username/password in `server/db.ts`

**Error: "port 5432 not available"**
- Check if PostgreSQL is running on a different port
- Update port in database configuration

### Development Server Issues

**Error: "Port 5000 already in use"**
- Stop any existing processes on port 5000
- Or modify the port in the configuration

**Error: "Module not found"**
```bash
npm install
```

### Build Issues

**TypeScript errors**
```bash
# Check for type errors
npx tsc --noEmit
```

**Missing dependencies**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Once setup is complete:
1. Explore the codebase structure
2. Try making small changes to see hot reload
3. Check out the database schema in Drizzle Studio
4. Read the main README.md for feature details

Need help? Check the troubleshooting section or create an issue in the repository.
