# Gusto Slack Skill - Prompts

## Setup and Configuration Prompts

### Initial Setup Verification
```
Help me verify that the Gusto Slack skill is properly configured:

1. Is Microsoft Edge installed and accessible on my system?
2. Is the SLACK_WORKSPACE_URL set correctly in the .env file?
3. Are the required Node.js dependencies installed?
4. Can I access the Gusto Slack workspace in my browser?
5. Is the BrowserHelper class working correctly?
6. Are there any firewall or network issues preventing connection?
7. Can I successfully launch Edge with remote debugging?
```

### Browser and Session Setup
```
Guide me through setting up browser automation for Slack:

1. How do I configure Microsoft Edge for remote debugging?
2. What should I do if Edge is already running?
3. How do I verify that the remote debugging port is available?
4. What are the signs of a successful browser connection?
5. How should I handle existing Edge sessions?
6. What browser settings might interfere with automation?
7. How do I troubleshoot browser connection failures?
```

### Authentication Setup
```
Help me set up authentication for Gusto Slack automation:

1. How do I manually authenticate with Okta/SSO in the browser?
2. What should I do if I encounter MFA prompts?
3. How can I verify that I'm properly authenticated to the workspace?
4. What are the signs of authentication expiration?
5. How do I handle different authentication flows?
6. What should I do if authentication fails during operations?
7. How can I maintain authentication across multiple operations?
```

## Message Formatting and Composition Prompts

### Basic Formatting
```
Help me understand Slack message formatting automation:

1. Why should I use character-by-character typing instead of paste?
2. How do I properly implement Shift+Enter for line breaks?
3. What's the correct timing for markdown parsing?
4. How do I handle bold formatting with asterisks?
5. What's the best way to include emoji in automated messages?
6. How do I format links properly in Slack messages?
7. What are common formatting mistakes to avoid?
```

### Bullet Mode Management
```
I need help with Slack's bullet mode automation:

1. How do I properly enter bullet mode?
2. Why should I only use '*' for the first bullet?
3. How do I continue bullets without adding extra asterisks?
4. What's the exact sequence to exit bullet mode?
5. Why do my headers become bullets?
6. How do I track bullet mode state in my automation?
7. What are the signs that bullet mode isn't working correctly?
```

### Complex Message Composition
```
Help me compose complex multi-section messages:

1. How do I transition between bullets, headers, and plain text?
2. What's the best way to structure messages with multiple sections?
3. How do I handle formatting state transitions?
4. What should I do if formatting gets corrupted during composition?
5. How do I verify that formatting was applied correctly?
6. What are strategies for recovering from formatting errors?
7. How do I test complex formatting before sending?
```

## Content Extraction and Processing Prompts

### Thread Information Extraction
```
Help me extract information from Slack threads:

1. How do I validate and parse Slack thread URLs?
2. What information should I extract from each message?
3. How do I handle different message types (text, attachments, etc.)?
4. What's the best way to preserve threading relationships?
5. How do I handle missing or inaccessible content?
6. What metadata should I include in the extracted data?
7. How do I ensure extraction accuracy and completeness?
```

### Data Processing and Export
```
Help me process and export extracted Slack data:

1. What's the optimal JSON structure for Slack thread data?
2. How should I format timestamps and dates?
3. What file naming conventions work best?
4. How do I handle large threads efficiently?
5. What validation should I perform on extracted data?
6. How do I ensure data integrity during export?
7. What metadata is most useful for downstream processing?
```

### Content Verification
```
Help me verify the quality of extracted content:

1. How can I validate that extraction was complete?
2. What checks should I perform on message content?
3. How do I detect missing or corrupted messages?
4. What should I do if thread access is denied?
5. How can I verify timestamp accuracy?
6. What are signs of incomplete thread extraction?
7. How do I handle private or restricted content?
```

## Error Handling and Troubleshooting Prompts

### Browser and Connection Issues
```
I'm having browser automation issues. Help me troubleshoot:

1. What should I do if Edge won't connect to remote debugging?
2. How do I handle browser connection drops during operations?
3. What are common browser-related error messages?
4. How should I recover from CDP connection failures?
5. What should I do if new tabs don't open correctly?
6. How do I handle browser crashes or unresponsive states?
7. What are signs of browser resource issues?
```

### Authentication and Access Problems
```
I'm having authentication issues with Slack automation. Help me resolve:

1. What should I do if I'm not authenticated to the workspace?
2. How do I handle session timeouts during long operations?
3. What are signs of authentication expiration?
4. How should I handle MFA prompts that appear during automation?
5. What should I do if I don't have access to specific channels?
6. How do I handle workspace permission changes?
7. What are strategies for maintaining authentication state?
```

### Formatting and Input Problems
```
I'm having message formatting issues. Help me debug:

1. Why isn't my markdown formatting working?
2. What should I do if bullet mode isn't activating?
3. How do I debug issues with message input focus?
4. Why are my messages being sent as multiple separate messages?
5. What should I do if typing appears to fail or be incomplete?
6. How do I handle emoji formatting problems?
7. What are signs that Slack's UI has changed affecting automation?
```

## Advanced Usage and Optimization Prompts

### Performance Optimization
```
Help me optimize the performance of Slack automation:

1. How can I make message composition faster while maintaining reliability?
2. What timing adjustments work best for different content types?
3. How do I optimize thread extraction for large conversations?
4. What are strategies for reducing browser resource usage?
5. How can I batch operations for better efficiency?
6. What monitoring should I implement for performance tracking?
7. How do I balance speed with automation reliability?
```

### Complex Automation Scenarios
```
Help me implement advanced Slack automation scenarios:

1. How do I handle multiple threads or channels in sequence?
2. What's the best way to implement conditional message formatting?
3. How do I create automation that adapts to different content types?
4. What are strategies for handling dynamic content requirements?
5. How do I implement error recovery for complex operations?
6. What are patterns for composing very long or complex messages?
7. How do I handle automation that needs to interact with Slack reactions or mentions?
```

### Integration and Workflow
```
Help me integrate Slack automation into larger workflows:

1. How can I trigger Slack operations from other automation systems?
2. What's the best way to pass data between Slack skill and other skills?
3. How do I handle errors that occur in integrated workflows?
4. What monitoring and alerting should I implement?
5. How can I make Slack automation results available to other systems?
6. What are patterns for creating reusable Slack automation components?
7. How do I handle workflow coordination and sequencing?
```

## Maintenance and Development Prompts

### Regular Maintenance
```
Help me maintain the Slack automation for reliable operation:

1. What regular maintenance tasks should I perform?
2. How do I monitor for Slack UI changes that might affect automation?
3. What should I do when Slack updates break my automation?
4. How often should I review and update selectors?
5. What performance metrics should I track over time?
6. How do I keep browser automation dependencies current?
7. What documentation should I maintain for the automation?
```

### Debugging and Development
```
Help me debug and improve my Slack automation:

1. What debugging techniques work best for browser automation issues?
2. How do I create effective test cases for formatting scenarios?
3. What logging should I implement for troubleshooting?
4. How do I test automation changes safely?
5. What are strategies for reproducing intermittent issues?
6. How do I validate that changes don't break existing functionality?
7. What are best practices for iterative automation development?
```

### Feature Enhancement
```
Help me enhance and extend Slack automation capabilities:

1. What additional Slack features could be automated?
2. How can I add support for more complex message types?
3. What are opportunities for improving user experience?
4. How can I make the automation more robust and reliable?
5. What integration opportunities exist with Slack APIs?
6. How can I add support for different Slack workspace configurations?
7. What are patterns for making automation more flexible and configurable?
```

## User Experience and Documentation Prompts

### User Guidance
```
Help me provide better user guidance for Slack automation:

1. What are the most common user questions about setup?
2. How can I improve error messages to be more actionable?
3. What examples would be most helpful for users?
4. How should I document common troubleshooting scenarios?
5. What training materials would help users get started?
6. How can I make the automation more intuitive to use?
7. What feedback mechanisms should I implement?
```

### Documentation Improvement
```
Help me improve documentation for the Slack automation:

1. What sections are most important for comprehensive documentation?
2. How should I document the formatting rules and gotchas?
3. What examples best illustrate proper usage patterns?
4. How do I document troubleshooting procedures effectively?
5. What configuration options need better documentation?
6. How should I document integration patterns with other skills?
7. What visual aids or diagrams would improve understanding?
```

## Innovation and Future Development Prompts

### Technology Evolution
```
Help me plan for the future evolution of Slack automation:

1. What new browser automation technologies should I consider?
2. How might Slack's platform changes affect automation approaches?
3. What opportunities exist for API-based integration vs browser automation?
4. How can I future-proof the automation against UI changes?
5. What emerging technologies could improve automation reliability?
6. How should I balance innovation with stability?
7. What community contributions would be most valuable?
```

### Advanced Capabilities
```
Help me explore advanced capabilities for Slack automation:

1. How could I implement real-time monitoring and response?
2. What are possibilities for intelligent content analysis?
3. How might I add support for multimedia content automation?
4. What are opportunities for AI-assisted message composition?
5. How could I implement advanced workflow coordination?
6. What are possibilities for cross-platform integration?
7. How might I add support for complex business process automation?
``` 