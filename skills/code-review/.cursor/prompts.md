# Code Review Skill - Prompts

## Initial Setup Prompts

### Repository Context Gathering
```
Please help me understand the codebase structure and patterns for [REPO_NAME]. 

1. What is the overall architecture of this application?
2. What are the main technologies and frameworks used?
3. What are the key design patterns and conventions?
4. Are there any specific code quality standards or guidelines?
5. What testing frameworks and practices are used?
```

### PR Context Understanding
```
I need to review PR #[PR_NUMBER] for [REPO_NAME]. Help me understand:

1. What problem is this PR trying to solve?
2. What are the main changes being made?
3. Are there any related issues or previous PRs?
4. What are the potential risks or impacts of these changes?
5. What should I focus on during the review?
```

## Review Analysis Prompts

### Architecture Review
```
Analyze the architectural impact of the changes in this PR:

1. Do the changes align with the existing architecture?
2. Are there any design pattern violations?
3. Does this introduce any architectural debt?
4. Are there better architectural approaches for this solution?
5. How do these changes affect system scalability and maintainability?
```

### Security Review
```
Perform a security analysis of the changes in this PR:

1. Are there any potential security vulnerabilities?
2. Is user input properly validated and sanitized?
3. Are authentication and authorization handled correctly?
4. Are there any data privacy concerns?
5. Are secrets or sensitive data properly protected?
```

### Performance Review
```
Analyze the performance implications of these changes:

1. Are there any performance bottlenecks introduced?
2. How do these changes affect memory usage?
3. Are database queries optimized?
4. Are there any unnecessary computations or redundant operations?
5. What is the scalability impact of these changes?
```

### Test Coverage Review
```
Evaluate the test coverage for this PR:

1. Are the new features adequately tested?
2. Do the tests cover edge cases and error scenarios?
3. Are integration tests needed for these changes?
4. Is the test quality high (clear, maintainable, focused)?
5. Are there any existing tests that need to be updated?
```

## Code Quality Prompts

### Readability and Maintainability
```
Assess the code quality and maintainability:

1. Is the code easy to read and understand?
2. Are variable and function names descriptive?
3. Is the code properly commented where necessary?
4. Are complex algorithms or business logic well-explained?
5. Would a new team member be able to understand this code?
```

### Error Handling Review
```
Evaluate the error handling in this PR:

1. Are errors handled gracefully and consistently?
2. Are appropriate error types used?
3. Is error logging adequate for debugging?
4. Are user-facing error messages helpful and secure?
5. Are there any unhandled edge cases?
```

### Code Consistency
```
Check for consistency with existing codebase:

1. Does this code follow the project's coding standards?
2. Are naming conventions consistent?
3. Is the code structure similar to existing patterns?
4. Are dependencies managed consistently?
5. Does this fit with the overall code organization?
```

## Language-Specific Review Prompts

### JavaScript/TypeScript
```
Review this JavaScript/TypeScript code for:

1. Proper async/await usage and error handling
2. Type safety and appropriate type definitions
3. Memory leak prevention (event listeners, closures)
4. Performance considerations (bundle size, rendering)
5. Security issues (XSS, input validation)
```

### Python
```
Review this Python code for:

1. Proper exception handling and error management
2. Resource management (context managers, file handling)
3. PEP 8 compliance and code style
4. Security considerations (SQL injection, input validation)
5. Performance and algorithm efficiency
```

### Java
```
Review this Java code for:

1. Exception handling and proper exception hierarchy
2. Thread safety and concurrent access patterns
3. Memory management and resource cleanup
4. Design pattern usage and object-oriented principles
5. Performance considerations and collection usage
```

## Communication Prompts

### Feedback Generation
```
Generate constructive feedback for this code review:

1. Identify the most critical issues that need immediate attention
2. Suggest specific improvements with code examples
3. Highlight any particularly good practices used
4. Prioritize feedback by importance (critical, important, suggestion)
5. Provide clear explanations for why changes are needed
```

### Summary Generation
```
Create a comprehensive review summary:

1. Overall assessment of the PR quality
2. Key strengths and positive aspects
3. Critical issues that must be addressed
4. Suggestions for improvement
5. Recommendation (approve, request changes, needs discussion)
```

## Follow-up Prompts

### Pattern Documentation
```
Based on this review, help me document:

1. Any new patterns discovered in the codebase
2. Anti-patterns or issues to watch for in future reviews
3. Best practices specific to this repository
4. Lessons learned for future reviews
5. Updates needed to review guidelines
```

### Knowledge Extraction
```
Extract key learnings from this review session:

1. What new insights did we gain about the codebase?
2. Are there any recurring issues we should address systematically?
3. What automation or tooling could help with similar reviews?
4. How can we improve the review process based on this experience?
5. What should be documented for future reference?
```

## Automation Integration Prompts

### Codebase Search
```
Help me search the codebase to understand:

1. How is [FUNCTIONALITY] typically implemented in this codebase?
2. Are there similar patterns or functions I should compare against?
3. What are the common conventions for [SPECIFIC_AREA]?
4. Are there any existing utilities or helpers that could be reused?
5. How do other parts of the system handle similar requirements?
```

### Context Building
```
Build comprehensive context for this review:

1. Search for related functionality in the codebase
2. Find similar implementations or patterns
3. Identify dependencies and impact areas
4. Locate relevant documentation or comments
5. Find related tests and examples
```

## Repository-Specific Prompts

### Guidelines Update
```
Based on this review, suggest updates to repository-specific guidelines:

1. Are there new conventions we should document?
2. Do existing guidelines need clarification or updates?
3. Are there recurring issues we should address in guidelines?
4. What additional automation or checks would be helpful?
5. How can we improve the onboarding process for new contributors?
```

### Learning Capture
```
Capture learnings specific to this repository:

1. What unique patterns or conventions exist here?
2. What are the common gotchas for this codebase?
3. What architectural decisions should reviewers understand?
4. What are the critical areas that need careful review?
5. What context should be preserved for future reviews?
``` 