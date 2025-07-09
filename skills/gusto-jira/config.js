// JIRA service configuration
require('dotenv').config();

module.exports = {
  // JIRA API Configuration
  baseUrl: process.env.JIRA_BASE_URL || 'https://gustohq.atlassian.net',
  apiToken: process.env.ATLASSIAN_API_TOKEN,
  email: process.env.JIRA_EMAIL || `${process.env.USER}@gusto.com`,
  projectKey: process.env.JIRA_PROJECT_KEY || 'PROJ',
  
  // API Endpoints
  endpoints: {
    search: '/rest/api/3/search',
    issue: '/rest/api/3/issue',
    user: '/rest/api/3/user',
    myself: '/rest/api/3/myself'
  },
  
  // JQL Queries
  jqlQueries: {
    // Get unresolved tickets assigned to current user, ordered by creation date ascending
    unresolvedAssignedToMe: 'assignee = currentUser() AND resolution = Unresolved ORDER BY created ASC',
    
    // Alternative queries for different scenarios
    myOpenIssues: 'assignee = currentUser() AND status != Done ORDER BY created ASC',
    myInProgress: 'assignee = currentUser() AND status = "In Progress" ORDER BY created ASC'
  },
  
  // Common status mappings
  statusMappings: {
    todo: ['To Do', 'Open', 'Backlog'],
    inProgress: ['In Progress', 'In Development', 'In Review'],
    done: ['Done', 'Closed', 'Resolved']
  },
  
  // Request configuration
  requestConfig: {
    timeout: 30000,
    maxRetries: 3,
    retryDelay: 1000
  }
}; 