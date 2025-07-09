# Feature Development Skill - Prompts

## Initial Planning Prompts

### Requirements Analysis
```
Help me analyze the requirements for [FEATURE_NAME] in [REPO_NAME]:

1. What is the core problem this feature is trying to solve?
2. Who are the target users and what are their needs?
3. What are the key functional requirements?
4. What are the non-functional requirements (performance, security, scalability)?
5. What are the acceptance criteria and definition of done?
6. Are there any constraints or limitations to consider?
7. What are the success metrics for this feature?
```

### Technical Architecture Analysis
```
Analyze the technical architecture for implementing [FEATURE_NAME]:

1. How does this feature fit into the existing system architecture?
2. What components or modules will need to be created or modified?
3. What are the data flow requirements?
4. What external dependencies or integrations are needed?
5. What are the scalability and performance considerations?
6. Are there any security implications to consider?
7. What testing strategy should be employed?
```

### Risk Assessment
```
Identify and assess risks for developing [FEATURE_NAME]:

1. What are the main technical risks and challenges?
2. What are the integration risks with existing systems?
3. What are the performance and scalability risks?
4. What are the security risks and considerations?
5. What are the timeline and resource risks?
6. What are the user experience and adoption risks?
7. What mitigation strategies should be implemented?
```

## Development Planning Prompts

### Feature Breakdown
```
Help me break down [FEATURE_NAME] into manageable components:

1. What are the core components or modules needed?
2. How should these components be prioritized?
3. What are the dependencies between components?
4. What can be developed in parallel vs. sequentially?
5. What are the minimum viable feature requirements?
6. What are the nice-to-have enhancements?
7. How should the implementation be phased?
```

### Technical Design
```
Help me design the technical implementation for [FEATURE_NAME]:

1. What design patterns are appropriate for this feature?
2. How should the code be organized and structured?
3. What are the API or interface requirements?
4. What data structures and models are needed?
5. How should error handling be implemented?
6. What logging and monitoring should be added?
7. How should configuration be managed?
```

### Implementation Strategy
```
Develop an implementation strategy for [FEATURE_NAME]:

1. What is the optimal development approach (TDD, iterative, etc.)?
2. What should be the order of implementation?
3. How should testing be integrated throughout development?
4. What are the key milestones and deliverables?
5. How should code reviews be structured?
6. What documentation needs to be created?
7. How should deployment be planned?
```

## Development Execution Prompts

### Code Implementation
```
Guide me through implementing [SPECIFIC_COMPONENT] for [FEATURE_NAME]:

1. What existing patterns should I follow in this codebase?
2. What are the key functions or methods needed?
3. How should error handling be implemented?
4. What logging should be added?
5. What edge cases need to be considered?
6. How should this integrate with existing components?
7. What performance considerations are important?
```

### Testing Strategy
```
Help me develop a testing strategy for [FEATURE_NAME]:

1. What types of tests are needed (unit, integration, e2e)?
2. What are the key test scenarios to cover?
3. How should edge cases and error conditions be tested?
4. What test data and fixtures are needed?
5. How should performance testing be approached?
6. What security testing is required?
7. How should test automation be implemented?
```

### Code Quality Review
```
Review the code quality for [FEATURE_NAME]:

1. Does the code follow established patterns and conventions?
2. Is the code readable and maintainable?
3. Are there any potential security vulnerabilities?
4. Are there any performance issues or optimizations needed?
5. Is error handling comprehensive and appropriate?
6. Is the code properly documented?
7. Are there opportunities for refactoring or improvement?
```

## Problem-Solving Prompts

### Debugging and Troubleshooting
```
Help me debug [SPECIFIC_ISSUE] in [FEATURE_NAME]:

1. What are the symptoms and error messages?
2. What is the expected vs. actual behavior?
3. What are the possible root causes?
4. How can I reproduce the issue consistently?
5. What debugging tools and techniques should I use?
6. What are the steps to isolate and fix the problem?
7. How can I prevent similar issues in the future?
```

### Performance Optimization
```
Help me optimize the performance of [FEATURE_NAME]:

1. What are the current performance bottlenecks?
2. What metrics should I use to measure performance?
3. What optimization strategies are applicable?
4. How can I improve database query performance?
5. What caching strategies should be implemented?
6. How can I optimize frontend rendering performance?
7. What are the trade-offs of different optimization approaches?
```

### Security Review
```
Conduct a security review for [FEATURE_NAME]:

1. What are the potential security vulnerabilities?
2. How is user input validated and sanitized?
3. How are authentication and authorization handled?
4. What are the data privacy and protection measures?
5. How are secrets and sensitive data managed?
6. What are the potential attack vectors?
7. What security best practices should be implemented?
```

## Integration and Deployment Prompts

### Integration Planning
```
Plan the integration of [FEATURE_NAME] with existing systems:

1. What are the integration points with existing systems?
2. How should data migration be handled?
3. What backward compatibility considerations exist?
4. How should feature flags be used?
5. What are the rollback strategies?
6. How should user training and communication be handled?
7. What monitoring and alerting should be implemented?
```

### Deployment Strategy
```
Develop a deployment strategy for [FEATURE_NAME]:

1. What are the deployment dependencies and requirements?
2. How should the deployment be phased or staged?
3. What testing is needed in each environment?
4. What are the rollback procedures?
5. How should database migrations be handled?
6. What monitoring and health checks are needed?
7. What post-deployment validation should be performed?
```

### Documentation Planning
```
Plan the documentation for [FEATURE_NAME]:

1. What technical documentation is needed?
2. What user documentation should be created?
3. What API documentation is required?
4. What operational documentation is needed?
5. How should code comments and inline documentation be structured?
6. What examples and tutorials would be helpful?
7. How should documentation be maintained and updated?
```

## Quality Assurance Prompts

### Testing Validation
```
Validate the testing approach for [FEATURE_NAME]:

1. Is test coverage adequate for all functionality?
2. Are edge cases and error conditions properly tested?
3. Are integration tests comprehensive?
4. Is performance testing adequate?
5. Are security tests covering potential vulnerabilities?
6. Are tests maintainable and reliable?
7. What additional testing is needed?
```

### User Experience Review
```
Review the user experience of [FEATURE_NAME]:

1. Is the feature intuitive and easy to use?
2. Are error messages clear and helpful?
3. Is the performance acceptable for users?
4. Is the feature accessible to all users?
5. Does the feature work consistently across different devices?
6. How can the user experience be improved?
7. What user feedback should be gathered?
```

### Production Readiness
```
Assess the production readiness of [FEATURE_NAME]:

1. Is the feature functionally complete and tested?
2. Are performance requirements met?
3. Are security requirements satisfied?
4. Is monitoring and alerting configured?
5. Is documentation complete and up-to-date?
6. Are deployment procedures tested and documented?
7. What remaining tasks are needed for production release?
```

## Knowledge Management Prompts

### Learning Extraction
```
Extract key learnings from developing [FEATURE_NAME]:

1. What new technical insights were gained?
2. What patterns or approaches worked well?
3. What challenges were encountered and how were they resolved?
4. What would be done differently next time?
5. What can be shared with the team or organization?
6. What should be documented for future reference?
7. What process improvements can be made?
```

### Pattern Documentation
```
Document patterns and best practices from [FEATURE_NAME]:

1. What reusable patterns were developed?
2. What architectural decisions were made and why?
3. What code conventions or standards were established?
4. What testing patterns proved effective?
5. What deployment or operational patterns were used?
6. What should be added to the team's knowledge base?
7. How can these patterns be shared across projects?
```

### Process Improvement
```
Identify process improvements based on [FEATURE_NAME] development:

1. What parts of the development process worked well?
2. What bottlenecks or inefficiencies were encountered?
3. What tools or techniques could improve productivity?
4. How can the feedback and review process be improved?
5. What communication or collaboration improvements are needed?
6. How can quality assurance be enhanced?
7. What should be changed for future feature development?
```

## Language-Specific Prompts

### JavaScript/TypeScript Development
```
Guide JavaScript/TypeScript development for [FEATURE_NAME]:

1. What TypeScript types and interfaces are needed?
2. How should async/await be used effectively?
3. What are the performance considerations for the frontend?
4. How should state management be implemented?
5. What are the security considerations (XSS, CSRF, etc.)?
6. How should error handling be implemented?
7. What testing frameworks and patterns should be used?
```

### Python Development
```
Guide Python development for [FEATURE_NAME]:

1. What Python packages and dependencies are needed?
2. How should the code be organized into modules?
3. What are the performance optimization opportunities?
4. How should database interactions be handled?
5. What are the security considerations?
6. How should logging and monitoring be implemented?
7. What testing frameworks and patterns should be used?
```

### Java Development
```
Guide Java development for [FEATURE_NAME]:

1. What design patterns are appropriate for this feature?
2. How should the code be organized into packages?
3. What are the performance and memory considerations?
4. How should database access be implemented?
5. What are the security implementation requirements?
6. How should logging and monitoring be handled?
7. What testing frameworks and patterns should be used?
```

## Repository-Specific Prompts

### Context Integration
```
Integrate [FEATURE_NAME] with the existing [REPO_NAME] codebase:

1. What are the existing patterns and conventions to follow?
2. How should this feature integrate with existing architecture?
3. What existing utilities or services can be reused?
4. How should this feature be tested given existing test patterns?
5. What documentation updates are needed?
6. How should this feature be deployed using existing processes?
7. What team-specific considerations apply?
```

### Legacy System Integration
```
Integrate [FEATURE_NAME] with legacy systems in [REPO_NAME]:

1. What are the constraints imposed by legacy systems?
2. How should backward compatibility be maintained?
3. What migration strategies are needed?
4. How should data consistency be ensured?
5. What are the performance implications?
6. How should errors and edge cases be handled?
7. What testing is needed for legacy integration?
``` 