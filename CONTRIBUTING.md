
# Contributing to Identity Profile Generator

Thank you for your interest in contributing! This guide will help you get started with local development and contributing to the project.

## Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/identity-profile-generator.git
   cd identity-profile-generator
   ```
3. **Run the installation script**:
   - On Unix/macOS: `bash scripts/install.sh`
   - On Windows: `scripts/install.bat`
4. **Start development**: `npm run dev`

## Development Workflow

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards below

3. **Test your changes** locally:
   ```bash
   npm run dev
   # Test the application thoroughly
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

### Coding Standards

#### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow existing code style and patterns
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

#### React Components
- Use functional components with hooks
- Keep components focused and reusable
- Use proper TypeScript props interfaces
- Follow the existing file structure

#### CSS/Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design
- Test on different screen sizes

#### Database
- Use Drizzle ORM for all database operations
- Add proper TypeScript types for schema
- Include migrations for schema changes
- Test database operations thoroughly

### Code Structure

```
├── client/src/
│   ├── components/     # Reusable UI components
│   │   ├── ui/        # shadcn/ui components
│   │   └── *.tsx      # Feature components
│   ├── pages/         # Page components
│   ├── lib/           # Utilities and helpers
│   └── hooks/         # Custom React hooks
├── server/
│   ├── db.ts          # Database configuration
│   ├── routes.ts      # API route handlers
│   └── *.ts          # Server utilities
└── shared/
    └── schema.ts      # Shared TypeScript types
```

### Testing Guidelines

- Test all new features manually
- Ensure the application works on different browsers
- Verify database operations work correctly
- Check responsive design on mobile devices

### Commit Message Convention

Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for test additions
- `chore:` for maintenance tasks

Examples:
```
feat: add profile export functionality
fix: resolve database connection issue
docs: update setup instructions
```

## Areas for Contribution

### High Priority
- Bug fixes and stability improvements
- Performance optimizations
- Mobile responsiveness improvements
- Database query optimizations

### Medium Priority
- New profile generation algorithms
- Additional social media platform previews
- Enhanced relationship network visualizations
- Export format improvements

### Low Priority
- UI/UX enhancements
- Code cleanup and refactoring
- Documentation improvements
- Additional test coverage

## Getting Help

- Check existing issues on GitHub
- Review the README.md and SETUP.md files
- Look at the existing code for patterns and examples
- Ask questions in pull request discussions

## Pull Request Guidelines

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] Changes have been tested locally
- [ ] Documentation has been updated if needed
- [ ] Commit messages follow the convention
- [ ] No console errors or warnings

### Pull Request Description
Include:
- Summary of changes made
- Reason for the changes
- Screenshots (for UI changes)
- Testing steps performed
- Any breaking changes

### Review Process
1. Automated checks will run on your PR
2. Maintainers will review your code
3. Address any requested changes
4. Once approved, your PR will be merged

## Local Database Management

### Useful Commands
```bash
# Reset database
npm run db:push

# View database in GUI
npm run db:studio

# Generate new migrations
npm run db:generate

# Seed database with test data (if available)
npm run db:seed
```

### Database Schema Changes
1. Update schema in `server/db.ts`
2. Generate migration: `npm run db:generate`
3. Apply changes: `npm run db:push`
4. Test thoroughly

## Troubleshooting Development Issues

### Common Problems
1. **Port 5000 in use**: Kill the process or change the port
2. **Database connection errors**: Check PostgreSQL service
3. **npm install fails**: Clear cache and retry
4. **TypeScript errors**: Check for missing dependencies

### Getting Unstuck
1. Check the SETUP.md troubleshooting section
2. Restart the development server
3. Clear node_modules and reinstall
4. Check for recent changes that might conflict

Thank you for contributing! 🚀
