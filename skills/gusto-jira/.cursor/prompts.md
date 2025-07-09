# Gusto JIRA Skill - Prompts

## Setup and Configuration Prompts

### Initial Setup Verification
```
Help me verify that the Gusto JIRA skill is properly configured:

1. Are all required environment variables set in .env file?
2. Is the JIRA base URL correct (https://gustohq.atlassian.net)?
3. Is the API token valid and not expired?
4. Is the email address correct and associated with the token?
5. Are the required Node.js dependencies installed?
6. Can I access the Gusto JIRA instance from my network?
7. Do I have appropriate permissions for the JIRA project?
```

### API Token Setup
```
Guide me through setting up a JIRA API token:

1. How do I navigate to Atlassian Account Settings?
2. What information should I provide when creating the token?
3. How do I copy the token securely to my .env file?
4. What permissions does the token need?
5. How can I test if the token is working correctly?
6. What should I do if the token generation fails?
7. How often should I rotate the API token?
```

### Configuration Troubleshooting
```
I'm having configuration issues with the Gusto JIRA skill. Help me diagnose:

1. What are the exact environment variable names and formats required?
2. How can I verify my JIRA base URL is correct?
3. What format should my email address be in?
4. How can I test my API token without running the full script?
5. What are common configuration mistakes to avoid?
6. How can I validate my .env file is properly formatted?
7. What should I do if environment variables aren't being loaded?
```

## Connection and Authentication Prompts

### Connection Testing
```
Help me test my connection to Gusto JIRA:

1. How do I run the connection test script?
2. What should I see if the connection is successful?
3. What do different error messages mean?
4. How can I test individual components (auth, search, etc.)?
5. What should I do if the connection test fails?
6. How can I debug network connectivity issues?
7. What are signs of API rate limiting?
```

### Authentication Issues
```
I'm having authentication problems with JIRA. Help me troubleshoot:

1. What error codes indicate authentication failures?
2. How can I verify my API token is still valid?
3. What should I do if I get 401 Unauthorized errors?
4. How do I handle 403 Forbidden errors?
5. What are common causes of authentication failures?
6. How can I regenerate my API token?
7. What should I do if my email/token combination doesn't work?
```

### Permission Problems
```
I'm getting permission errors when accessing JIRA. Help me resolve:

1. What JIRA permissions do I need for this skill?
2. How can I check my current permissions?
3. What should I do if I can't access certain projects?
4. How do I request additional permissions?
5. What are common permission-related error messages?
6. How can I test my permissions without running queries?
7. Who should I contact for permission issues?
```

## Query and Data Retrieval Prompts

### JQL Query Optimization
```
Help me optimize my JIRA queries for better performance and results:

1. What JQL patterns work best for finding my assigned tickets?
2. How can I filter tickets by specific criteria (status, priority, etc.)?
3. What's the best way to sort results for my workflow?
4. How can I limit results to avoid large datasets?
5. What are some useful JQL functions and operators?
6. How can I test JQL queries before using them in automation?
7. What are performance best practices for JQL queries?
```

### Custom Query Development
```
Help me create custom JQL queries for specific use cases:

1. How do I find tickets created in the last week?
2. What query gets only high-priority tickets assigned to me?
3. How can I find tickets in specific components or labels?
4. What's the syntax for filtering by multiple statuses?
5. How do I query for tickets with specific custom fields?
6. What's the best way to exclude certain types of tickets?
7. How can I create queries for different team workflows?
```

### Data Processing and Output
```
Help me understand and customize the output from JIRA queries:

1. What information is included in the JSON export?
2. How can I modify the console output format?
3. What metadata is captured with each ticket?
4. How are dates and times formatted in the output?
5. What should I do if some fields are missing or null?
6. How can I customize which fields are included?
7. What's the best way to process the output for my needs?
```

## Error Handling and Troubleshooting Prompts

### Common Error Resolution
```
I'm encountering errors with the JIRA skill. Help me resolve:

1. What do different HTTP status codes mean (401, 403, 404, 500)?
2. How should I handle network connectivity errors?
3. What should I do if queries return no results?
4. How do I handle API rate limiting errors?
5. What are common JQL syntax errors and how to fix them?
6. How should I respond to server errors from JIRA?
7. What error patterns indicate configuration problems?
```

### Performance Issues
```
The JIRA skill is running slowly. Help me optimize performance:

1. What factors affect query performance?
2. How can I optimize my JQL queries for speed?
3. What should I do if API responses are slow?
4. How can I handle large result sets efficiently?
5. What are signs of API rate limiting?
6. How can I reduce the number of API calls?
7. What timeout settings should I use?
```

### Data Quality Issues
```
I'm having issues with data quality from JIRA queries. Help me improve:

1. How can I validate that extracted data is accurate?
2. What should I do if ticket information is incomplete?
3. How do I handle special characters or encoding issues?
4. What's the best way to deal with missing custom fields?
5. How can I ensure date/time information is correct?
6. What should I do if ticket counts don't match expectations?
7. How can I verify the integrity of exported JSON data?
```

## Integration and Workflow Prompts

### Skill Integration Planning
```
Help me integrate the JIRA skill with other automation skills:

1. What output formats work best for integration with other tools?
2. How can I pass JIRA data to other skills or processes?
3. What's the best way to trigger JIRA queries from other automation?
4. How should I handle errors that occur during integration?
5. What metadata should I preserve for downstream processing?
6. How can I standardize output formats across different skills?
7. What are best practices for skill composition and chaining?
```

### Workflow Automation
```
Help me design automated workflows using the JIRA skill:

1. How can I schedule regular JIRA data retrieval?
2. What triggers should I use for different automation scenarios?
3. How do I handle workflow errors and recovery?
4. What monitoring should I implement for automated workflows?
5. How can I notify users of important ticket updates?
6. What's the best way to filter and prioritize ticket data?
7. How should I structure workflows for different team needs?
```

### Reporting and Analytics
```
Help me use JIRA data for reporting and analytics:

1. What data points are most useful for team metrics?
2. How can I track ticket trends over time?
3. What's the best way to analyze workload distribution?
4. How can I identify bottlenecks in ticket processing?
5. What visualizations work best for JIRA data?
6. How should I structure data for dashboard creation?
7. What are key performance indicators for development teams?
```

## Advanced Usage and Customization Prompts

### Advanced Query Techniques
```
Help me implement advanced JIRA query techniques:

1. How can I use complex boolean logic in JQL queries?
2. What are advanced JQL functions and when should I use them?
3. How do I query across multiple projects effectively?
4. What's the best way to handle historical data queries?
5. How can I implement fuzzy matching or text search?
6. What are techniques for querying custom fields?
7. How do I optimize queries for specific JIRA configurations?
```

### API Usage Optimization
```
Help me optimize my usage of the JIRA API:

1. How can I minimize API calls while getting needed data?
2. What caching strategies work well with JIRA data?
3. How should I handle pagination for large result sets?
4. What's the best way to batch multiple operations?
5. How can I implement efficient retry logic?
6. What are best practices for API rate limit management?
7. How should I monitor and track API usage?
```

### Customization and Extension
```
Help me customize and extend the JIRA skill for my specific needs:

1. How can I add support for additional JIRA fields?
2. What's the best way to implement custom output formats?
3. How do I add new query types or search capabilities?
4. What's involved in adding ticket creation or update functionality?
5. How can I integrate with JIRA webhooks or real-time updates?
6. What are patterns for extending the skill architecture?
7. How should I contribute improvements back to the skill?
```

## Maintenance and Operations Prompts

### Regular Maintenance
```
Help me maintain the JIRA skill for reliable operation:

1. What regular maintenance tasks should I perform?
2. How often should I rotate API tokens?
3. What monitoring should I implement for ongoing operations?
4. How do I stay current with JIRA API changes?
5. What are signs that the skill needs attention?
6. How should I test the skill after JIRA updates?
7. What documentation should I maintain?
```

### Security and Compliance
```
Help me ensure the JIRA skill meets security and compliance requirements:

1. How should I secure API tokens and credentials?
2. What data privacy considerations apply to JIRA data?
3. How do I implement appropriate access controls?
4. What audit logging should I implement?
5. How should I handle sensitive ticket information?
6. What are compliance requirements for data retention?
7. How do I ensure secure data transmission?
```

### Scaling and Performance
```
Help me scale the JIRA skill for larger teams and higher volume:

1. How does the skill perform with large numbers of tickets?
2. What are bottlenecks when scaling to multiple users?
3. How can I optimize for high-frequency queries?
4. What infrastructure considerations apply to scaling?
5. How should I handle concurrent access and rate limits?
6. What monitoring is needed for scaled deployments?
7. What are patterns for distributed JIRA data processing?
```

## Learning and Development Prompts

### Skill Improvement
```
Help me improve my understanding and usage of the JIRA skill:

1. What JIRA concepts are most important for effective automation?
2. How can I better understand JQL query language?
3. What are common patterns in JIRA workflow automation?
4. How do I learn about new JIRA features that could be useful?
5. What resources help with JIRA API development?
6. How can I contribute to improving the skill?
7. What skills complement JIRA automation capabilities?
```

### Best Practices Learning
```
Help me learn and implement best practices for JIRA automation:

1. What are industry standards for JIRA automation?
2. How do successful teams use JIRA automation?
3. What are common mistakes to avoid in JIRA automation?
4. How do I balance automation with manual processes?
5. What are effective patterns for team collaboration?
6. How should I measure the success of JIRA automation?
7. What are emerging trends in JIRA and automation?
``` 