const GustoSlackRetriever = require('./slack-retriever');

async function testConnection() {
  const retriever = new GustoSlackRetriever();
  
  try {
    console.log('🧪 Testing Gusto Slack connection...');
    
    // Initialize Edge browser connection
    console.log('🚀 Initializing browser connection...');
    await retriever.init();
    console.log('✅ Browser connection established');
    
    // Check authentication status
    console.log('🔍 Checking authentication status...');
    const isAuthenticated = await retriever.checkAuthentication();
    
    if (isAuthenticated) {
      console.log('✅ Authentication successful!');
      console.log('✅ Connection test completed successfully');
      console.log('\n🎉 Ready to retrieve Slack thread information!');
      console.log('\nUsage examples:');
      console.log('npm run gusto-slack "https://gusto.enterprise.slack.com/archives/C05GHL0381M/p1749775659622829"');
      console.log('node skills/gusto-slack/slack-retriever.js "THREAD_URL"');
    } else {
      console.log('⚠️  Authentication required');
      console.log('\n📋 Next steps:');
      console.log('1. Complete authentication in the Edge browser window');
      console.log('2. Run this test again to verify connection');
      console.log('3. Once authenticated, use the slack-retriever script');
      
      console.log('\n⏳ Press Enter to close browser connection...');
      await new Promise(resolve => {
        process.stdin.once('data', () => resolve());
      });
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Make sure Microsoft Edge is installed');
    console.error('2. Check your network connectivity');
    console.error('3. Verify the SLACK_WORKSPACE_URL in .env file');
    console.error('4. Try closing any existing Edge instances and run again');
  } finally {
    // Close the script tab but keep Edge running for potential manual use
    await retriever.closePage();
    console.log('\n👋 Test completed');
  }
}

testConnection()
  .then(() => {
    console.log('✅ Test completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }); 