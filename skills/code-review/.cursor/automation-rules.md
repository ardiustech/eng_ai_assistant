# Code Review Skill - Automation Rules

## Setup and Preparation

### Repository Checkout
1. Use `setup-pr.sh <repo-url> <pr-number>` to checkout specific PR
2. Use `setup-branch.sh <repo-url> <branch-name>` for branch-based reviews
3. Always read repo-specific context from `repos/<repo-name>/.cursor/` before starting
4. Check existing review guidelines for the repository

### Context Gathering
1. Use `codebase_search` to understand overall architecture before reviewing specific changes
2. Use `grep_search` to find similar patterns and usage examples
3. Read related documentation and README files
4. Check for existing tests and their coverage

## Review Process Automation

### Analysis Workflow
1. **Diff Analysis**: Start by understanding what changed using git diff
2. **Context Search**: Use semantic search to understand the purpose of modified code
3. **Pattern Matching**: Look for similar implementations in the codebase
4. **Dependency Check**: Verify how changes affect other parts of the system
5. **Test Coverage**: Check if changes are properly tested

### Automated Checks
1. **Syntax and Style**: Check for language-specific conventions
2. **Security Scan**: Look for common security vulnerabilities
3. **Performance Review**: Check for potential performance issues
4. **Error Handling**: Verify proper error handling and logging
5. **Documentation**: Ensure code changes are documented

## Language-Specific Rules

### JavaScript/TypeScript
- Check for proper async/await usage
- Verify type safety and proper interfaces
- Look for memory leaks in event listeners
- Check for proper error boundaries in React
- Verify proper dependency management

### Python
- Check for proper exception handling
- Verify PEP 8 compliance
- Look for potential security issues (SQL injection, XSS)
- Check for proper resource management (file handles, connections)
- Verify proper logging and error reporting

### Java
- Check for proper exception handling
- Verify thread safety in concurrent code
- Look for memory leaks and resource management
- Check for proper design patterns usage
- Verify proper unit test coverage

### General Rules
- Always check for proper input validation
- Verify error messages are user-friendly
- Check for proper logging at appropriate levels
- Ensure code follows DRY principles
- Verify proper separation of concerns

## Review Communication

### Feedback Format
1. **Structured Comments**: Use clear, actionable feedback
2. **Code Suggestions**: Provide specific code improvements
3. **Explanation**: Explain why changes are needed
4. **Priority Levels**: Indicate critical vs. optional changes
5. **Positive Reinforcement**: Acknowledge good practices

### Documentation Updates
1. Update repo-specific review guidelines as needed
2. Document new patterns or anti-patterns discovered
3. Add language-specific considerations to repo context
4. Update automation rules based on learnings

## Integration with Repo Management

### Context Persistence
1. Save review insights to `repos/<repo-name>/.cursor/review-guidelines.md`
2. Document discovered patterns in `repos/<repo-name>/.cursor/code-patterns.md`
3. Update learnings in `repos/<repo-name>/.cursor/learnings.md`
4. Add automation notes to `repos/<repo-name>/.cursor/agent-notes.md`

### Cross-Repository Learning
1. Extract general patterns to `skills/code-review/.cursor/learnings.md`
2. Update automation rules based on common findings
3. Share best practices across different repositories
4. Maintain consistency in review approach 