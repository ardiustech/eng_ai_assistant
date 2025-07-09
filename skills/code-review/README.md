# Code Review Skill

AI-assisted code review capability for comprehensive PR and code analysis across multiple repositories.

## Overview

This skill provides structured approaches and tools for conducting thorough code reviews using AI assistance. It integrates with the repository management system to provide context-aware reviews that improve over time.

## Quick Start

### Setting Up a Review

1. **Checkout the PR or branch**:
   ```bash
   ./setup-pr.sh <repo-url> <pr-number>
   # or
   ./setup-branch.sh <repo-url> <branch-name>
   ```

2. **Read repo-specific context**:
   - Check `repos/<repo-name>/.cursor/` for accumulated knowledge
   - Review existing patterns and guidelines
   - Understand the codebase architecture

3. **Conduct the review**:
   - Use systematic approach from `.cursor/best-practices.md`
   - Follow automation rules from `.cursor/automation-rules.md`
   - Apply relevant prompts from `.cursor/prompts.md`

### Review Process

1. **Context Gathering** - Understand the problem being solved
2. **Architecture Review** - Evaluate design decisions and patterns
3. **Code Quality Analysis** - Check for maintainability and best practices
4. **Security Review** - Identify potential vulnerabilities
5. **Performance Analysis** - Assess performance implications
6. **Test Coverage** - Verify adequate testing
7. **Documentation** - Update repo-specific learnings

## Core Components

### .cursor/ Directory Structure

- **`learnings.md`** - Accumulated knowledge and discoveries
- **`automation-rules.md`** - Step-by-step automation guidelines
- **`best-practices.md`** - Proven review methodologies
- **`prompts.md`** - Ready-to-use review prompts

### Integration with Repository Management

This skill works seamlessly with the `repos/` directory structure:

```
repos/
  <repo-name>/
    .cursor/
      learnings.md          # Repo-specific learnings
      code-patterns.md      # Code patterns and conventions
      review-guidelines.md  # Review-specific guidelines
      agent-notes.md        # Agent-specific notes
    code/
      <branch-name>/        # Code checkouts
      pr-<number>/          # PR checkouts
```

### Helper Scripts

- **`setup-pr.sh`** - Checkout and prepare PR for review
- **`setup-branch.sh`** - Checkout and prepare branch for review
- **`update-repo.sh`** - Update existing checkouts
- **`list-repos.sh`** - View available repositories and checkouts

## Review Methodology

### Pre-Review Preparation

1. **Understand the Context**
   - Read PR description and linked issues
   - Check related PRs and change history
   - Review business requirements

2. **Gather Technical Context**
   - Use `codebase_search` for architecture understanding
   - Check existing patterns and conventions
   - Review test coverage and quality

### Review Execution

1. **Big Picture Analysis**
   - Architecture alignment
   - Design pattern usage
   - Performance implications
   - Security considerations

2. **Detailed Code Review**
   - Logic correctness
   - Edge case handling
   - Error management
   - Code quality and maintainability

3. **Testing and Documentation**
   - Test coverage adequacy
   - Test quality assessment
   - Documentation completeness
   - Code comments and clarity

### Post-Review Actions

1. **Feedback Generation**
   - Structured, actionable feedback
   - Prioritized by importance
   - Clear explanations and examples

2. **Knowledge Capture**
   - Update repo-specific learnings
   - Document new patterns discovered
   - Update review guidelines
   - Share insights across repositories

## Language-Specific Considerations

### JavaScript/TypeScript
- Async/await patterns and error handling
- Type safety and interface definitions
- Memory management and performance
- Security (XSS, input validation)

### Python
- Exception handling and resource management
- PEP 8 compliance and code style
- Security considerations
- Performance and algorithm efficiency

### Java
- Exception hierarchy and thread safety
- Memory management and resource cleanup
- Design pattern usage
- Performance considerations

## Automation Integration

### Codebase Search Integration
```javascript
// Use semantic search to understand context
codebase_search({
  query: "How is authentication handled in this application?",
  target_directories: ["src/auth/"]
});
```

### Pattern Recognition
```javascript
// Find similar implementations
grep_search({
  query: "function handleUserLogin",
  include_pattern: "*.js"
});
```

### Context Building
```javascript
// Build comprehensive review context
codebase_search({
  query: "What are the common error handling patterns?",
  target_directories: []
});
```

## Best Practices

### Review Quality
- Focus on correctness, security, and maintainability
- Provide specific, actionable feedback
- Balance thoroughness with efficiency
- Learn from each review session

### Communication
- Use clear, constructive language
- Prioritize feedback by importance
- Provide examples and suggestions
- Acknowledge good practices

### Knowledge Management
- Document discoveries and patterns
- Update guidelines based on learnings
- Share insights across repositories
- Maintain consistency in review approach

## Configuration

### Environment Setup
No specific configuration required. The skill integrates with:
- Repository management system (`repos/` directory)
- Helper scripts for checkout and management
- Shared context and learning system

### Customization
- Adapt prompts in `.cursor/prompts.md` for specific needs
- Update automation rules based on experience
- Customize best practices for team preferences
- Add language-specific considerations as needed

## Troubleshooting

### Common Issues
- **Context Missing**: Always read repo-specific `.cursor/` files first
- **Incomplete Reviews**: Follow the systematic approach in best-practices.md
- **Inconsistent Feedback**: Use structured feedback format from prompts.md
- **Knowledge Loss**: Update learnings after each review session

### Getting Help
- Review `.cursor/best-practices.md` for methodology
- Check `.cursor/automation-rules.md` for step-by-step guidance
- Use `.cursor/prompts.md` for structured review questions
- Consult repo-specific context in `repos/<repo-name>/.cursor/`

## Contributing

### Adding New Patterns
1. Document in `.cursor/learnings.md`
2. Update automation rules if needed
3. Add relevant prompts
4. Share across repositories when applicable

### Improving the Process
1. Update best practices based on experience
2. Refine automation rules for efficiency
3. Add new prompts for common scenarios
4. Document lessons learned

## Examples

### Basic PR Review
```bash
# Setup
./setup-pr.sh https://github.com/user/repo.git 123

# Review process
1. Read repos/repo/.cursor/learnings.md
2. Use codebase_search to understand architecture
3. Follow systematic review in best-practices.md
4. Update learnings based on discoveries
```

### Branch Review
```bash
# Setup
./setup-branch.sh https://github.com/user/repo.git feature-branch

# Review process
1. Check repos/repo/.cursor/code-patterns.md
2. Apply automation rules from .cursor/automation-rules.md
3. Use prompts from .cursor/prompts.md
4. Document findings in appropriate .cursor/ files
``` 