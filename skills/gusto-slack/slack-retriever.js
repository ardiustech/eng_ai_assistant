const BrowserHelper = require('../../lib/browser-helper');
const path = require('path');

// Load environment variables from repo root
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

class GustoSlackRetriever {
  constructor() {
    this.browserHelper = new BrowserHelper();
    this.page = null;
    this.isConnected = false;
  }

  /**
   * Initialize connection to Edge browser
   * User should manually authenticate in the main Edge window
   */
  async init() {
    try {
      console.log('🚀 Initializing Gusto Slack Retriever...');
      
      // Connect to or launch Edge with remote debugging
      await this.browserHelper.initialize();
      
      // Create a new tab for our script
      this.page = await this.browserHelper.createNewPage();
      
      // Set user agent using CDP if available
      try {
        if (this.page.setUserAgent) {
          await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
        } else if (this.page.context && this.page.context().setUserAgent) {
          await this.page.context().setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
        }
      } catch (error) {
        console.log('⚠️  Could not set user agent:', error.message);
      }
      
      // Block app launches and add headers to force web version
      try {
        await this.page.route('**/*', (route) => {
          const request = route.request();
          const url = request.url();
          
          // Block any attempts to launch external apps
          if (url.startsWith('slack://') || url.startsWith('msteams://') || url.includes('app-store-link') || url.includes('intent://')) {
            console.log(`🚫 Blocked external app launch: ${url}`);
            route.abort();
            return;
          }
          
          // For Slack URLs, add headers to force web version
          if (url.includes('slack.com')) {
            const headers = {
              ...request.headers(),
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
              'Sec-Ch-Ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
              'Sec-Ch-Ua-Platform': '"macOS"',
              'Sec-Ch-Ua-Mobile': '?0'
            };
            
            route.continue({ headers });
            return;
          }
          
          // Continue with normal requests
          route.continue();
        });
      } catch (error) {
        console.log('⚠️  Could not set up route blocking:', error.message);
      }
      
      // Add JavaScript to prevent app detection
      try {
        await this.page.addInitScript(() => {
          // Override methods that might be used to detect or launch apps
          window.open = (url, ...args) => {
            if (url && (url.startsWith('slack://') || url.startsWith('intent://'))) {
              console.log('Blocked app launch via window.open:', url);
              return null;
            }
            return window.originalOpen?.call(window, url, ...args) || null;
          };
          
          // Override location changes to app URLs
          const originalLocation = window.location;
          Object.defineProperty(window, 'location', {
            get: () => originalLocation,
            set: (value) => {
              if (typeof value === 'string' && (value.startsWith('slack://') || value.startsWith('intent://'))) {
                console.log('Blocked app launch via location assignment:', value);
                return;
              }
              originalLocation.href = value;
            }
          });
          
          // Block navigation to app URLs
          if (window.navigator && window.navigator.userAgent) {
            Object.defineProperty(window.navigator, 'userAgent', {
              get: () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
            });
          }
        });
      } catch (error) {
        console.log('⚠️  Could not add init script:', error.message);
      }
      
      this.isConnected = true;
      console.log('✅ Connected to Edge browser');
      
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize browser connection:', error.message);
      throw error;
    }
  }

  /**
   * Navigate to Slack and check if user is already authenticated
   * User should handle authentication manually in the browser
   */
  async checkAuthentication() {
    if (!this.isConnected) {
      throw new Error('Not connected to browser. Call init() first.');
    }

    try {
      console.log('🔍 Checking Slack authentication status...');
      
      // Navigate to the Slack workspace
      const workspaceUrl = process.env.SLACK_WORKSPACE_URL || 'https://gusto.enterprise.slack.com';
      console.log(`📍 Navigating to: ${workspaceUrl}`);
      
      await this.page.goto(workspaceUrl);
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
      
      // Wait for any redirects to complete
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
      
      const currentUrl = this.page.url();
      console.log(`🔗 Final URL: ${currentUrl}`);
      
      // Check if we're already authenticated by looking for Slack UI elements
      const isAuthenticated = await this.page.evaluate(() => {
        // Look for various Slack UI indicators - being more permissive
        const indicators = [
          '[data-qa="workspace-name"]',
          '.p-client_container',
          '[data-qa="client_container"]',
          '.p-workspace__sidebar',
          '[data-qa="channel_list"]',
          '.p-channel_sidebar',
          '.p-client',
          '.c-workspace__primary_view',
          '[data-qa="workspace_dropdown"]',
          '.p-workspace_layout',
          // Also check for common Slack elements
          '.c-message_list',
          '.c-texty_input',
          '.p-channel_sidebar__list',
          // Check for any element that contains "slack" in class names
          '[class*="slack"]',
          '[class*="p-workspace"]',
          '[class*="p-client"]'
        ];
        
        for (const selector of indicators) {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            console.log(`Found Slack UI indicator: ${selector} (${elements.length} elements)`);
            return true;
          }
        }
        
        // Also check if the URL indicates we're in the Slack app
        const url = window.location.href;
        if (url.includes('/client/') || url.includes('/messages/') || url.includes('/archives/')) {
          console.log('URL indicates authenticated Slack session');
          return true;
        }
        
        // Check for sign-in related elements to confirm we're NOT authenticated
        const signInIndicators = [
          'input[name="identifier"]',
          '.signin',
          '.login',
          'form[action*="signin"]',
          'button[type="submit"]'
        ];
        
        for (const selector of signInIndicators) {
          if (document.querySelector(selector)) {
            console.log(`Found sign-in indicator: ${selector} - not authenticated`);
            return false;
          }
        }
        
        // If we can't find sign-in elements and we're on the enterprise domain, assume authenticated
        return url.includes('gusto.enterprise.slack.com');
      });
      
      if (isAuthenticated) {
        console.log('✅ Already authenticated with Slack');
        return true;
      } else {
        console.log('❌ Not authenticated with Slack');
        console.log('👤 Please authenticate manually in the Edge browser');
        console.log('🔗 Current URL:', this.page.url());
        
        // Check if we're on a login page
        const currentUrl = this.page.url();
        if (currentUrl.includes('signin') || currentUrl.includes('login')) {
          console.log('📝 You are on a login page. Please complete authentication manually.');
          console.log('⏳ Once authenticated, you can run the script again or use retrieveThreadInfo() directly.');
        }
        
        return false;
      }
      
    } catch (error) {
      console.error('❌ Failed to check authentication:', error.message);
      return false;
    }
  }

  /**
   * Retrieve information from a Slack thread URL
   * Assumes user is already authenticated
   */
  async retrieveThreadInfo(threadUrl) {
    if (!this.isConnected) {
      throw new Error('Not connected to browser. Call init() first.');
    }

    try {
      console.log(`🔍 Retrieving thread info from: ${threadUrl}`);
      
      // Navigate to the thread URL with shorter timeout
      console.log('📍 Navigating to thread URL...');
      try {
        await this.page.goto(threadUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 8000
        });
      } catch (error) {
        console.log('⚠️  Navigation timeout, checking current page...');
      }
      
      // Wait for redirect page to appear
      await this.page.waitForTimeout(2000);
      
      const currentUrl = this.page.url();
      console.log(`🔗 Current URL after navigation: ${currentUrl}`);
      
      // Check if we're on the redirect page
      const isRedirectPage = await this.page.evaluate(() => {
        const title = document.title;
        const bodyText = document.body.innerText;
        return title.includes('Redirecting') || 
               bodyText.includes('Launching') || 
               bodyText.includes('open this link in your browser');
      });
      
      if (isRedirectPage) {
        console.log('🔄 Detected app launch redirect page, clicking "open in browser" link...');
        
        // Look for the "open this link in your browser" link
        const browserLinkSelector = 'a[href*="/messages/"]';
        try {
          await this.page.waitForSelector(browserLinkSelector, { timeout: 5000 });
          await this.page.click(browserLinkSelector);
          console.log('✅ Clicked "open in browser" link');
          
          // Wait for the actual Slack interface to load
          await this.page.waitForLoadState('networkidle', { timeout: 15000 });
          await this.page.waitForTimeout(3000);
          
        } catch (error) {
          console.log('⚠️  Could not find or click browser link, trying direct navigation...');
          
          // Try to construct the browser URL from the thread URL
          const browserUrl = threadUrl.replace('/archives/', '/messages/');
          console.log(`🌐 Trying browser URL: ${browserUrl}`);
          await this.page.goto(browserUrl, { waitUntil: 'networkidle', timeout: 15000 });
        }
      }
      
      // Wait a bit to ensure page loads fully
      await this.page.waitForTimeout(3000);
      
      // Wait for messages to load
      console.log('⏳ Waiting for messages to load...');
      await this.page.waitForTimeout(3000);
      
      // Try multiple selectors for messages
      const messageSelectors = [
        '[data-qa="message"]',
        '.c-message_kit__message',
        '.c-message__body',
        '.p-rich_text_section'
      ];
      
      let messagesFound = false;
      for (const selector of messageSelectors) {
        try {
          await this.page.waitForSelector(selector, { timeout: 5000 });
          messagesFound = true;
          break;
        } catch (e) {
          continue;
        }
      }
      
      if (!messagesFound) {
        throw new Error('Could not find message elements. Make sure you are authenticated and the URL is correct.');
      }
      
      // Extract thread information
      const threadInfo = await this.page.evaluate(() => {
        const messages = [];
        
        // Try multiple selectors for messages
        const messageSelectors = [
          '[data-qa="message"]',
          '.c-message_kit__message',
          '.c-message__body'
        ];
        
        let messageElements = [];
        for (const selector of messageSelectors) {
          messageElements = document.querySelectorAll(selector);
          if (messageElements.length > 0) break;
        }
        
        messageElements.forEach((element, index) => {
          // Try multiple selectors for author
          const authorSelectors = [
            '[data-qa="message_sender_name"]',
            '.c-message__sender_link',
            '.c-message__sender',
            '.c-message_kit__sender_name'
          ];
          
          let author = 'Unknown';
          for (const selector of authorSelectors) {
            const authorElement = element.querySelector(selector);
            if (authorElement) {
              author = authorElement.textContent.trim();
              break;
            }
          }
          
          // Try multiple selectors for time
          const timeSelectors = [
            '[data-qa="message_time"]',
            '.c-timestamp',
            '.c-message__ts'
          ];
          
          let time = 'Unknown';
          for (const selector of timeSelectors) {
            const timeElement = element.querySelector(selector);
            if (timeElement) {
              time = timeElement.getAttribute('datetime') || timeElement.textContent.trim();
              break;
            }
          }
          
          // Try multiple selectors for content
          const contentSelectors = [
            '[data-qa="message_content"]',
            '.c-message__body',
            '.p-rich_text_section',
            '.c-message_kit__text'
          ];
          
          let content = 'No content';
          for (const selector of contentSelectors) {
            const contentElement = element.querySelector(selector);
            if (contentElement) {
              content = contentElement.textContent.trim();
              break;
            }
          }
          
          messages.push({
            index: index + 1,
            author,
            time,
            content
          });
        });
        
        // Get channel/thread information
        const channelSelectors = [
          '[data-qa="channel_name"]',
          '.p-channel_header__name',
          '.c-channel_header__name'
        ];
        
        let channelTitle = 'Unknown Channel';
        for (const selector of channelSelectors) {
          const channelElement = document.querySelector(selector);
          if (channelElement) {
            channelTitle = channelElement.textContent.trim();
            break;
          }
        }
        
        return {
          url: window.location.href,
          channel: channelTitle,
          messageCount: messages.length,
          messages: messages,
          extractedAt: new Date().toISOString()
        };
      });
      
      console.log('✅ Thread information extracted successfully');
      console.log(`📊 Found ${threadInfo.messageCount} messages in ${threadInfo.channel}`);
      
      return threadInfo;
      
    } catch (error) {
      console.error('❌ Failed to retrieve thread info:', error.message);
      throw error;
    }
  }

  /**
   * Close the page but keep Edge browser running
   */
  async closePage() {
    if (this.page) {
      await this.page.close();
      console.log('✅ Closed script tab');
    }
  }

  /**
   * Disconnect from Edge (but keep browser running)
   */
  async disconnect() {
    if (this.page) {
      await this.page.close();
    }
    
    if (this.browserHelper) {
      await this.browserHelper.disconnect();
    }
    
    console.log('✅ Disconnected from Edge browser');
  }

  /**
   * Completely close Edge browser
   */
  async closeEdge() {
    if (this.browserHelper) {
      await this.browserHelper.closeEdge();
    }
    
    console.log('✅ Closed Edge browser completely');
  }
}

// Export the class
module.exports = GustoSlackRetriever;

// If this script is run directly, provide a CLI interface
if (require.main === module) {
  async function main() {
    const retriever = new GustoSlackRetriever();
    
    try {
      // Initialize connection
      await retriever.init();
      
      // Check authentication
      const isAuthenticated = await retriever.checkAuthentication();
      
      if (!isAuthenticated) {
        console.log('\n🔐 Authentication required:');
        console.log('1. Complete authentication in the Edge browser');
        console.log('2. Run this script again, or');
        console.log('3. Use retrieveThreadInfo() method directly with a thread URL');
        console.log('\nExample usage:');
        console.log('node slack-retriever.js "https://gusto.enterprise.slack.com/archives/C05GHL0381M/p1749775659622829"');
        
        // Keep the connection open for manual authentication
        console.log('\n⏳ Press Enter to close or Ctrl+C to exit...');
        await new Promise(resolve => {
          process.stdin.once('data', () => resolve());
        });
        
        return;
      }
      
      // If a thread URL is provided as argument, retrieve it
      const threadUrl = process.argv[2];
      if (threadUrl) {
        console.log(`\n🔗 Retrieving thread: ${threadUrl}`);
        const threadInfo = await retriever.retrieveThreadInfo(threadUrl);
        
        console.log('\n📄 Thread Information:');
        console.log('═══════════════════════════════════════');
        console.log(`Channel: ${threadInfo.channel}`);
        console.log(`URL: ${threadInfo.url}`);
        console.log(`Messages: ${threadInfo.messageCount}`);
        console.log(`Extracted: ${threadInfo.extractedAt}`);
        console.log('═══════════════════════════════════════');
        
        threadInfo.messages.forEach((msg, index) => {
          console.log(`\n${index + 1}. ${msg.author} (${msg.time})`);
          console.log(`   ${msg.content}`);
        });
        
        // Optionally save to file
        const fs = require('fs');
        const filename = `slack-thread-${Date.now()}.json`;
        fs.writeFileSync(filename, JSON.stringify(threadInfo, null, 2));
        console.log(`\n💾 Thread data saved to: ${filename}`);
      } else {
        console.log('\n✅ Ready to retrieve thread information!');
        console.log('Usage: node slack-retriever.js "THREAD_URL"');
      }
      
    } catch (error) {
      console.error('❌ Error:', error.message);
    } finally {
      await retriever.closePage();
    }
  }
  
  main()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Script failed:', error.message);
      process.exit(1);
    });
} 