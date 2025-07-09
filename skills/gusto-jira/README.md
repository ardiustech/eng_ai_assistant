# Gusto JIRA Skill

This skill provides Eng AI Assistant capabilities for automated interaction with Gusto's JIRA instance using the JIRA REST API.

## Overview

The Gusto JIRA skill allows you to programmatically access and retrieve information from JIRA without requiring browser automation. It uses JIRA's REST API with API token authentication to fetch ticket information, search for issues, and perform other JIRA operations.

## Features

- **API Token Authentication**: Secure authentication using JIRA API tokens
- **Ticket Retrieval**: Fetch unresolved tickets assigned to you
- **Search Functionality**: Custom JQL queries for flexible ticket searching
- **Formatted Output**: Clean console output with ticket details
- **JSON Export**: Save ticket data to JSON files for further processing
- **Connection Testing**: Comprehensive test suite to verify API connectivity
- **Error Handling**: Detailed error messages and troubleshooting guidance

## Prerequisites

- Access to Gusto JIRA instance
- Valid JIRA API token
- Node.js environment with required dependencies

## Setup

### 1. Environment Configuration

Create a `.env` file in the repository root with your JIRA credentials:

```env
# JIRA Configuration
JIRA_BASE_URL=https://gustohq.atlassian.net
JIRA_API_TOKEN=your-jira-api-token-here
JIRA_EMAIL=your-email@gusto.com
JIRA_PROJECT_KEY=PROJ
```

### 2. Generate JIRA API Token

1. Go to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click "Create API token"
3. Give it a descriptive name (e.g., "Eng AI Assistant JIRA Access")
4. Copy the generated token to your `.env` file

### 3. Install Dependencies

Dependencies are managed at the repository root:

```bash
npm install
```

## Usage

### Test Connection

Before using the skill, test your JIRA connection:

```bash
npm run gusto-jira-test
# or
node skills/gusto-jira/test-connection.js
```

This will:
1. Validate your configuration
2. Test API connectivity
3. Verify user authentication
4. Test search functionality
5. Test unresolved tickets query

### Retrieve Unresolved Tickets

To get all unresolved tickets assigned to you:

```bash
npm run gusto-jira
# or
node skills/gusto-jira/jira-retriever.js
```

This will:
1. Fetch all unresolved tickets assigned to you
2. Display them in creation date order (oldest first)
3. Show detailed information for each ticket
4. Save results to a JSON file

## Output Format

### Console Output

The skill provides formatted console output with ticket details:

```
📋 Unresolved Tickets Assigned to You (sorted by creation date):
================================================================================

1. PROJ-123 - Fix login bug in mobile app
   Status: In Progress | Priority: High | Type: Bug
   Reporter: Jane Smith
   Created: Jan 15, 2024, 10:30 AM
   Updated: Jan 16, 2024, 2:45 PM
   URL: https://gustohq.atlassian.net/browse/PROJ-123
   Components: Mobile App, Authentication
   Labels: urgent, mobile

2. PROJ-456 - Implement user dashboard
   Status: To Do | Priority: Medium | Type: Story
   Reporter: Bob Johnson
   Created: Jan 20, 2024, 9:15 AM
   Updated: Jan 20, 2024, 9:15 AM
   URL: https://gustohq.atlassian.net/browse/PROJ-456

================================================================================
📊 Total: 2 unresolved ticket(s)
```

### JSON Export

Ticket data is automatically saved to a JSON file:

```json
{
  "retrievedAt": "2024-01-22T15:30:00.000Z",
  "totalTickets": 2,
  "query": "assignee = currentUser() AND resolution = Unresolved ORDER BY created ASC",
  "tickets": [
    {
      "index": 1,
      "key": "PROJ-123",
      "summary": "Fix login bug in mobile app",
      "status": "In Progress",
      "priority": "High",
      "issueType": "Bug",
      "reporter": "Jane Smith",
      "created": "2024-01-15T10:30:00.000Z",
      "createdFormatted": "Jan 15, 2024, 10:30 AM",
      "updated": "2024-01-16T14:45:00.000Z",
      "updatedFormatted": "Jan 16, 2024, 2:45 PM",
      "url": "https://gustohq.atlassian.net/browse/PROJ-123",
      "components": ["Mobile App", "Authentication"],
      "labels": ["urgent", "mobile"]
    }
  ]
}
```

## Configuration

The skill is configured via `config.js` which includes:

- **API Endpoints**: JIRA REST API endpoints
- **JQL Queries**: Predefined queries for common searches
- **Status Mappings**: Common JIRA status categories
- **Request Configuration**: Timeout and retry settings

### Default JQL Query

The default query fetches unresolved tickets assigned to you:

```jql
assignee = currentUser() AND resolution = Unresolved ORDER BY created ASC
```

### Alternative Queries

You can modify the config to use different queries:

```javascript
jqlQueries: {
  unresolvedAssignedToMe: 'assignee = currentUser() AND resolution = Unresolved ORDER BY created ASC',
  myOpenIssues: 'assignee = currentUser() AND status != Done ORDER BY created ASC',
  myInProgress: 'assignee = currentUser() AND status = "In Progress" ORDER BY created ASC'
}
```

## Skill Structure

```
skills/gusto-jira/
├── README.md              # This documentation
├── config.js              # Skill configuration
├── jira-retriever.js      # Main ticket retrieval script
└── test-connection.js     # Connection testing script
```

## Integration with Package.json

The skill integrates with the repository's package.json scripts:

```json
{
  "scripts": {
    "gusto-jira": "node skills/gusto-jira/jira-retriever.js",
    "gusto-jira-test": "node skills/gusto-jira/test-connection.js"
  }
}
```

## Error Handling

The skill provides detailed error messages and troubleshooting guidance:

### Common Issues

1. **401 Unauthorized**: Invalid API token or email
2. **403 Forbidden**: Insufficient permissions
3. **Network Errors**: Connectivity issues or invalid JIRA URL
4. **Configuration Errors**: Missing required environment variables

### Troubleshooting Steps

1. Verify your `.env` file has correct JIRA credentials
2. Generate a new API token if the current one is invalid
3. Check JIRA base URL is correct
4. Ensure you have access to the JIRA instance
5. Test internet connectivity

## Security

- API tokens are stored securely in `.env` file (gitignored)
- Basic authentication is used for API requests
- No credentials are logged or exposed in output

## Limitations

- API rate limits may apply to high-volume requests
- Some JIRA features may require different permissions
- Large result sets may take longer to process
- Browser automation is not used (pure API approach)

## Future Enhancements

- Support for creating and updating tickets
- Advanced filtering and search options
- Integration with other JIRA features (comments, attachments)
- Bulk operations on multiple tickets
- Custom field extraction
- Dashboard and reporting features

## Technical Details

- **API Version**: JIRA REST API v3
- **Authentication**: Basic auth with API tokens
- **Data Format**: JSON
- **Dependencies**: Node.js built-in modules + dotenv
- **Error Handling**: Comprehensive try-catch with specific error messages
- **Async/Await**: Modern JavaScript async patterns 