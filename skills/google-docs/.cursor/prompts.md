# Google Docs Skill - Prompts

## Setup and Configuration Prompts

### Initial Setup Verification
```
Help me verify that the Google Docs skill is properly configured:

1. Is Microsoft Edge installed and accessible?
2. Is the remote debugging port (9222) available?
3. Are the required dependencies installed?
4. Is the BrowserHelper class working correctly?
5. Are the timeout settings appropriate for my use case?
6. Is the output directory configured correctly?
7. Are there any permission issues with file creation?
```

### Authentication Setup
```
Guide me through setting up authentication for Google Docs:

1. How do I verify if I'm already authenticated with Google?
2. What should I do if I'm not authenticated?
3. How do I handle 2FA/MFA requirements?
4. What are the signs of authentication failure?
5. How do I re-authenticate without losing my session?
6. What permissions do I need for document access?
7. How do I handle multiple Google accounts?
```

### Configuration Optimization
```
Help me optimize the configuration for Google Docs extraction:

1. What timeout settings work best for documents of different sizes?
2. How should I configure the viewport for optimal content extraction?
3. What output formats should I enable for my use case?
4. How do I optimize performance for batch operations?
5. What error handling settings should I use?
6. How do I configure screenshot capture for debugging?
7. What logging levels are appropriate?
```

## Troubleshooting Prompts

### Authentication Issues
```
I'm having authentication problems with Google Docs. Help me diagnose:

1. What error messages am I seeing?
2. Is my browser session still active?
3. Has my Google session expired?
4. Are there any 2FA prompts I need to handle?
5. Is the document accessible with my account?
6. Are there permission issues with the document?
7. What steps should I take to re-authenticate?
```

### Content Extraction Problems
```
I'm having trouble extracting content from Google Docs. Help me troubleshoot:

1. Is the document loading completely?
2. Are there any JavaScript errors in the console?
3. Is the content dynamically loaded?
4. Are the DOM selectors still working?
5. Is the document too large for current timeout settings?
6. Are there any network connectivity issues?
7. What does the error screenshot show?
```

### Performance Issues
```
The Google Docs extraction is running slowly. Help me optimize:

1. How large is the document being processed?
2. Are there network latency issues?
3. Are timeout settings appropriate?
4. Is the browser responsive during extraction?
5. Are there memory usage issues?
6. Are multiple operations running concurrently?
7. What performance metrics should I monitor?
```

### Error Recovery
```
I encountered an error during Google Docs extraction. Help me recover:

1. What type of error occurred?
2. Is this a transient or permanent failure?
3. Should I retry the operation?
4. Are there alternative approaches to try?
5. What information should I log for debugging?
6. How can I prevent this error in the future?
7. Are there any cleanup tasks I need to perform?
```

## Content Processing Prompts

### Extraction Quality Assessment
```
Help me evaluate the quality of content extracted from Google Docs:

1. Does the extracted content match the source document?
2. Is the formatting preserved appropriately?
3. Are headings and structure captured correctly?
4. Is the word count accurate?
5. Are special characters handled properly?
6. Is the document outline complete?
7. Are there any missing or corrupted sections?
```

### Output Format Optimization
```
Help me optimize the output format for Google Docs extraction:

1. What information should be included in the JSON output?
2. How should I format the text output for readability?
3. What metadata is most useful to capture?
4. How should I handle different document structures?
5. What naming convention should I use for output files?
6. How should I organize output for batch operations?
7. What format works best for downstream processing?
```

### Content Validation
```
Help me validate the extracted content from Google Docs:

1. How can I verify extraction accuracy?
2. What checks should I perform on the extracted data?
3. How do I handle missing or incomplete content?
4. What should I do if the content doesn't match expectations?
5. How can I detect and handle corrupted extractions?
6. What metrics should I use to measure extraction quality?
7. How do I handle different document types and structures?
```

## Integration and Workflow Prompts

### Skill Integration Planning
```
Help me plan integration of Google Docs skill with other skills:

1. What output formats work best for integration?
2. How should I handle authentication across multiple skills?
3. What error handling strategies work for skill composition?
4. How can I share browser sessions between skills?
5. What metadata should I pass between skills?
6. How do I handle workflow errors and recovery?
7. What logging strategies work for integrated workflows?
```

### Batch Processing Setup
```
Help me set up batch processing for multiple Google Docs:

1. How should I structure the input list of documents?
2. What error handling is needed for batch operations?
3. How do I maintain authentication across multiple documents?
4. What progress reporting should I implement?
5. How should I handle partial failures in batch operations?
6. What naming conventions work for batch outputs?
7. How do I optimize performance for large batches?
```

### Automation Workflow Design
```
Help me design an automated workflow using Google Docs skill:

1. What trigger mechanisms should I use?
2. How do I handle document access permissions in automation?
3. What error recovery strategies work for automated workflows?
4. How should I monitor and log automated operations?
5. What notification mechanisms should I implement?
6. How do I handle document updates and versioning?
7. What security considerations apply to automated access?
```

## Development and Maintenance Prompts

### Code Enhancement
```
Help me improve the Google Docs skill implementation:

1. What additional features would be most valuable?
2. How can I improve extraction accuracy?
3. What performance optimizations are possible?
4. How can I make the code more maintainable?
5. What error handling improvements are needed?
6. How can I better support different document types?
7. What testing improvements should I implement?
```

### Security Review
```
Help me review the security aspects of Google Docs skill:

1. Are there any credential storage risks?
2. How secure is the browser-based authentication?
3. What data privacy concerns should I address?
4. How should I handle document access permissions?
5. Are there any network security considerations?
6. What audit logging should I implement?
7. How do I handle sensitive document content?
```

### Maintenance Planning
```
Help me plan ongoing maintenance for Google Docs skill:

1. What changes should I monitor in Google Docs UI?
2. How often should I update DOM selectors?
3. What dependency updates are important?
4. How should I test after Google service updates?
5. What performance monitoring should I implement?
6. How do I handle breaking changes in dependencies?
7. What documentation needs regular updates?
```

## User Support Prompts

### User Guidance
```
Help me provide better user guidance for Google Docs skill:

1. What are the most common user questions?
2. How can I improve the setup instructions?
3. What troubleshooting guides are most needed?
4. How should I document different use cases?
5. What examples would be most helpful?
6. How can I make error messages more actionable?
7. What training materials should I create?
```

### Feature Requests
```
Help me evaluate and prioritize feature requests for Google Docs skill:

1. What features are users requesting most?
2. How difficult would each feature be to implement?
3. What impact would each feature have on existing functionality?
4. How do I balance new features with maintenance?
5. What dependencies do new features introduce?
6. How should I communicate feature roadmaps?
7. What testing is needed for new features?
```

## Innovation and Improvement Prompts

### Technology Updates
```
Help me stay current with technology changes affecting Google Docs skill:

1. What changes are happening in Google Docs interface?
2. Are there new browser automation technologies I should consider?
3. What improvements are available in dependency libraries?
4. How can I leverage new JavaScript features?
5. What security updates affect browser automation?
6. Are there new testing frameworks I should adopt?
7. How do I balance innovation with stability?
```

### Pattern Recognition
```
Help me identify and document patterns from Google Docs skill development:

1. What patterns from this skill apply to other document services?
2. How can I generalize authentication patterns?
3. What content extraction patterns are reusable?
4. How can I standardize error handling across skills?
5. What configuration patterns work well?
6. How can I improve the integration patterns?
7. What testing patterns should I document?
```

### Future Planning
```
Help me plan the future evolution of Google Docs skill:

1. What new capabilities would be most valuable?
2. How might Google Docs service changes affect the skill?
3. What integration opportunities exist with other services?
4. How can I improve the user experience?
5. What performance improvements are possible?
6. How should I evolve the skill architecture?
7. What community contributions would be valuable?
``` 