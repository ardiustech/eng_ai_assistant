#!/usr/bin/env node

const BrowserHelper = require('../../lib/browser-helper');

async function testConnection() {
  console.log('🧪 Testing Google Docs connection...\n');
  
  const browserHelper = new BrowserHelper();
  
  try {
    // Initialize browser connection
    await browserHelper.initialize();
    console.log('✅ Connected to Edge browser');
    
    // Create new page
    const page = await browserHelper.createNewPage();
    
    // Set viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to Google Docs
    console.log('📍 Navigating to Google Docs...');
    await page.goto('https://docs.google.com', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    const currentUrl = page.url();
    console.log(`🔗 Current URL: ${currentUrl}`);
    
    // Check authentication status
    if (currentUrl.includes('accounts.google.com') || currentUrl.includes('signin')) {
      console.log('\n⚠️  Not authenticated with Google');
      console.log('📝 Please log in to Google in the browser window');
      console.log('   Then run this test again to verify the connection');
    } else {
      console.log('\n✅ Successfully connected to Google Docs!');
      console.log('✅ Authentication verified');
      
      // Try to get user info if available
      const userInfo = await page.evaluate(() => {
        const accountButton = document.querySelector('[aria-label*="Google Account"]');
        if (accountButton) {
          const ariaLabel = accountButton.getAttribute('aria-label');
          const emailMatch = ariaLabel?.match(/\(([^)]+)\)/);
          return emailMatch ? emailMatch[1] : null;
        }
        return null;
      });
      
      if (userInfo) {
        console.log(`👤 Logged in as: ${userInfo}`);
      }
    }
    
    console.log('\n🎉 Connection test complete!');
    console.log('   You can now use the Google Docs retriever');
    
    // Close the test tab
    await page.close();
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testConnection().then(() => {
  console.log('\n✅ Test completed successfully');
  process.exit(0);
}).catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
}); 