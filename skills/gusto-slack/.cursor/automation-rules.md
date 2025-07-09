# Gusto Slack Skill - Automation Rules

## Browser and Session Management

### Edge Browser Setup
1. **Remote Debugging Configuration**
   - Use Microsoft Edge with remote debugging on port 9222
   - Connect to existing Edge session if available
   - Launch new Edge instance with debugging if needed
   - Configure appropriate viewport size (1920x1080 recommended)

2. **Session Management**
   - Leverage existing authenticated Edge session
   - Create new tabs for operations to preserve authentication
   - Handle manual authentication workflow (Okta/MFA)
   - Maintain session persistence across operations
   - Clean up tabs after operations complete

3. **Browser Automation Setup**
   - Use BrowserHelper class from `lib/` for browser management
   - Connect via Chrome DevTools Protocol (CDP)
   - Set appropriate timeouts for Slack operations
   - Handle browser connection failures gracefully

## Authentication and Access

### Manual Authentication Workflow
1. **Initial Authentication Check**
   - Navigate to Slack workspace URL from config
   - Check for authentication indicators in UI
   - Detect if user is signed in to workspace
   - Handle authentication redirects appropriately

2. **Manual Authentication Support**
   - Guide user through manual authentication if needed
   - Support Okta/SSO authentication flows
   - Handle multi-factor authentication (MFA) requirements
   - Wait for user to complete authentication process
   - Verify successful authentication before proceeding

3. **Session Validation**
   - Verify access to workspace after authentication
   - Check user permissions for target channels
   - Validate ability to read/write messages as needed
   - Handle authentication timeouts and re-authentication

## Message Formatting and Input

### Core Input Mechanics
1. **Message Input Selection**
   - Use `.ql-editor` selector for message input field
   - Click to focus input before typing
   - Avoid clipboard paste operations (often fail in Slack)
   - Use direct typing with `messageInput.type()` method

2. **Typing and Timing**
   - Use character-by-character typing with natural delays
   - Implement 10-30ms random delays between characters
   - Allow 100ms delay after Shift+Enter for line breaks
   - Wait 2000ms before sending to ensure markdown parsing

3. **Content Verification**
   - Check content length after typing (`messageInput.textContent()`)
   - Verify content is >100 characters for substantial messages
   - Take screenshots before and after sending for debugging
   - Log formatted vs plain content for troubleshooting

### Markdown and Text Formatting

1. **Bold Text Formatting**
   - Use single asterisks (*text*) for bold formatting
   - Avoid emoji + asterisk combinations (may not parse correctly)
   - Use emoji shortcuts (:rocket:, :building_construction:) instead of direct emojis
   - Consider alternatives (ALL CAPS, brackets, arrows) if bold fails

2. **Line Breaks and Message Structure**
   - **CRITICAL**: Use Shift+Enter for line breaks within messages
   - Never use plain Enter except to send the final message
   - Implementation: `await page.keyboard.down('Shift'); await page.keyboard.press('Enter'); await page.keyboard.up('Shift');`
   - Allow time for markdown parsing before sending (2+ seconds)

3. **Link Formatting**
   - Use `<URL|display text>` format for clickable links
   - Handle URL encoding of pipe character (|) during automation
   - Fallback: Plain URLs are still clickable without formatting

### List Management and Bullet Mode

1. **Bullet List Automation**
   - **Starting Bullet Mode**: Type `* text` for first bullet only
   - **Continuing Bullets**: Type content without asterisk (Slack auto-creates bullets)
   - **Staying in Mode**: Use Shift+Enter after each bullet item
   - **Critical**: Only first bullet needs manual `*` - subsequent items are auto-formatted

2. **Numbered List Automation**
   - **Starting Numbered Mode**: Type `1. text` for first item only
   - **Continuing Numbers**: Type content only (Slack auto-increments numbers)
   - **Staying in Mode**: Use Shift+Enter after each numbered item
   - **Auto-formatting**: Slack handles numbering when properly initiated

3. **Bullet Mode State Management**
   - **Track State**: Use boolean flag (`inBulletMode`) to track current state
   - **Exit Sequence**: Critical 3-step process to exit bullet mode:
     1. Shift+Enter (creates new line while in bullet mode)
     2. Backspace (exits bullet mode completely)
     3. Shift+Enter (adds blank line for readability)
   - **After Exit**: Type non-bullet content (headers, plain text)

4. **Common Bullet Mode Issues**
   - **Extra Asterisks**: Don't use `*` for every bullet (creates "* • text")
   - **Headers as Bullets**: Must properly exit bullet mode before typing headers
   - **State Confusion**: Always track whether in bullet mode to avoid formatting errors

## Content Extraction and Data Processing

### Thread Information Extraction
1. **URL Processing**
   - Parse Slack thread URLs to extract channel and message identifiers
   - Handle different URL formats (archives, client URLs, permalink formats)
   - Validate URL format before proceeding with extraction
   - Extract channel ID and thread timestamp from URL

2. **Message Data Extraction**
   - Extract message content, author, and timestamp for each message
   - Handle different message types (text, attachments, threads)
   - Process emoji and formatting within message content
   - Capture thread structure and reply relationships

3. **Data Structuring**
   - Format extracted data as structured JSON
   - Include metadata (extraction timestamp, channel info, message count)
   - Preserve message order and threading relationships
   - Handle missing or incomplete message data gracefully

### JSON Export and Output
1. **Output Format**
   - Create structured JSON with consistent schema
   - Include thread URL, channel name, message count, extraction timestamp
   - Format each message with index, author, time, content
   - Use ISO format for timestamps with proper timezone handling

2. **File Management**
   - Use timestamp-based file naming to prevent overwrites
   - Save JSON files to appropriate output directory
   - Handle file writing errors gracefully
   - Provide console output summary alongside file export

## Message Posting and Composition

### Advanced Message Composition
1. **Multi-Section Messages**
   - Compose complex messages with headers, bullets, and content sections
   - Properly transition between different formatting types
   - Handle section breaks and spacing appropriately
   - Maintain consistent formatting throughout message

2. **Content Verification**
   - Verify message content before sending
   - Check for proper formatting application
   - Validate content length and structure
   - Take screenshots for verification and debugging

3. **Timing and Pacing**
   - Allow adequate time for Slack UI to respond to input
   - Implement appropriate delays between formatting operations
   - Wait for markdown parsing to complete before sending
   - Handle UI lag and responsiveness issues

### Complex Formatting Workflows
1. **Mixed Content Types**
   - Handle transitions between bullets, headers, and plain text
   - Properly exit and enter different formatting modes
   - Maintain state awareness throughout composition
   - Test formatting transitions in isolation

2. **Error Recovery**
   - Detect formatting failures and implement recovery strategies
   - Clear input and restart if formatting gets corrupted
   - Provide fallback formatting options
   - Log formatting issues for debugging

## Error Handling and Recovery

### Browser and Connection Errors
1. **Connection Failures**
   - Handle Edge browser connection failures
   - Implement retry logic for browser operations
   - Detect and recover from CDP connection drops
   - Provide clear error messages for connection issues

2. **Authentication Errors**
   - Detect when authentication is required
   - Guide user through re-authentication process
   - Handle session timeout and renewal
   - Provide clear instructions for manual authentication

3. **Navigation and UI Errors**
   - Handle Slack UI changes and variations
   - Implement fallback selectors for UI elements
   - Detect page load failures and retry navigation
   - Handle redirect scenarios appropriately

### Content and Formatting Errors
1. **Input Failures**
   - Detect when message input is not accessible
   - Handle cases where typing fails or is incomplete
   - Implement retry logic for input operations
   - Provide alternative input methods if needed

2. **Formatting Issues**
   - Detect when markdown parsing fails
   - Implement fallback formatting strategies
   - Handle cases where list formatting doesn't activate
   - Provide plain text alternatives for complex formatting

3. **Validation and Verification**
   - Verify content was typed correctly
   - Check for incomplete or corrupted messages
   - Validate formatting was applied as expected
   - Implement content correction strategies

## Configuration and Setup

### Environment Configuration
1. **Required Settings**
   ```
   SLACK_WORKSPACE_URL=https://gusto.enterprise.slack.com
   ```

2. **Browser Configuration**
   - Edge browser path configuration
   - Remote debugging port settings
   - Viewport and display configuration
   - Timeout and delay settings

3. **Slack-Specific Configuration**
   - Workspace URL and routing
   - Common selectors and UI elements
   - Channel and DM URL patterns
   - Default timing and delay values

### Selector Management
1. **UI Element Selectors**
   - Message input: `.ql-editor`
   - Send button and other UI elements
   - Thread and message containers
   - Authentication and navigation elements

2. **Selector Flexibility**
   - Implement fallback selectors for UI variations
   - Handle different Slack UI versions
   - Adapt to workspace-specific customizations
   - Test selectors regularly for changes

## Testing and Validation

### Connection Testing
1. **Test Script Execution**
   - Use `npm run gusto-slack-test` for connection validation
   - Verify browser connection and authentication
   - Test basic Slack workspace access
   - Validate configuration settings

2. **Authentication Testing**
   - Test manual authentication workflow
   - Verify session persistence
   - Test re-authentication scenarios
   - Validate workspace access permissions

### Formatting Testing
1. **Individual Formatting Tests**
   - Test bullet mode entry, continuation, and exit
   - Test numbered list functionality
   - Test markdown formatting (bold, links)
   - Test line break and message structure

2. **Complex Message Testing**
   - Test multi-section message composition
   - Test formatting transitions (bullets to headers to bullets)
   - Test mixed content types within single message
   - Validate complete message formatting workflow

### Content Extraction Testing
1. **Thread Processing**
   - Test with different thread types and sizes
   - Validate message extraction accuracy
   - Test with various content types (text, emojis, links)
   - Verify JSON output structure and content

2. **Error Scenario Testing**
   - Test with inaccessible threads or channels
   - Test with authentication failures
   - Test with network connectivity issues
   - Validate error handling and recovery

## Performance and Optimization

### Browser Performance
1. **Resource Management**
   - Clean up browser tabs after operations
   - Manage memory usage during long operations
   - Handle multiple concurrent operations appropriately
   - Optimize browser configuration for performance

2. **Operation Timing**
   - Optimize delays for best balance of speed and reliability
   - Use adaptive timing based on content complexity
   - Implement efficient waiting strategies
   - Monitor and adjust timing based on performance

### Content Processing
1. **Efficient Extraction**
   - Optimize message extraction for large threads
   - Use efficient DOM queries and selectors
   - Process content in batches for large datasets
   - Implement streaming for very large threads

2. **Formatting Optimization**
   - Optimize typing speed for complex messages
   - Batch formatting operations where possible
   - Use efficient state management for formatting modes
   - Minimize redundant operations and delays

## Maintenance and Updates

### Regular Maintenance
1. **Selector Updates**
   - Monitor Slack UI changes and update selectors
   - Test functionality after Slack updates
   - Maintain fallback selectors for robustness
   - Update automation rules based on UI changes

2. **Configuration Updates**
   - Keep workspace URLs and configuration current
   - Update timing and delay settings based on performance
   - Maintain compatibility with browser updates
   - Update dependencies and libraries regularly

### Documentation and Learning
1. **Pattern Documentation**
   - Document new formatting patterns and solutions
   - Update best practices based on experience
   - Maintain troubleshooting guides
   - Share learnings across team and projects

2. **Integration Updates**
   - Update integration patterns with other skills
   - Maintain consistency with shared components
   - Update reusable patterns for broader use
   - Contribute improvements to shared libraries 