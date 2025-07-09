#!/usr/bin/env node

const config = require('./config');
const fs = require('fs');
const path = require('path');

class JiraRetriever {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.apiToken = config.apiToken;
    this.email = config.email;
    this.headers = {
      'Authorization': `Basic ${Buffer.from(`${this.email}:${this.apiToken}`).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  /**
   * Validate configuration
   */
  validateConfig() {
    if (!this.apiToken) {
      throw new Error('JIRA_API_TOKEN is required in .env file');
    }
    if (!this.email) {
      throw new Error('JIRA_EMAIL is required in .env file');
    }
    if (!this.baseUrl) {
      throw new Error('JIRA_BASE_URL is required in .env file');
    }
  }

  /**
   * Make authenticated request to JIRA API
   */
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...this.headers, ...options.headers },
        timeout: config.requestConfig.timeout
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`JIRA API error (${response.status}): ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to JIRA. Check your internet connection and JIRA URL.');
      }
      throw error;
    }
  }

  /**
   * Get current user information
   */
  async getCurrentUser() {
    console.log('🔍 Fetching current user information...');
    const user = await this.makeRequest(config.endpoints.myself);
    console.log(`✅ Connected as: ${user.displayName} (${user.emailAddress})`);
    return user;
  }

  /**
   * Search for issues using JQL
   */
  async searchIssues(jql, maxResults = 100) {
    console.log(`🔍 Searching for issues with JQL: ${jql}`);
    
    const searchParams = new URLSearchParams({
      jql: jql,
      maxResults: maxResults.toString(),
      fields: 'summary,status,priority,assignee,reporter,created,updated,description,issuetype,components,labels'
    });

    const response = await this.makeRequest(
      `${config.endpoints.search}?${searchParams.toString()}`
    );

    return response;
  }

  /**
   * Get unresolved tickets assigned to current user
   */
  async getUnresolvedTicketsAssignedToMe() {
    console.log('📋 Fetching unresolved tickets assigned to you...');
    
    const searchResult = await this.searchIssues(config.jqlQueries.unresolvedAssignedToMe);
    
    if (searchResult.issues.length === 0) {
      console.log('🎉 No unresolved tickets assigned to you!');
      return [];
    }

    console.log(`📊 Found ${searchResult.issues.length} unresolved ticket(s) assigned to you`);
    
    // Format tickets for display
    const formattedTickets = searchResult.issues.map((issue, index) => {
      const createdDate = new Date(issue.fields.created);
      const updatedDate = new Date(issue.fields.updated);
      
      return {
        index: index + 1,
        key: issue.key,
        summary: issue.fields.summary,
        status: issue.fields.status.name,
        priority: issue.fields.priority?.name || 'None',
        issueType: issue.fields.issuetype.name,
        reporter: issue.fields.reporter?.displayName || 'Unknown',
        created: createdDate.toISOString(),
        createdFormatted: createdDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        updated: updatedDate.toISOString(),
        updatedFormatted: updatedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        url: `${this.baseUrl}/browse/${issue.key}`,
        components: issue.fields.components?.map(c => c.name) || [],
        labels: issue.fields.labels || []
      };
    });

    return formattedTickets;
  }

  /**
   * Display tickets in a formatted way
   */
  displayTickets(tickets) {
    if (tickets.length === 0) {
      console.log('\n🎉 No unresolved tickets assigned to you!');
      return;
    }

    console.log('\n📋 Unresolved Tickets Assigned to You (sorted by creation date):');
    console.log('=' .repeat(80));

    tickets.forEach((ticket) => {
      console.log(`\n${ticket.index}. ${ticket.key} - ${ticket.summary}`);
      console.log(`   Status: ${ticket.status} | Priority: ${ticket.priority} | Type: ${ticket.issueType}`);
      console.log(`   Reporter: ${ticket.reporter}`);
      console.log(`   Created: ${ticket.createdFormatted}`);
      console.log(`   Updated: ${ticket.updatedFormatted}`);
      console.log(`   URL: ${ticket.url}`);
      
      if (ticket.components.length > 0) {
        console.log(`   Components: ${ticket.components.join(', ')}`);
      }
      
      if (ticket.labels.length > 0) {
        console.log(`   Labels: ${ticket.labels.join(', ')}`);
      }
    });
    
    console.log('\n' + '=' .repeat(80));
    console.log(`📊 Total: ${tickets.length} unresolved ticket(s)`);
  }

  /**
   * Save tickets to JSON file
   */
  async saveTicketsToFile(tickets, filename = null) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const defaultFilename = `jira-tickets-${timestamp}.json`;
    const outputFile = filename || defaultFilename;
    
    const outputData = {
      retrievedAt: new Date().toISOString(),
      totalTickets: tickets.length,
      query: config.jqlQueries.unresolvedAssignedToMe,
      tickets: tickets
    };

    await fs.promises.writeFile(outputFile, JSON.stringify(outputData, null, 2));
    console.log(`💾 Saved ${tickets.length} ticket(s) to: ${outputFile}`);
    
    return outputFile;
  }
}

/**
 * Main function to run the JIRA retriever
 */
async function main() {
  try {
    console.log('🚀 Starting Gusto JIRA Ticket Retriever...');
    
    const retriever = new JiraRetriever();
    
    // Validate configuration
    retriever.validateConfig();
    
    // Get current user info
    await retriever.getCurrentUser();
    
    // Get unresolved tickets
    const tickets = await retriever.getUnresolvedTicketsAssignedToMe();
    
    // Display tickets
    retriever.displayTickets(tickets);
    
    // Save to file
    if (tickets.length > 0) {
      await retriever.saveTicketsToFile(tickets);
    }
    
    console.log('\n✅ JIRA ticket retrieval completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check your .env file has correct JIRA credentials');
    console.error('2. Verify your JIRA API token is valid');
    console.error('3. Ensure you have access to the JIRA instance');
    console.error('4. Check your internet connection');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().then(() => process.exit(0)).catch(error => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = JiraRetriever; 