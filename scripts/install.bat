
@echo off
setlocal enabledelayedexpansion

:: Identity Profile Generator - Windows Installation Script
:: This script sets up the local development environment on Windows

echo 🚀 Setting up Identity Profile Generator for local development...

:: Check Node.js
echo [INFO] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [SUCCESS] Node.js found: !NODE_VERSION!
)

:: Check npm
echo [INFO] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm not found. Please install npm.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo [SUCCESS] npm found: !NPM_VERSION!
)

:: Check PostgreSQL
echo [INFO] Checking PostgreSQL installation...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] PostgreSQL not found. Please install PostgreSQL from https://www.postgresql.org/
    echo Download the Windows installer and follow the setup wizard.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('psql --version') do set PSQL_VERSION=%%i
    echo [SUCCESS] PostgreSQL found: !PSQL_VERSION!
)

:: Install npm dependencies
echo [INFO] Installing npm dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
) else (
    echo [SUCCESS] Dependencies installed successfully
)

:: Set up database
echo [INFO] Setting up database...
call npm run db:setup
if %errorlevel% neq 0 (
    echo [ERROR] Database setup failed
    echo Please check your PostgreSQL installation and make sure:
    echo 1. PostgreSQL service is running
    echo 2. Default user 'postgres' exists with password 'postgres'
    echo 3. PostgreSQL is listening on port 5432
    pause
    exit /b 1
) else (
    echo [SUCCESS] Database setup completed
)

:: Generate database schema
echo [INFO] Generating database schema...
call npm run db:generate
if %errorlevel% neq 0 (
    echo [WARNING] Schema generation had issues, but continuing...
) else (
    echo [SUCCESS] Database schema generated
)

:: Apply database schema
echo [INFO] Applying database schema...
call npm run db:push
if %errorlevel% neq 0 (
    echo [ERROR] Failed to apply database schema
    pause
    exit /b 1
) else (
    echo [SUCCESS] Database schema applied
)

:: Final success message
echo.
echo [SUCCESS] 🎉 Setup completed successfully!
echo.
echo To start development:
echo   npm run dev
echo.
echo The application will be available at: http://localhost:5000
echo.
echo Additional commands:
echo   npm run db:studio  - Open database GUI
echo   npm run build      - Build for production
echo   npm run start      - Start production server
echo.
echo [INFO] Happy coding! 🚀
echo.
pause
