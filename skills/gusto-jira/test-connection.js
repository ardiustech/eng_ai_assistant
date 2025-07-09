#!/usr/bin/env node

const config = require('./config');

class JiraConnectionTester {
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
   * Test basic configuration
   */
  testConfiguration() {
    console.log('🔧 Testing JIRA Configuration...');
    
    const tests = [
      { name: 'JIRA_BASE_URL', value: this.baseUrl, required: true },
      { name: 'ATLASSIAN_API_TOKEN', value: this.apiToken, required: true, masked: true },
      { name: 'JIRA_EMAIL (or USER@gusto.com)', value: this.email, required: true },
      { name: 'JIRA_PROJECT_KEY', value: config.projectKey, required: false }
    ];

    let configurationValid = true;
    
    tests.forEach(test => {
      const status = test.value ? '✅' : '❌';
      const displayValue = test.masked && test.value ? '*'.repeat(test.value.length) : test.value;
      const requiredText = test.required ? '(required)' : '(optional)';
      
      console.log(`   ${status} ${test.name}: ${displayValue || 'NOT SET'} ${requiredText}`);
      
      if (test.required && !test.value) {
        configurationValid = false;
      }
    });

    if (!configurationValid) {
      console.log('\n❌ Configuration validation failed!');
      console.log('Please check your .env file and ensure all required variables are set.');
      return false;
    }

    console.log('\n✅ Configuration validation passed!');
    return true;
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

      return {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: response.ok ? await response.json() : await response.text()
      };
    } catch (error) {
      return {
        ok: false,
        status: 0,
        statusText: error.message,
        data: null
      };
    }
  }

  /**
   * Test JIRA API connectivity
   */
  async testAPIConnectivity() {
    console.log('\n🌐 Testing JIRA API Connectivity...');
    
    const response = await this.makeRequest(config.endpoints.myself);
    
    if (response.ok) {
      console.log('✅ Successfully connected to JIRA API');
      return true;
    } else {
      console.log(`❌ Failed to connect to JIRA API (${response.status}): ${response.statusText}`);
      
      // Provide specific error guidance
      if (response.status === 401) {
        console.log('   💡 This usually means your API token or email is incorrect');
        console.log('   💡 Generate a new API token at: https://id.atlassian.com/manage-profile/security/api-tokens');
      } else if (response.status === 403) {
        console.log('   💡 This usually means you don\'t have permission to access this JIRA instance');
      } else if (response.status === 0) {
        console.log('   💡 This usually means network connectivity issues or invalid JIRA URL');
      }
      
      return false;
    }
  }

  /**
   * Test user authentication and get user info
   */
  async testUserAuthentication() {
    console.log('\n👤 Testing User Authentication...');
    
    const response = await this.makeRequest(config.endpoints.myself);
    
    if (response.ok) {
      const user = response.data;
      console.log('✅ User authentication successful');
      console.log(`   User: ${user.displayName}`);
      console.log(`   Email: ${user.emailAddress}`);
      console.log(`   Account ID: ${user.accountId}`);
      console.log(`   Time Zone: ${user.timeZone}`);
      return { success: true, user };
    } else {
      console.log('❌ User authentication failed');
      return { success: false, user: null };
    }
  }

  /**
   * Test basic search functionality
   */
  async testSearchFunctionality() {
    console.log('\n🔍 Testing Search Functionality...');
    
    // Test with a simple JQL query
    const testJQL = 'assignee = currentUser() ORDER BY created DESC';
    const searchParams = new URLSearchParams({
      jql: testJQL,
      maxResults: '5',
      fields: 'summary,status,assignee,created'
    });

    const response = await this.makeRequest(
      `${config.endpoints.search}?${searchParams.toString()}`
    );

    if (response.ok) {
      const searchResult = response.data;
      console.log('✅ Search functionality working');
      console.log(`   Found ${searchResult.total} total issues assigned to you`);
      console.log(`   Retrieved ${searchResult.issues.length} issues in this test`);
      
      if (searchResult.issues.length > 0) {
        console.log('   Sample issues:');
        searchResult.issues.slice(0, 3).forEach((issue, index) => {
          console.log(`     ${index + 1}. ${issue.key}: ${issue.fields.summary}`);
        });
      }
      
      return { success: true, totalIssues: searchResult.total };
    } else {
      console.log('❌ Search functionality failed');
      console.log(`   Error: ${response.data}`);
      return { success: false, totalIssues: 0 };
    }
  }

  /**
   * Test unresolved tickets query
   */
  async testUnresolvedTicketsQuery() {
    console.log('\n🎯 Testing Unresolved Tickets Query...');
    
    const searchParams = new URLSearchParams({
      jql: config.jqlQueries.unresolvedAssignedToMe,
      maxResults: '10',
      fields: 'summary,status,created'
    });

    const response = await this.makeRequest(
      `${config.endpoints.search}?${searchParams.toString()}`
    );

    if (response.ok) {
      const searchResult = response.data;
      console.log('✅ Unresolved tickets query working');
      console.log(`   Found ${searchResult.total} unresolved tickets assigned to you`);
      
      if (searchResult.issues.length > 0) {
        console.log('   Sample unresolved tickets:');
        searchResult.issues.slice(0, 3).forEach((issue, index) => {
          const createdDate = new Date(issue.fields.created).toLocaleDateString();
          console.log(`     ${index + 1}. ${issue.key}: ${issue.fields.summary} (${createdDate})`);
        });
      } else {
        console.log('   🎉 No unresolved tickets found - you\'re all caught up!');
      }
      
      return { success: true, unresolvedCount: searchResult.total };
    } else {
      console.log('❌ Unresolved tickets query failed');
      console.log(`   Error: ${response.data}`);
      return { success: false, unresolvedCount: 0 };
    }
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log('🧪 Starting JIRA Connection Tests...');
    console.log('=' .repeat(60));
    
    try {
      // Test 1: Configuration
      const configValid = this.testConfiguration();
      if (!configValid) {
        return false;
      }

      // Test 2: API Connectivity
      const apiConnected = await this.testAPIConnectivity();
      if (!apiConnected) {
        return false;
      }

      // Test 3: User Authentication
      const userAuth = await this.testUserAuthentication();
      if (!userAuth.success) {
        return false;
      }

      // Test 4: Search Functionality
      const searchTest = await this.testSearchFunctionality();
      if (!searchTest.success) {
        return false;
      }

      // Test 5: Unresolved Tickets Query
      const unresolvedTest = await this.testUnresolvedTicketsQuery();
      if (!unresolvedTest.success) {
        return false;
      }

      // Summary
      console.log('\n' + '=' .repeat(60));
      console.log('✅ All tests passed! JIRA integration is ready to use.');
      console.log(`👤 Connected as: ${userAuth.user.displayName}`);
      console.log(`📊 Total issues assigned to you: ${searchTest.totalIssues}`);
      console.log(`🎯 Unresolved tickets: ${unresolvedTest.unresolvedCount}`);
      console.log('\n🚀 You can now run the main JIRA retriever script!');
      
      return true;
      
    } catch (error) {
      console.log('\n❌ Test execution failed:', error.message);
      return false;
    }
  }
}

/**
 * Main function to run the tests
 */
async function main() {
  try {
    const tester = new JiraConnectionTester();
    const success = await tester.runAllTests();
    
    if (success) {
      console.log('\n✅ JIRA connection test completed successfully!');
      process.exit(0);
    } else {
      console.log('\n❌ JIRA connection test failed!');
      console.log('\nTroubleshooting steps:');
      console.log('1. Check your .env file contains the correct JIRA credentials');
      console.log('2. Generate a new API token at: https://id.atlassian.com/manage-profile/security/api-tokens');
      console.log('3. Verify the JIRA base URL is correct');
      console.log('4. Ensure you have access to the JIRA instance');
      console.log('5. Check your internet connection');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
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

module.exports = JiraConnectionTester; 