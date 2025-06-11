
#!/bin/bash

# Identity Profile Generator - Installation Script
# This script sets up the local development environment

set -e  # Exit on any error

echo "🚀 Setting up Identity Profile Generator for local development..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js
print_status "Checking Node.js installation..."
if command_exists node; then
    NODE_VERSION=$(node --version)
    print_success "Node.js found: $NODE_VERSION"
    
    # Check if version is >= 18
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -lt 18 ]; then
        print_warning "Node.js version 18 or higher is recommended. Current: $NODE_VERSION"
    fi
else
    print_error "Node.js not found. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm
print_status "Checking npm..."
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    print_success "npm found: $NPM_VERSION"
else
    print_error "npm not found. Please install npm."
    exit 1
fi

# Check PostgreSQL
print_status "Checking PostgreSQL installation..."
if command_exists psql; then
    PSQL_VERSION=$(psql --version)
    print_success "PostgreSQL found: $PSQL_VERSION"
else
    print_error "PostgreSQL not found. Please install PostgreSQL from https://www.postgresql.org/"
    echo "On macOS: brew install postgresql"
    echo "On Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    exit 1
fi

# Check if PostgreSQL is running
print_status "Checking if PostgreSQL is running..."
if pg_isready -h localhost -p 5432 >/dev/null 2>&1; then
    print_success "PostgreSQL is running"
else
    print_warning "PostgreSQL may not be running on localhost:5432"
    echo "To start PostgreSQL:"
    echo "  macOS (Homebrew): brew services start postgresql"
    echo "  Linux: sudo systemctl start postgresql"
    echo "  Windows: Start the PostgreSQL service from Services"
fi

# Install npm dependencies
print_status "Installing npm dependencies..."
if npm install; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Set up database
print_status "Setting up database..."
if npm run db:setup; then
    print_success "Database setup completed"
else
    print_error "Database setup failed"
    echo "Please check your PostgreSQL installation and credentials"
    exit 1
fi

# Generate database schema
print_status "Generating database schema..."
if npm run db:generate; then
    print_success "Database schema generated"
else
    print_warning "Schema generation had issues, but continuing..."
fi

# Apply database schema
print_status "Applying database schema..."
if npm run db:push; then
    print_success "Database schema applied"
else
    print_error "Failed to apply database schema"
    exit 1
fi

# Final success message
echo ""
print_success "🎉 Setup completed successfully!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "The application will be available at: http://localhost:5000"
echo ""
echo "Additional commands:"
echo "  npm run db:studio  - Open database GUI"
echo "  npm run build      - Build for production"
echo "  npm run start      - Start production server"
echo ""
print_status "Happy coding! 🚀"
