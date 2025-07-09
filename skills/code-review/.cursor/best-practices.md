# Code Review Skill - Best Practices

## Pre-Review Preparation

### Understanding the Context
- **Always read the PR description thoroughly** - understand what problem is being solved
- **Check linked issues** - understand the business context and requirements
- **Review related PRs** - understand the evolution of the feature
- **Understand the codebase** - use semantic search to grasp the overall architecture

### Setting Up for Success
- **Use proper repo setup** - `setup-pr.sh` or `setup-branch.sh` for consistent environment
- **Read repo-specific context** - check `.cursor/` directory for accumulated knowledge
- **Understand review guidelines** - each repo may have specific requirements
- **Check existing patterns** - look for similar implementations in the codebase

## Review Process

### Start with the Big Picture
1. **Architecture Review** - Does the solution fit well with existing architecture?
2. **Design Patterns** - Are appropriate patterns being used?
3. **Code Organization** - Is the code well-structured and maintainable?
4. **Performance Impact** - Will this change affect system performance?

### Detailed Code Review
1. **Logic Correctness** - Does the code do what it's supposed to do?
2. **Edge Cases** - Are edge cases handled appropriately?
3. **Error Handling** - Are errors handled gracefully?
4. **Security** - Are there any security vulnerabilities?
5. **Testing** - Is the code properly tested?

### Code Quality Checks
1. **Readability** - Is the code easy to understand?
2. **Maintainability** - Will this code be easy to maintain?
3. **Consistency** - Does it follow project conventions?
4. **Documentation** - Are complex parts well-documented?
5. **Performance** - Are there any performance concerns?

## Communication Best Practices

### Providing Feedback
- **Be specific** - Point to exact lines and explain the issue
- **Be constructive** - Suggest improvements rather than just pointing out problems
- **Explain reasoning** - Help the author understand why changes are needed
- **Acknowledge good work** - Recognize well-written code and good practices
- **Prioritize issues** - Distinguish between critical issues and suggestions

### Feedback Categories
1. **🚨 Critical**: Security vulnerabilities, bugs, breaking changes
2. **⚠️ Important**: Performance issues, design problems, test gaps
3. **💡 Suggestion**: Code improvements, better patterns, optimization opportunities
4. **📝 Nit**: Minor style issues, typos, formatting

### Example Feedback Format
```
**Issue Type**: 🚨 Critical
**Location**: Line 45-50
**Problem**: Potential SQL injection vulnerability
**Solution**: Use parameterized queries instead of string concatenation
**Example**: `cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))`
```

## Common Review Scenarios

### New Feature Review
- Verify feature meets requirements
- Check integration with existing systems
- Ensure proper error handling
- Validate test coverage
- Review performance implications

### Bug Fix Review
- Understand the root cause
- Verify the fix addresses the issue
- Check for similar bugs elsewhere
- Ensure proper testing
- Review for regression potential

### Refactoring Review
- Verify behavior preservation
- Check test coverage
- Review performance impact
- Ensure code clarity improvement
- Check for breaking changes

### Performance Optimization Review
- Verify actual performance improvement
- Check for correctness preservation
- Review resource usage
- Ensure proper benchmarking
- Check for edge case impacts

## Language-Specific Considerations

### JavaScript/TypeScript
- **Async/Await**: Proper error handling in async functions
- **Type Safety**: Proper TypeScript usage and type definitions
- **Memory Management**: Event listener cleanup, closure considerations
- **Performance**: Bundle size, rendering performance
- **Security**: XSS prevention, input sanitization

### Python
- **Exception Handling**: Proper exception types and handling
- **Resource Management**: Context managers, file/connection handling
- **Performance**: Algorithm efficiency, memory usage
- **Security**: SQL injection, input validation
- **Style**: PEP 8 compliance, documentation standards

### Java
- **Exception Handling**: Proper exception hierarchy usage
- **Thread Safety**: Concurrent access patterns
- **Memory Management**: Resource cleanup, garbage collection
- **Performance**: Algorithm efficiency, collection usage
- **Design Patterns**: Appropriate pattern usage

## Tools and Automation

### Automated Checks
- **Linting**: Style and basic error checking
- **Security Scanning**: Vulnerability detection
- **Test Coverage**: Ensure adequate testing
- **Performance Monitoring**: Identify performance regressions
- **Documentation**: Check for outdated documentation

### Manual Review Focus
- **Business Logic**: Understanding and correctness
- **Architecture**: Design decisions and patterns
- **User Experience**: Impact on end users
- **Maintainability**: Long-term code health
- **Team Knowledge**: Code clarity and documentation

## Knowledge Management

### Documenting Learnings
- **Update repo context** - Add discoveries to `.cursor/` directories
- **Share patterns** - Document common patterns and anti-patterns
- **Update guidelines** - Refine review guidelines based on experience
- **Cross-team learning** - Share insights across repositories

### Continuous Improvement
- **Regular retrospectives** - Review and improve the review process
- **Feedback loops** - Learn from review outcomes
- **Tool updates** - Keep automation tools current
- **Training** - Stay updated on best practices and new technologies 