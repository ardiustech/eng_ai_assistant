# Gusto JIRA Skill - Automation Rules

## Environment Setup and Configuration

### Prerequisites Validation
1. **Node.js Environment**
   - Verify Node.js is installed and accessible
   - Check that required dependencies are installed at repository root
   - Ensure repository structure is correct

2. **JIRA Access Requirements**
   - Verify access to Gusto JIRA instance (https://gustohq.atlassian.net)
   - Ensure user has appropriate JIRA permissions
   - Validate network connectivity to JIRA instance

3. **Environment Configuration**
   - Create `.env` file in repository root if not exists
   - Populate with required JIRA configuration variables
   - Validate environment variables are properly set

### Environment Variables Setup
1. **Required Variables**
   ```
   JIRA_BASE_URL=https://gustohq.atlassian.net
   JIRA_API_TOKEN=your-jira-api-token-here
   JIRA_EMAIL=your-email@gusto.com
   JIRA_PROJECT_KEY=PROJ
   ```

2. **API Token Generation**
   - Navigate to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)
   - Click "Create API token"
   - Provide descriptive name (e.g., "Eng AI Assistant JIRA Access")
   - Copy generated token to `.env` file
   - Test token immediately after generation

3. **Configuration Validation**
   - Verify all required environment variables are set
   - Check email format and domain
   - Validate JIRA base URL format
   - Ensure API token is properly formatted

## Connection Testing Protocol

### Pre-Operation Testing
1. **Always Test Connection First**
   - Run `npm run gusto-jira-test` before any operations
   - Verify all configuration parameters
   - Test API connectivity and authentication
   - Validate user permissions and access

2. **Test Script Execution**
   - Execute `node skills/gusto-jira/test-connection.js`
   - Monitor console output for any errors
   - Verify each test step passes successfully
   - Address any failures before proceeding

### Test Validation Steps
1. **Configuration Validation**
   - Check all required environment variables are present
   - Validate format of JIRA base URL
   - Verify email format and domain
   - Ensure API token is not empty

2. **API Connectivity Test**
   - Test HTTP connection to JIRA instance
   - Verify SSL/TLS certificate validity
   - Check for network connectivity issues
   - Validate DNS resolution

3. **Authentication Test**
   - Test API token authentication
   - Verify user identity and permissions
   - Check for token expiration or revocation
   - Validate email and token combination

4. **Search Functionality Test**
   - Test basic JQL query execution
   - Verify search results format
   - Check for query syntax errors
   - Validate result parsing

5. **User-Specific Query Test**
   - Test queries targeting current user
   - Verify unresolved tickets query
   - Check for empty result handling
   - Validate result formatting

## JIRA Operations Automation

### Ticket Retrieval Process
1. **Query Execution**
   - Use default JQL query: `assignee = currentUser() AND resolution = Unresolved ORDER BY created ASC`
   - Handle empty results gracefully
   - Process results in batches if needed
   - Validate query syntax before execution

2. **Data Processing**
   - Extract relevant fields from JIRA response
   - Format dates and times for human readability
   - Handle missing or null fields appropriately
   - Structure data for both console and JSON output

3. **Output Generation**
   - Create formatted console output with ticket details
   - Generate JSON export with structured data
   - Include metadata (timestamp, query used, total count)
   - Use timestamp-based file naming to prevent overwrites

### Error Handling Workflow
1. **Authentication Errors (401)**
   - Check API token validity
   - Verify email address is correct
   - Regenerate API token if expired
   - Test with new credentials

2. **Permission Errors (403)**
   - Verify user has appropriate JIRA permissions
   - Check project access permissions
   - Validate user is assigned to correct groups
   - Contact JIRA administrator if needed

3. **Network Errors**
   - Check internet connectivity
   - Verify JIRA base URL is correct
   - Test DNS resolution
   - Check for firewall or proxy issues

4. **API Errors**
   - Check JIRA service status
   - Verify API endpoint availability
   - Handle rate limiting gracefully
   - Implement retry logic for transient failures

## Query Customization

### JQL Query Patterns
1. **Common Query Types**
   - Unresolved tickets: `assignee = currentUser() AND resolution = Unresolved`
   - In progress tickets: `assignee = currentUser() AND status = "In Progress"`
   - Recent tickets: `assignee = currentUser() AND created >= -7d`
   - High priority tickets: `assignee = currentUser() AND priority = High`

2. **Query Modification**
   - Modify config.js to change default query
   - Add custom queries for specific use cases
   - Test queries in JIRA interface before automation
   - Validate query syntax and results

3. **Query Optimization**
   - Use appropriate sorting for use case
   - Limit results with pagination if needed
   - Include only necessary fields in response
   - Optimize for performance with large result sets

### Result Processing
1. **Data Extraction**
   - Extract key fields: key, summary, status, priority, type
   - Include reporter, creation date, update date
   - Capture components, labels, and other metadata
   - Handle custom fields appropriately

2. **Formatting and Display**
   - Format dates for local timezone
   - Display priority and status with appropriate icons
   - Show relevant metadata for each ticket
   - Provide clickable URLs for browser access

3. **JSON Export Structure**
   - Include complete ticket data
   - Add metadata about retrieval
   - Structure for easy programmatic processing
   - Include query used for reference

## Integration with Other Skills

### Output Format Standards
1. **Console Output**
   - Use consistent formatting across skills
   - Include appropriate emoji and icons
   - Provide clear section headers
   - Show progress and completion status

2. **JSON Export**
   - Use standard metadata format
   - Include timestamps in ISO format
   - Structure data for easy parsing
   - Include query and parameter information

3. **File Naming**
   - Use timestamp-based naming: `jira-tickets-YYYYMMDD-HHMMSS.json`
   - Include skill identifier in filename
   - Prevent overwrites with unique timestamps
   - Use consistent naming across skills

### Error Propagation
1. **Standardized Error Handling**
   - Use consistent error message format
   - Include specific error codes and descriptions
   - Provide actionable troubleshooting guidance
   - Log errors appropriately for debugging

2. **Recovery Strategies**
   - Implement retry logic for transient failures
   - Provide alternative approaches for failures
   - Enable graceful degradation where possible
   - Maintain operation logs for troubleshooting

## Performance Optimization

### API Call Optimization
1. **Efficient Queries**
   - Use specific JQL to limit results
   - Request only necessary fields
   - Implement pagination for large result sets
   - Cache results when appropriate

2. **Connection Management**
   - Reuse connections when possible
   - Implement connection pooling if needed
   - Handle connection timeouts gracefully
   - Clean up resources after operations

3. **Rate Limit Handling**
   - Implement exponential backoff for retries
   - Monitor API rate limits
   - Distribute requests over time if needed
   - Handle rate limit responses appropriately

### Memory Management
1. **Data Processing**
   - Process large result sets in batches
   - Avoid loading all data into memory at once
   - Clean up temporary data structures
   - Monitor memory usage during operations

2. **Output Generation**
   - Stream output for large result sets
   - Use efficient data structures
   - Minimize memory footprint
   - Handle memory pressure gracefully

## Security and Authentication

### Credential Management
1. **Secure Storage**
   - Store API tokens in environment variables
   - Use .env file for local development
   - Ensure .env file is gitignored
   - Never log or expose credentials

2. **Token Lifecycle**
   - Generate tokens with appropriate scope
   - Monitor token expiration
   - Rotate tokens regularly
   - Revoke unused tokens

3. **Access Control**
   - Use principle of least privilege
   - Verify user permissions before operations
   - Audit API access regularly
   - Monitor for unauthorized access

### Data Security
1. **Transmission Security**
   - Use HTTPS for all API communications
   - Validate SSL certificates
   - Implement certificate pinning if needed
   - Monitor for security vulnerabilities

2. **Data Handling**
   - Handle sensitive ticket data appropriately
   - Avoid logging sensitive information
   - Implement data retention policies
   - Secure temporary files and outputs

## Maintenance and Monitoring

### Regular Maintenance
1. **Token Management**
   - Monitor token expiration dates
   - Rotate tokens according to policy
   - Update tokens in environment configuration
   - Test new tokens before deployment

2. **API Updates**
   - Monitor JIRA API version changes
   - Update to newer API versions when available
   - Test compatibility with API changes
   - Maintain backward compatibility where possible

3. **Performance Monitoring**
   - Track API response times
   - Monitor error rates and types
   - Analyze usage patterns
   - Optimize based on performance data

### Troubleshooting Protocol
1. **Error Diagnosis**
   - Analyze error messages and codes
   - Check configuration and environment
   - Verify API connectivity and authentication
   - Test with minimal queries

2. **Recovery Procedures**
   - Document common issues and solutions
   - Implement automated recovery where possible
   - Provide clear escalation paths
   - Maintain troubleshooting documentation

3. **Logging and Monitoring**
   - Implement comprehensive logging
   - Monitor for anomalies and errors
   - Set up alerts for critical failures
   - Maintain audit trails for security

## Testing and Validation

### Test Cases
1. **Connection Testing**
   - Test successful authentication
   - Test authentication failures
   - Test network connectivity issues
   - Test API endpoint availability

2. **Query Testing**
   - Test valid JQL queries
   - Test invalid query syntax
   - Test empty result sets
   - Test large result sets

3. **Error Handling Testing**
   - Test authentication errors
   - Test permission errors
   - Test network errors
   - Test API errors

### Validation Procedures
1. **Output Validation**
   - Verify data accuracy
   - Check formatting consistency
   - Validate JSON structure
   - Confirm metadata inclusion

2. **Performance Validation**
   - Measure response times
   - Check memory usage
   - Monitor resource utilization
   - Test with various load levels

3. **Security Validation**
   - Verify credential security
   - Check data transmission security
   - Test access controls
   - Validate audit logging 