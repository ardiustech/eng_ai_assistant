# Feature Development Skill

AI-assisted feature development capability for building robust, scalable features across multiple repositories.

## Overview

This skill provides structured approaches and automation for developing new features from initial planning through deployment. It integrates with the repository management system to provide context-aware development that improves over time.

## Quick Start

### Setting Up for Development

1. **Checkout the target branch**:
   ```bash
   ./setup-branch.sh <repo-url> <branch-name>
   ```

2. **Read repo-specific context**:
   - Check `repos/<repo-name>/.cursor/` for accumulated knowledge
   - Review existing patterns and architectural decisions
   - Understand the codebase structure and conventions

3. **Plan the feature**:
   - Use prompts from `.cursor/prompts.md` for requirements analysis
   - Follow planning guidelines from `.cursor/best-practices.md`
   - Apply automation rules from `.cursor/automation-rules.md`

### Development Process

1. **Requirements Analysis** - Understand the problem and user needs
2. **Technical Planning** - Design the solution architecture
3. **Implementation** - Build the feature incrementally
4. **Testing** - Ensure quality through comprehensive testing
5. **Integration** - Connect with existing systems
6. **Deployment** - Deploy safely with proper monitoring
7. **Documentation** - Update repo-specific learnings

## Core Components

### .cursor/ Directory Structure

- **`learnings.md`** - Accumulated knowledge and best practices
- **`automation-rules.md`** - Step-by-step development automation
- **`best-practices.md`** - Proven development methodologies
- **`prompts.md`** - Ready-to-use development prompts

### Integration with Repository Management

This skill works seamlessly with the `repos/` directory structure:

```
repos/
  <repo-name>/
    .cursor/
      learnings.md          # Repo-specific discoveries
      code-patterns.md      # Architectural patterns
      review-guidelines.md  # Code review standards
      agent-notes.md        # Development preferences
    code/
      <branch-name>/        # Feature development checkouts
      pr-<number>/          # PR-based development
```

### Helper Scripts

- **`setup-branch.sh`** - Checkout and prepare branch for development
- **`setup-pr.sh`** - Checkout and prepare PR for development
- **`update-repo.sh`** - Update existing checkouts
- **`list-repos.sh`** - View available repositories and branches

## Development Methodology

### Planning Phase

1. **Requirements Analysis**
   - Understand the business problem and user needs
   - Define acceptance criteria and success metrics
   - Identify constraints and non-functional requirements

2. **Technical Design**
   - Analyze existing architecture and patterns
   - Design the solution approach
   - Plan integration points and data flow

3. **Risk Assessment**
   - Identify technical and integration risks
   - Plan mitigation strategies
   - Consider security and performance implications

### Implementation Phase

1. **Environment Setup**
   - Ensure development environment is properly configured
   - Install dependencies and development tools
   - Create or checkout feature branch

2. **Test-Driven Development**
   - Write tests that describe desired behavior
   - Implement functionality to pass tests
   - Refactor for quality and maintainability

3. **Iterative Development**
   - Build in small, testable increments
   - Integrate continuously with existing systems
   - Gather feedback early and often

### Quality Assurance

1. **Code Quality**
   - Follow established patterns and conventions
   - Ensure code is readable and maintainable
   - Use static analysis and linting tools

2. **Testing Strategy**
   - Unit tests for individual components
   - Integration tests for system interactions
   - End-to-end tests for user workflows

3. **Security Review**
   - Validate input sanitization and validation
   - Check authentication and authorization
   - Scan for common vulnerabilities

## Technology-Specific Guidance

### Frontend Development
- **React/Vue/Angular**: Component-based architecture
- **State Management**: Redux, Vuex, or built-in state
- **Performance**: Bundle optimization and lazy loading
- **Accessibility**: WCAG compliance and screen reader support
- **Testing**: Jest, React Testing Library, Cypress

### Backend Development
- **API Design**: RESTful or GraphQL endpoints
- **Database**: Efficient schema design and query optimization
- **Security**: Authentication, authorization, input validation
- **Performance**: Caching, connection pooling, query optimization
- **Testing**: Unit tests, integration tests, API tests

### Full-Stack Development
- **Architecture**: Clean separation of concerns
- **Data Flow**: Efficient client-server communication
- **Error Handling**: Consistent error propagation
- **Deployment**: Automated CI/CD pipelines
- **Monitoring**: Comprehensive logging and metrics

## Automation Integration

### Codebase Analysis
```javascript
// Understand existing patterns
codebase_search({
  query: "How are similar features implemented in this codebase?",
  target_directories: ["src/features/"]
});
```

### Pattern Recognition
```javascript
// Find reusable components
grep_search({
  query: "class.*Component",
  include_pattern: "*.js,*.ts,*.jsx,*.tsx"
});
```

### Context Building
```javascript
// Build comprehensive development context
codebase_search({
  query: "What are the testing patterns used in this project?",
  target_directories: ["tests/", "spec/"]
});
```

## Best Practices

### Code Organization
- Follow single responsibility principle
- Create modular, reusable components
- Use consistent naming conventions
- Implement proper error handling
- Add comprehensive logging

### Testing Strategy
- Write tests before implementation (TDD)
- Cover happy path, edge cases, and error conditions
- Use appropriate test types (unit, integration, e2e)
- Maintain test quality and reliability
- Automate test execution

### Performance Considerations
- Use appropriate algorithms and data structures
- Implement caching where beneficial
- Optimize database queries and operations
- Monitor performance metrics
- Plan for scalability

### Security Implementation
- Validate and sanitize all inputs
- Implement proper authentication and authorization
- Protect against common vulnerabilities
- Handle sensitive data appropriately
- Regular security reviews and updates

## Common Patterns

### Feature Implementation Flow
1. **Analysis** - Understand requirements and constraints
2. **Design** - Plan technical approach and architecture
3. **Development** - Implement in small, testable increments
4. **Testing** - Comprehensive testing at all levels
5. **Integration** - Connect with existing systems
6. **Deployment** - Safe, monitored deployment process

### Error Handling
- Consistent error handling patterns
- Meaningful error messages for users
- Proper logging for debugging
- Graceful degradation strategies
- Recovery mechanisms where possible

### Configuration Management
- Environment-specific configuration
- Secret management for sensitive data
- Feature flags for gradual rollouts
- Configuration validation
- Runtime configuration updates

## Development Tools

### Code Quality
- **Linting**: ESLint, Pylint, Checkstyle
- **Formatting**: Prettier, Black, Google Java Format
- **Static Analysis**: SonarQube, CodeClimate
- **Security Scanning**: Snyk, OWASP dependency check
- **Type Checking**: TypeScript, mypy, Flow

### Testing Tools
- **Unit Testing**: Jest, pytest, JUnit
- **Integration Testing**: Supertest, requests, RestAssured
- **End-to-End Testing**: Cypress, Playwright, Selenium
- **Performance Testing**: JMeter, k6, Artillery
- **Test Coverage**: Istanbul, coverage.py, JaCoCo

### Development Environment
- **Version Control**: Git workflows and branching strategies
- **Package Management**: npm, pip, Maven, Gradle
- **Build Tools**: webpack, Vite, Maven, Gradle
- **Containerization**: Docker for consistent environments
- **IDE Integration**: VS Code, IntelliJ, PyCharm

## Troubleshooting

### Common Issues
- **Environment Problems**: Use consistent development environments
- **Dependency Conflicts**: Use lock files and version management
- **Integration Issues**: Test integration points thoroughly
- **Performance Problems**: Profile and optimize critical paths
- **Security Vulnerabilities**: Regular security scanning and updates

### Debugging Strategies
- **Systematic Approach**: Reproduce, isolate, and fix issues
- **Logging**: Use comprehensive logging for debugging
- **Testing**: Write tests to reproduce and prevent issues
- **Monitoring**: Use monitoring tools to identify problems
- **Documentation**: Document known issues and solutions

## Knowledge Management

### Learning Capture
- Document discoveries in repo-specific `.cursor/` files
- Update patterns and best practices
- Share learnings with team members
- Contribute to skill improvement
- Maintain up-to-date documentation

### Continuous Improvement
- Regular retrospectives on development process
- Feedback loops from users and stakeholders
- Process refinement based on experience
- Tool and technique evaluation
- Knowledge sharing across projects

## Configuration

### Environment Setup
No specific configuration required. The skill integrates with:
- Repository management system (`repos/` directory)
- Helper scripts for branch and PR management
- Shared context and learning system
- Development tools and environments

### Customization
- Adapt prompts for specific development needs
- Update automation rules based on project requirements
- Customize best practices for team preferences
- Add technology-specific considerations
- Integrate with existing development workflows

## Examples

### Basic Feature Development
```bash
# Setup
./setup-branch.sh https://github.com/user/repo.git feature-branch

# Development process
1. Read repos/repo/.cursor/learnings.md
2. Use prompts for requirements analysis
3. Follow automation rules for implementation
4. Update learnings based on discoveries
```

### Feature with Testing
```bash
# Setup with comprehensive testing
./setup-branch.sh https://github.com/user/repo.git feature-branch

# Development with TDD
1. Write failing tests first
2. Implement functionality to pass tests
3. Refactor for quality
4. Document patterns and learnings
```

### Integration with Existing System
```bash
# Setup for integration work
./setup-branch.sh https://github.com/user/repo.git integration-branch

# Integration process
1. Analyze existing system architecture
2. Design integration points
3. Implement with compatibility considerations
4. Test integration thoroughly
```

## Contributing

### Adding New Patterns
1. Document in `.cursor/learnings.md`
2. Update automation rules if needed
3. Add relevant prompts and examples
4. Share across repositories when applicable

### Improving the Process
1. Update best practices based on experience
2. Refine automation rules for efficiency
3. Add new prompts for common scenarios
4. Document lessons learned and improvements 