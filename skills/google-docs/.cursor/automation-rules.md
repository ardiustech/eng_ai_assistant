# Google Docs Skill - Automation Rules

## Setup and Prerequisites

### Environment Preparation
1. **Browser Setup**
   - Ensure Microsoft Edge is installed and available
   - Start Edge with remote debugging enabled if not already running
   - Use BrowserHelper class from `lib/` for browser management
   - Configure appropriate viewport size (1920x1080 recommended)

2. **Authentication Verification**
   - Always run connection test before document operations
   - Use `npm run google-docs-test` to verify authentication
   - Prompt user for manual authentication if needed
   - Verify Google account access for target documents

3. **Configuration Setup**
   - Review and adjust timeouts in `config.js` based on document size
   - Configure output directory and file naming preferences
   - Set appropriate wait times for content loading
   - Configure error handling and screenshot capture settings

## Authentication Workflow

### Initial Authentication Check
1. **Connect to Browser**
   - Use BrowserHelper to connect to existing Edge session
   - Check if remote debugging port (9222) is accessible
   - Launch new Edge instance if needed with remote debugging enabled
   - Set appropriate viewport and user agent

2. **Google Authentication Verification**
   - Navigate to Google Docs homepage or a test document
   - Check for authentication indicators in the DOM
   - Look for user profile information or signed-in state
   - Handle authentication redirects appropriately

3. **Authentication Failure Handling**
   - Detect when user is not authenticated
   - Provide clear instructions for manual authentication
   - Wait for user to complete authentication process
   - Re-verify authentication after user intervention

### Session Management
1. **Session Persistence**
   - Leverage existing browser session for authentication
   - Avoid logging out or clearing session data
   - Handle session expiration gracefully
   - Maintain authentication state across operations

2. **Error Recovery**
   - Implement retry logic for authentication failures
   - Provide clear error messages for authentication issues
   - Handle network connectivity problems
   - Support re-authentication without restarting automation

## Document Access and Processing

### Document URL Validation
1. **URL Format Verification**
   - Validate Google Docs URL format
   - Extract document ID from URL
   - Handle various URL formats (edit, view, share links)
   - Verify document accessibility before processing

2. **Permission Checking**
   - Attempt to navigate to document
   - Check for access denied or permission errors
   - Provide appropriate error messages for permission issues
   - Handle private documents requiring specific access

### Content Extraction Process
1. **Document Navigation**
   - Navigate to document URL using authenticated session
   - Wait for document to fully load
   - Handle any loading screens or progress indicators
   - Verify document content is accessible

2. **Content Extraction**
   - Extract document title from page title or header
   - Identify main content area elements
   - Extract document outline/heading structure
   - Capture full document text content
   - Calculate word count and other metadata

3. **Data Processing**
   - Structure extracted content into JSON format
   - Format content for text output
   - Include metadata (title, word count, timestamp, document ID)
   - Handle special characters and formatting

## Output Generation

### File Creation
1. **JSON Output**
   - Create structured JSON with document data
   - Include title, content, outline, metadata
   - Use timestamp in filename to avoid overwrites
   - Save to configured output directory

2. **Text Output**
   - Create formatted text version
   - Include document information header
   - Format outline/heading structure
   - Include full content with proper formatting

3. **Error Handling**
   - Capture screenshots on errors for debugging
   - Log errors with appropriate context
   - Provide clear error messages to user
   - Clean up temporary files on failures

## Error Handling and Recovery

### Common Error Scenarios
1. **Authentication Failures**
   - Detect when authentication is required
   - Provide clear instructions for manual login
   - Support 2FA/MFA authentication flows
   - Handle session expiration during operations

2. **Document Access Issues**
   - Handle permission denied errors
   - Manage document not found scenarios
   - Deal with private or restricted documents
   - Provide appropriate error messages

3. **Content Extraction Problems**
   - Handle empty or corrupted documents
   - Manage timeout issues with large documents
   - Deal with JavaScript rendering delays
   - Handle network connectivity problems

### Recovery Strategies
1. **Retry Logic**
   - Implement exponential backoff for retries
   - Limit retry attempts to prevent infinite loops
   - Retry on transient errors but not permanent failures
   - Log retry attempts for debugging

2. **Graceful Degradation**
   - Provide partial results when possible
   - Continue operation despite minor failures
   - Prioritize core functionality over optional features
   - Maintain user experience during failures

## Performance Optimization

### Load Management
1. **Timeout Configuration**
   - Set appropriate timeouts based on document size
   - Use longer timeouts for large documents
   - Implement progressive timeout increases
   - Balance performance with reliability

2. **Resource Management**
   - Clean up browser resources after operations
   - Manage memory usage during content extraction
   - Optimize DOM queries and selections
   - Handle large document content efficiently

### Batch Processing
1. **Multiple Document Handling**
   - Process documents sequentially to avoid conflicts
   - Maintain authentication state across documents
   - Handle errors in batch operations gracefully
   - Provide progress feedback for batch operations

2. **Concurrent Operation Management**
   - Avoid concurrent operations on same browser session
   - Implement queuing for multiple requests
   - Handle resource contention appropriately
   - Provide appropriate error messages for conflicts

## Integration with Other Skills

### Shared Component Usage
1. **BrowserHelper Integration**
   - Use shared browser management components
   - Follow established patterns for browser automation
   - Share debugging and error handling approaches
   - Maintain consistency with other browser-based skills

2. **Output Format Standardization**
   - Use consistent output formats across skills
   - Provide both structured and formatted output
   - Include standard metadata in all outputs
   - Enable easy integration with downstream processing

### Reusable Pattern Development
1. **Document Service Patterns**
   - Extract reusable authentication patterns
   - Develop common content extraction utilities
   - Create shared error handling mechanisms
   - Build reusable file management components

2. **Cross-Skill Integration**
   - Enable output to be consumed by other skills
   - Support workflow automation scenarios
   - Provide consistent interfaces for skill composition
   - Document integration patterns for other skills

## Testing and Validation

### Connection Testing
1. **Test Script Execution**
   - Use `npm run google-docs-test` before operations
   - Verify browser connection and authentication
   - Test basic document access capabilities
   - Validate configuration settings

2. **Error Scenario Testing**
   - Test authentication failure scenarios
   - Verify error handling for access denied documents
   - Test network connectivity issues
   - Validate timeout and retry logic

### Content Validation
1. **Output Quality Checks**
   - Verify extracted content matches source
   - Check formatting preservation
   - Validate metadata accuracy
   - Ensure output file integrity

2. **Performance Validation**
   - Monitor extraction time for different document sizes
   - Verify memory usage during operations
   - Test concurrent operation handling
   - Validate resource cleanup

## Maintenance and Updates

### Regular Maintenance
1. **Selector Updates**
   - Monitor Google Docs UI changes
   - Update DOM selectors as needed
   - Test extraction after Google updates
   - Maintain backward compatibility where possible

2. **Dependency Management**
   - Keep browser automation dependencies updated
   - Monitor for breaking changes in dependencies
   - Test functionality after updates
   - Maintain compatibility with Edge browser updates

### Documentation Updates
1. **Process Documentation**
   - Update automation rules based on learned patterns
   - Document new error scenarios and solutions
   - Update troubleshooting guides
   - Maintain accuracy of setup instructions

2. **Integration Documentation**
   - Update integration patterns with other skills
   - Document new reusable components
   - Update best practices based on experience
   - Maintain examples and usage patterns 