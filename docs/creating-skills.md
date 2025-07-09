# Creating Skills Guide

This guide walks you through creating new automation skills for the AI Assistant framework.

## Skill Creation Overview

A skill is a self-contained automation module that:
- Connects to and automates a specific tool or service
- Follows consistent patterns and structure
- Accumulates learnings and best practices over time
- Integrates seamlessly with other skills

## Skill Types

### 1. **Browser-Based Skills**
For web applications requiring UI automation:
- **Examples**: Slack, Google Docs, web-based tools
- **Technology**: Browser automation via Microsoft Edge remote debugging
- **Authentication**: Existing browser sessions
- **Complexity**: High (UI state management, timing, selectors)

### 2. **API-Based Skills**
For services with RESTful APIs:
- **Examples**: JIRA, GitHub, REST APIs
- **Technology**: HTTP requests with authentication tokens
- **Authentication**: API keys/tokens in environment variables
- **Complexity**: Medium (error handling, rate limits, data validation)

### 3. **Documentation Skills**
For guidance and methodology without executable automation:
- **Examples**: Code review workflows, development processes
- **Technology**: Structured documentation and prompts
- **Authentication**: None required
- **Complexity**: Low (documentation and organization)

## Quick Start: Creating a New Skill

### Step 1: Create Skill Directory Structure

```bash
# Navigate to skills directory
cd skills

# Create new skill directory
mkdir my-new-skill
cd my-new-skill

# Create required directories and files
mkdir .cursor
touch config.js
touch test-connection.js
touch my-new-skill.js
touch README.md

# Create .cursor files
touch .cursor/learnings.md
touch .cursor/automation-rules.md
touch .cursor/best-practices.md
touch .cursor/prompts.md
```

### Step 2: Implement Core Files

#### Configuration (`config.js`)
```javascript
// config.js
require('dotenv').config();

module.exports = {
  // Service configuration
  baseUrl: process.env.MY_SERVICE_BASE_URL || 'https://api.myservice.com',
  apiToken: process.env.MY_SERVICE_API_TOKEN,
  
  // Operational settings
  timeout: 30000,
  retryAttempts: 3,
  
  // Feature flags
  enableDebugMode: process.env.DEBUG === 'true',
  
  // Validation
  validateConfig() {
    if (!this.apiToken) {
      throw new Error('MY_SERVICE_API_TOKEN environment variable is required');
    }
    return true;
  }
};
```

#### Test Connection (`test-connection.js`)
```javascript
// test-connection.js
const config = require('./config');

async function testConnection() {
  console.log('🧪 Testing My Service connection...');
  
  try {
    // Validate configuration
    config.validateConfig();
    console.log('✅ Configuration validated');
    
    // Test connectivity (example for API-based skill)
    const response = await fetch(`${config.baseUrl}/health`, {
      headers: {
        'Authorization': `Bearer ${config.apiToken}`,
        'Content-Type': 'application/json'
      },
      timeout: config.timeout
    });
    
    if (response.ok) {
      console.log('✅ Connection successful');
      const data = await response.json();
      console.log('📊 Service status:', data.status);
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\nTroubleshooting steps:');
    console.log('1. Check your .env file contains MY_SERVICE_API_TOKEN');
    console.log('2. Verify the API token is valid');
    console.log('3. Ensure network connectivity to the service');
    
    process.exit(1);
  }
}

// Run the test
testConnection()
  .then(() => {
    console.log('✅ Test completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  });
```

#### Main Script (example: API-based)
```javascript
// my-new-skill.js
const config = require('./config');

class MyServiceAutomation {
  constructor() {
    this.config = config;
  }
  
  async initialize() {
    // Validate configuration
    this.config.validateConfig();
    console.log('🚀 Initializing My Service automation...');
  }
  
  async performAction(actionData) {
    try {
      console.log('🔄 Performing action:', actionData.type);
      
      const response = await fetch(`${this.config.baseUrl}/action`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(actionData),
        timeout: this.config.timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Action completed successfully');
      
      return result;
      
    } catch (error) {
      console.error('❌ Action failed:', error.message);
      throw error;
    }
  }
  
  async cleanup() {
    console.log('🧹 Cleaning up resources...');
    // Perform any necessary cleanup
  }
}

// Export for use by other scripts
module.exports = MyServiceAutomation;

// Allow direct execution
if (require.main === module) {
  const automation = new MyServiceAutomation();
  
  automation.initialize()
    .then(() => automation.performAction({ type: 'test', data: 'example' }))
    .then(result => {
      console.log('📊 Result:', result);
      return automation.cleanup();
    })
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Script failed:', error.message);
      process.exit(1);
    });
}
```

#### Main Script (example: Browser-based)
```javascript
// my-new-skill.js
const BrowserHelper = require('../../lib/browser-helper');
const config = require('./config');

class MyWebAppAutomation {
  constructor() {
    this.config = config;
    this.browserHelper = new BrowserHelper();
    this.page = null;
  }
  
  async initialize() {
    console.log('🚀 Initializing My Web App automation...');
    
    // Initialize browser connection
    await this.browserHelper.initialize();
    this.page = await this.browserHelper.createNewPage();
    
    // Set viewport for consistent behavior
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }
  
  async navigateToApp() {
    console.log('🔗 Navigating to web app...');
    
    try {
      await this.page.goto(this.config.baseUrl, { 
        waitUntil: 'domcontentloaded', 
        timeout: this.config.timeout 
      });
      
      // Wait for app to load
      await this.page.waitForSelector('[data-testid="app-ready"]', { 
        timeout: 10000 
      });
      
      console.log('✅ Successfully navigated to app');
      
    } catch (error) {
      console.error('❌ Navigation failed:', error.message);
      throw error;
    }
  }
  
  async performWebAction(actionData) {
    try {
      console.log('🔄 Performing web action:', actionData.type);
      
      // Example: Fill a form
      if (actionData.type === 'fillForm') {
        await this.page.fill('#input-field', actionData.value);
        await this.page.click('[data-testid="submit-button"]');
        
        // Wait for action to complete
        await this.page.waitForSelector('[data-testid="success-message"]', {
          timeout: 5000
        });
      }
      
      console.log('✅ Web action completed successfully');
      
    } catch (error) {
      console.error('❌ Web action failed:', error.message);
      
      // Take screenshot for debugging
      if (this.page) {
        await this.page.screenshot({ path: 'tmp/error-screenshot.png' });
        console.log('📸 Error screenshot saved to tmp/error-screenshot.png');
      }
      
      throw error;
    }
  }
  
  async cleanup() {
    console.log('🧹 Cleaning up browser resources...');
    
    if (this.page) {
      await this.page.close();
    }
  }
}

// Export and execution logic (similar to API example)
module.exports = MyWebAppAutomation;

if (require.main === module) {
  const automation = new MyWebAppAutomation();
  
  automation.initialize()
    .then(() => automation.navigateToApp())
    .then(() => automation.performWebAction({ type: 'fillForm', value: 'test' }))
    .then(() => automation.cleanup())
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch(error => {
      automation.cleanup().finally(() => {
        console.error('❌ Script failed:', error.message);
        process.exit(1);
      });
    });
}
```

### Step 3: Create .cursor Documentation

#### Learnings (`learnings.md`)
```markdown
# My Service Skill - Learnings

## Key Discoveries

### API Behavior
- Rate limit: 100 requests per minute
- Authentication tokens expire after 24 hours
- Pagination uses offset/limit pattern

### Common Issues
- Network timeouts during peak hours (2-4 PM EST)
- Special characters in data require URL encoding
- API returns 202 for async operations

## Gotchas

### Authentication
- Tokens must be regenerated daily
- Invalid tokens return 401, not 403
- Test endpoint doesn't validate token scope

### Data Handling
- Timestamps are in UTC ISO format
- Boolean fields accept "true"/"false" strings
- Empty arrays vs null have different meanings

## Best Practices

### Error Handling
- Always check response.ok before parsing JSON
- Implement exponential backoff for 429 responses
- Log full error context for debugging

### Performance
- Batch operations when possible
- Cache frequently accessed data
- Use pagination for large datasets

## Integration Insights

### Cross-Skill Compatibility
- JSON output format works with other skills
- Browser screenshots useful for debugging
- Configuration patterns reusable across API skills
```

#### Automation Rules (`automation-rules.md`)
```markdown
# My Service Skill - Automation Rules

## Setup and Configuration

### Prerequisites
1. Valid My Service account
2. API token generated and added to .env
3. Network access to service endpoints

### Environment Setup
```bash
# Required environment variables
MY_SERVICE_API_TOKEN=your_token_here
MY_SERVICE_BASE_URL=https://api.myservice.com
DEBUG=false
```

### Validation Steps
1. Run `node test-connection.js`
2. Verify successful API connection
3. Test basic operations

## Operation Workflows

### Standard Operation Flow
1. **Initialize**: Validate config and setup connections
2. **Authenticate**: Verify API token validity
3. **Execute**: Perform requested operations
4. **Validate**: Confirm operation success
5. **Cleanup**: Release resources and log results

### Error Handling Workflow
1. **Detect**: Catch and classify error type
2. **Log**: Record error details and context
3. **Retry**: Attempt recovery if appropriate
4. **Escalate**: Report persistent failures
5. **Cleanup**: Ensure resources are released

### Decision Trees

#### API Error Handling
```
API Error Received
├── 401 Unauthorized
│   ├── Check token validity
│   ├── Regenerate if expired
│   └── Retry operation
├── 429 Rate Limited
│   ├── Extract retry-after header
│   ├── Wait specified duration
│   └── Retry operation
├── 5xx Server Error
│   ├── Wait with exponential backoff
│   ├── Retry up to 3 times
│   └── Report if all retries fail
└── Other Errors
    ├── Log full error context
    ├── Report to user
    └── Exit gracefully
```

## Quality Assurance

### Testing Requirements
- Connection test passes
- Basic operations succeed
- Error handling works correctly
- Resource cleanup completes

### Validation Checklist
- [ ] Configuration validation implemented
- [ ] Error logging includes context
- [ ] Timeouts configured appropriately
- [ ] Resources cleaned up on exit
- [ ] Documentation updated
```

#### Best Practices (`best-practices.md`)
```markdown
# My Service Skill - Best Practices

## Implementation Excellence

### Code Quality
- Use consistent error handling patterns
- Implement proper logging with context
- Follow asynchronous programming best practices
- Add input validation for all operations

### Configuration Management
- Store sensitive data in environment variables
- Provide sensible defaults for optional settings
- Implement configuration validation
- Document all configuration options

### Error Handling Excellence
- Implement specific error types for different scenarios
- Provide actionable error messages
- Include debugging context in error logs
- Implement graceful degradation where possible

## Security and Privacy

### API Security
- Never log sensitive authentication tokens
- Use HTTPS for all API communications
- Implement proper token storage and rotation
- Validate all input data

### Data Handling
- Minimize data retention duration
- Implement proper data sanitization
- Respect service terms of use
- Handle PII appropriately

## Performance Optimization

### Efficiency Patterns
- Implement connection pooling for high-volume operations
- Use caching for frequently accessed data
- Batch operations when service supports it
- Implement proper pagination handling

### Resource Management
- Clean up connections and resources promptly
- Monitor memory usage in long-running operations
- Implement timeouts for all network operations
- Use appropriate retry strategies

## Maintenance and Operations

### Monitoring
- Log operation success/failure rates
- Track performance metrics
- Monitor API rate limit usage
- Alert on repeated failures

### Documentation
- Keep learnings updated with new discoveries
- Document known issues and workarounds
- Maintain examples of successful operations
- Update troubleshooting guides

## Technology-Specific Guidelines

### Browser Automation (if applicable)
- Always set consistent viewport sizes
- Implement robust selector strategies
- Take screenshots for debugging complex issues
- Handle dynamic content with appropriate waits

### API Integration
- Respect rate limits and implement backoff
- Handle pagination consistently
- Implement proper request/response logging
- Use appropriate HTTP methods and status codes
```

#### Prompts (`prompts.md`)
```markdown
# My Service Skill - AI Agent Prompts

## Setup and Configuration Prompts

### Initial Setup
"I'll help you set up My Service automation. First, let me validate your configuration and test the connection."

### Configuration Issues
"It looks like your My Service configuration is incomplete. You'll need to set up the following environment variables: [list missing variables]. Would you like me to guide you through obtaining the required credentials?"

## Operation Prompts

### Standard Operations
"I'll perform the requested My Service operation. Let me initialize the connection and execute the action."

### Progress Updates
"My Service operation in progress: [current step]. Estimated completion: [time]."

### Success Confirmation
"✅ My Service operation completed successfully. [Summary of results]. The data has been processed and is ready for use."

## Error Handling Prompts

### Connection Failures
"❌ Unable to connect to My Service. This could be due to: 1) Invalid API token, 2) Network connectivity issues, 3) Service unavailability. Let me help you troubleshoot this issue."

### Authentication Problems
"🔑 My Service authentication failed. Your API token may have expired or lacks the required permissions. Would you like me to guide you through generating a new token?"

### Rate Limiting
"⏱️ My Service rate limit reached. I'll wait [duration] before retrying. This is normal during high-volume operations."

## Troubleshooting Prompts

### Common Issues
"I've encountered a known issue with My Service: [specific issue]. Here's how we can resolve it: [solution steps]."

### Investigation
"Let me investigate this My Service issue. I'll check [diagnostic steps] and provide a detailed analysis."

### Escalation
"This My Service issue requires manual intervention. Based on my analysis: [findings]. I recommend: [recommendations]."

## Integration Workflow Prompts

### Cross-Skill Operations
"I'll coordinate this operation across multiple skills. My Service will handle [specific responsibilities], while [other skill] manages [other responsibilities]."

### Data Processing
"My Service has provided the data. Now I'll process it for use with [target system/skill]. The data includes [summary of content]."

### Workflow Completion
"Multi-skill workflow completed. My Service contributed [specific results]. All data has been validated and is ready for your review."

## Advanced Operation Prompts

### Batch Processing
"I'll process this large dataset using My Service batch operations. This will involve [number] of API calls with appropriate rate limiting."

### Complex Workflows
"This complex My Service workflow involves multiple steps: [list steps]. I'll execute them in sequence with validation at each stage."

### Custom Operations
"I'll create a custom My Service operation based on your requirements: [requirements summary]. This will involve [approach description]."
```

### Step 4: Create README Documentation

```markdown
# My Service Skill

Automation skill for integrating with My Service API/platform.

## Overview

This skill provides automated interaction capabilities with My Service, enabling:
- [List main capabilities]
- [Integration features]
- [Automation benefits]

## Prerequisites

- My Service account with appropriate permissions
- API token (see setup instructions below)
- Network access to My Service endpoints

## Setup

1. **Generate API Token:**
   - Log into My Service
   - Navigate to Settings > API Tokens
   - Create new token with required permissions
   - Copy token for use in configuration

2. **Configure Environment:**
   ```bash
   # Add to your .env file
   MY_SERVICE_API_TOKEN=your_token_here
   MY_SERVICE_BASE_URL=https://api.myservice.com
   ```

3. **Test Connection:**
   ```bash
   cd skills/my-new-skill
   node test-connection.js
   ```

## Usage

### Basic Operations

[Provide examples of common operations]

### Advanced Features

[Document advanced capabilities]

## Troubleshooting

### Common Issues

[List common problems and solutions]

### Getting Help

1. Check `.cursor/learnings.md` for known issues
2. Review `.cursor/automation-rules.md` for procedures
3. Consult `.cursor/best-practices.md` for guidance

## Development

### Testing Changes
```bash
# Run connection test
node test-connection.js

# Test specific operations
node my-new-skill.js
```

### Contributing Learnings
When you discover new patterns or issues:
1. Document in appropriate `.cursor/` file
2. Update automation rules if needed
3. Add to troubleshooting guide
```

## Advanced Skill Patterns

### Environment Management
```javascript
// Advanced configuration with validation
const config = {
  // Environment-specific URLs
  environment: process.env.NODE_ENV || 'production',
  
  getBaseUrl() {
    const urls = {
      development: 'https://dev-api.myservice.com',
      staging: 'https://staging-api.myservice.com',
      production: 'https://api.myservice.com'
    };
    return urls[this.environment] || urls.production;
  },
  
  // Feature flags
  features: {
    enableCache: process.env.ENABLE_CACHE !== 'false',
    enableRetry: process.env.ENABLE_RETRY !== 'false',
    maxRetries: parseInt(process.env.MAX_RETRIES) || 3
  }
};
```

### Error Handling Patterns
```javascript
class SkillError extends Error {
  constructor(message, type, context = {}) {
    super(message);
    this.name = 'SkillError';
    this.type = type; // 'auth', 'network', 'validation', etc.
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
}

// Usage
throw new SkillError(
  'Failed to authenticate with My Service',
  'auth',
  { statusCode: 401, endpoint: '/api/auth' }
);
```

### Integration Patterns
```javascript
// Cross-skill data sharing
function exportData(data, metadata = {}) {
  const output = {
    skill: 'my-service',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    data: data,
    metadata: {
      source: 'My Service API',
      recordCount: Array.isArray(data) ? data.length : 1,
      ...metadata
    }
  };
  
  // Save for other skills to consume
  require('fs').writeFileSync(
    `tmp/my-service-export-${Date.now()}.json`,
    JSON.stringify(output, null, 2)
  );
  
  return output;
}
```

## Skill Templates

### API-Based Skill Template
Use this structure for REST API integrations:
- Configuration with environment validation
- HTTP client with retry logic
- Structured error handling
- JSON-based data exchange
- Comprehensive logging

### Browser-Based Skill Template  
Use this structure for web automation:
- Browser helper integration
- Robust selector strategies
- Screenshot debugging
- Session management
- UI state handling

### Documentation Skill Template
Use this structure for guidance-based skills:
- Structured methodology documentation
- Context-aware prompts
- Best practice guidelines
- Integration patterns
- Learning accumulation

## Testing and Validation

### Unit Testing
```javascript
// test/my-service.test.js
const MyServiceAutomation = require('../my-new-skill');

describe('My Service Automation', () => {
  test('should validate configuration', () => {
    // Test configuration validation logic
  });
  
  test('should handle API errors gracefully', () => {
    // Test error handling scenarios
  });
});
```

### Integration Testing
```bash
# Test with actual service
npm test -- --integration

# Test error scenarios
npm test -- --error-scenarios
```

## Deployment and Maintenance

### Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Configuration documented
- [ ] Error handling tested
- [ ] Resource cleanup verified
- [ ] Documentation updated

### Monitoring and Alerts
- Set up monitoring for skill health
- Configure alerts for repeated failures
- Track performance metrics
- Monitor API usage and rate limits

---

This guide provides a comprehensive foundation for creating robust, maintainable skills that integrate seamlessly with the AI Assistant automation framework. 