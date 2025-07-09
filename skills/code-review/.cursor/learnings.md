# Code Review Skill - Learnings

## Key Discoveries

### Effective Review Practices
- Focus on logic, design, and maintainability rather than just syntax
- Look for edge cases and error handling
- Consider performance implications of changes
- Check for security vulnerabilities
- Verify test coverage and quality

### Common Issues to Watch For
- Race conditions in concurrent code
- Memory leaks or resource management issues
- Input validation and sanitization
- Error handling and logging
- Code duplication and maintainability

### AI-Assisted Review Techniques
- Use semantic search to understand code context before reviewing
- Cross-reference similar patterns in the codebase
- Check for consistency with existing conventions
- Verify documentation and comments are up-to-date

## Gotchas

### Context is Critical
- Always understand the full context of changes before reviewing
- Check dependencies and impact on other parts of the system
- Consider the business logic and user impact

### Different Languages, Different Concerns
- Each language has specific patterns and anti-patterns
- Memory management varies significantly between languages
- Security considerations differ by technology stack

### Review Depth vs. Speed
- Balance thoroughness with review velocity
- Focus on high-impact areas first
- Use automated tools for basic checks
- Prioritize changes that affect critical paths

## Best Practices

### Before Starting Review
1. Read the PR description and requirements
2. Understand the business context
3. Check related issues or documentation
4. Review any previous related PRs

### During Review
1. Start with overall architecture and design
2. Check for proper error handling
3. Verify test coverage
4. Look for performance implications
5. Check for security concerns
6. Review code clarity and maintainability

### After Review
1. Provide constructive feedback
2. Suggest specific improvements
3. Acknowledge good practices
4. Follow up on discussions 