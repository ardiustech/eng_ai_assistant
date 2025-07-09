# Feature Development Skill - Automation Rules

## Project Setup and Context

### Repository Preparation
1. Use `setup-branch.sh <repo-url> <branch-name>` to checkout target branch
2. If working on a feature branch, ensure it's based on the latest main/develop
3. Read repo-specific context from `repos/<repo-name>/.cursor/` directory
4. Review existing code patterns and architectural decisions
5. Check for similar existing functionality that can be extended or referenced

### Context Gathering Workflow
1. **Codebase Architecture Analysis**
   - Use `codebase_search` with broad queries to understand system architecture
   - Search for existing similar features or components
   - Identify key patterns and conventions used in the codebase
   - Understand the testing strategy and frameworks used

2. **Requirements Understanding**
   - Read feature requirements or user stories thoroughly
   - Identify acceptance criteria and edge cases
   - Understand the target users and their workflows
   - Check for any existing related issues or discussions

3. **Technical Context Building**
   - Use `grep_search` to find relevant imports, utilities, and helpers
   - Identify existing APIs, services, and data models
   - Understand error handling patterns and logging conventions
   - Review security considerations and authentication patterns

## Development Planning

### Feature Breakdown
1. **Decompose the Feature**
   - Break down into smaller, implementable components
   - Identify core functionality vs. nice-to-have features
   - Plan implementation order (dependencies first)
   - Consider testing strategy for each component

2. **Design Decisions**
   - Choose appropriate design patterns based on existing codebase
   - Plan data structures and API interfaces
   - Consider performance implications and scalability
   - Design error handling and edge case management

3. **Integration Planning**
   - Identify integration points with existing systems
   - Plan for backward compatibility if needed
   - Consider migration strategies if changing existing functionality
   - Plan for configuration and feature flag management

## Implementation Workflow

### Pre-Implementation
1. **Setup Development Environment**
   - Ensure all dependencies are installed and up-to-date
   - Run existing tests to ensure baseline functionality
   - Set up any necessary development tools or debugging aids
   - Create feature branch if not already done

2. **Create Implementation Plan**
   - Document the implementation approach
   - Identify which files will be modified or created
   - Plan the order of implementation
   - Consider rollback strategies if needed

### Core Implementation Process
1. **Start with Tests (TDD Approach)**
   - Write failing tests that describe the desired behavior
   - Use existing test patterns and frameworks
   - Cover both happy path and edge cases
   - Consider integration and end-to-end test needs

2. **Implement Core Functionality**
   - Follow existing code patterns and conventions
   - Use appropriate abstractions and design patterns
   - Implement comprehensive error handling
   - Add logging and monitoring as appropriate

3. **Iterative Development**
   - Implement in small, testable increments
   - Run tests frequently to catch issues early
   - Refactor as needed to maintain code quality
   - Document complex logic and design decisions

### Quality Assurance Automation
1. **Automated Testing**
   - Run unit tests continuously during development
   - Execute integration tests for component interactions
   - Perform end-to-end tests for complete workflows
   - Use test coverage tools to identify gaps

2. **Code Quality Checks**
   - Use linting tools to enforce coding standards
   - Run static analysis tools for security and quality
   - Check for performance regressions
   - Validate accessibility compliance (for frontend features)

3. **Security Validation**
   - Check for common security vulnerabilities
   - Validate input sanitization and validation
   - Review authentication and authorization logic
   - Test for SQL injection, XSS, and other common attacks

## Language-Specific Automation

### JavaScript/TypeScript
1. **Setup and Build**
   - Use `npm install` or `yarn install` for dependencies
   - Run `npm run build` or equivalent to check compilation
   - Use TypeScript compiler for type checking
   - Run linting with ESLint or similar tools

2. **Testing Automation**
   - Use Jest, Mocha, or similar testing frameworks
   - Run tests with `npm test` or `yarn test`
   - Use test coverage tools like Istanbul
   - Set up continuous testing during development

3. **Quality Checks**
   - Use Prettier for code formatting
   - Run TypeScript type checking
   - Check bundle size and performance
   - Validate accessibility with tools like axe

### Python
1. **Environment Setup**
   - Use virtual environments (venv, conda, etc.)
   - Install dependencies with `pip install -r requirements.txt`
   - Use `python -m pytest` for testing
   - Check code style with flake8 or black

2. **Testing and Quality**
   - Use pytest for unit and integration testing
   - Use coverage.py for test coverage analysis
   - Run mypy for type checking if using type hints
   - Use bandit for security vulnerability scanning

3. **Performance and Security**
   - Use profiling tools for performance analysis
   - Check for security issues with safety or similar tools
   - Validate input sanitization
   - Test for SQL injection and other security issues

### Java
1. **Build and Dependencies**
   - Use Maven (`mvn compile`) or Gradle (`./gradlew build`)
   - Ensure all dependencies are properly managed
   - Run `mvn test` or `gradle test` for testing
   - Use SpotBugs or similar for static analysis

2. **Testing Strategy**
   - Use JUnit for unit testing
   - Use Mockito for mocking dependencies
   - Run integration tests with Spring Boot Test or similar
   - Use JaCoCo for code coverage analysis

3. **Quality and Security**
   - Use PMD or Checkstyle for code quality
   - Run OWASP dependency check for security
   - Use SonarQube or similar for comprehensive analysis
   - Validate thread safety in concurrent code

## Integration and Deployment

### Pre-Deployment Validation
1. **Comprehensive Testing**
   - Run full test suite including unit, integration, and e2e tests
   - Perform manual testing of key user workflows
   - Test error handling and edge cases
   - Validate performance under expected load

2. **Code Review Preparation**
   - Ensure code follows established patterns and conventions
   - Add comprehensive documentation for complex logic
   - Clean up any temporary or debug code
   - Prepare clear commit messages and PR description

3. **Documentation Updates**
   - Update API documentation if applicable
   - Add or update user documentation
   - Document configuration changes
   - Update deployment or setup instructions

### Deployment Automation
1. **Build and Package**
   - Use CI/CD pipeline for automated builds
   - Run all tests in CI environment
   - Package application for deployment
   - Tag releases appropriately

2. **Environment Validation**
   - Deploy to staging environment first
   - Run smoke tests in staging
   - Validate database migrations if applicable
   - Check for configuration issues

3. **Production Deployment**
   - Use blue-green or rolling deployment strategies
   - Monitor deployment process and application health
   - Be prepared to rollback if issues arise
   - Validate key functionality post-deployment

## Knowledge Management and Learning

### Context Preservation
1. **Document Decisions**
   - Update `repos/<repo-name>/.cursor/code-patterns.md` with new patterns
   - Add learnings to `repos/<repo-name>/.cursor/learnings.md`
   - Update architecture notes with any changes
   - Document gotchas and edge cases discovered

2. **Share Knowledge**
   - Update team documentation with new patterns
   - Share learnings in team meetings or documentation
   - Update skill-specific learnings in this directory
   - Contribute to general best practices

3. **Continuous Improvement**
   - Reflect on development process and outcomes
   - Identify areas for automation improvement
   - Update automation rules based on experience
   - Plan for future enhancements and iterations

### Cross-Repository Learning
1. **Extract General Patterns**
   - Identify patterns that could be useful across projects
   - Document reusable components or utilities
   - Share best practices across different repositories
   - Update general skill documentation

2. **Tool and Process Improvement**
   - Identify opportunities for better automation
   - Suggest improvements to development workflows
   - Share effective debugging and development techniques
   - Contribute to team tooling and infrastructure

## Troubleshooting Common Issues

### Development Environment Issues
- **Dependencies**: Use lock files and version management
- **Configuration**: Use environment variables and configuration management
- **Database**: Use migrations and seed data for consistent state
- **Services**: Use Docker or similar for service dependencies

### Testing Issues
- **Flaky Tests**: Identify and fix non-deterministic tests
- **Test Coverage**: Focus on critical paths and edge cases
- **Performance Tests**: Use consistent test environments
- **Integration Tests**: Ensure proper test data setup and teardown

### Code Quality Issues
- **Linting**: Address style and formatting issues early
- **Security**: Use automated security scanning tools
- **Performance**: Profile and optimize critical paths
- **Documentation**: Maintain up-to-date documentation

### Deployment Issues
- **Build Failures**: Ensure consistent build environments
- **Configuration**: Use proper configuration management
- **Database Migrations**: Test migrations in staging first
- **Monitoring**: Set up proper logging and monitoring 