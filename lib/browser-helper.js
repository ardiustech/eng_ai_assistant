const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

class BrowserHelper {
  constructor(debugPort = 9222) {
    this.debugPort = debugPort;
    this.browser = null;
    this.context = null;
    this.edgeProcess = null;
  }

  /**
   * Launch Microsoft Edge with remote debugging enabled
   * User should authenticate manually in the main Edge window
   */
  async launchEdgeWithDebugging() {
    try {
      // Try to find Microsoft Edge executable
      const edgePaths = [
        '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        '/Applications/Microsoft Edge Dev.app/Contents/MacOS/Microsoft Edge Dev',
        '/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta',
        '/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary'
      ];

      let edgePath = null;
      for (const path of edgePaths) {
        try {
          const fs = require('fs');
          if (fs.existsSync(path)) {
            edgePath = path;
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!edgePath) {
        throw new Error('Microsoft Edge not found. Please install Microsoft Edge.');
      }

      console.log(`Found Microsoft Edge at: ${edgePath}`);
      console.log(`Starting Edge with remote debugging on port ${this.debugPort}...`);

      // Launch Edge with remote debugging
      this.edgeProcess = spawn(edgePath, [
        `--remote-debugging-port=${this.debugPort}`,
        '--user-data-dir=/tmp/edge-remote-debug',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-default-apps',
        '--disable-background-mode',
        '--no-default-browser-check',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows'
      ], {
        detached: true,
        stdio: 'ignore'
      });

      // Wait a bit for Edge to start
      await new Promise(resolve => setTimeout(resolve, 3000));

      console.log('✅ Microsoft Edge launched with remote debugging enabled');
      console.log(`🌐 You can now manually authenticate in the Edge browser`);
      console.log(`🔗 Remote debugging available at: http://localhost:${this.debugPort}`);
      
      return true;
    } catch (error) {
      console.error('❌ Failed to launch Microsoft Edge:', error.message);
      return false;
    }
  }

  /**
   * Connect to the remote debugging Edge instance
   */
  async connectToRemoteEdge(verbose = true) {
    try {
      if (verbose) {
        console.log(`Connecting to remote Edge on port ${this.debugPort}...`);
      }
      
      // Connect to the remote debugging Edge
      this.browser = await chromium.connectOverCDP(`http://localhost:${this.debugPort}`);
      
      // Get existing contexts or create new one
      const contexts = this.browser.contexts();
      if (contexts.length > 0) {
        this.context = contexts[0];
        console.log('✅ Connected to existing Edge context');
      } else {
        this.context = await this.browser.newContext();
        console.log('✅ Created new Edge context');
      }

      return true;
    } catch (error) {
      if (verbose) {
        console.error('❌ Failed to connect to remote Edge:', error.message);
        console.error('Make sure Edge is running with remote debugging enabled');
      }
      return false;
    }
  }

  /**
   * Create a new page/tab in the connected Edge browser
   */
  async createNewPage() {
    if (!this.context) {
      throw new Error('Not connected to Edge. Call connectToRemoteEdge() first.');
    }

    const page = await this.context.newPage();
    console.log('✅ Created new tab in Edge');
    return page;
  }

  /**
   * Get all existing pages/tabs
   */
  async getAllPages() {
    if (!this.context) {
      throw new Error('Not connected to Edge. Call connectToRemoteEdge() first.');
    }

    return this.context.pages();
  }

  /**
   * Close connection (but keep Edge browser running)
   */
  async disconnect() {
    if (this.browser) {
      await this.browser.close();
      console.log('✅ Disconnected from Edge (browser still running)');
    }
  }

  /**
   * Completely close Edge browser
   */
  async closeEdge() {
    if (this.browser) {
      await this.browser.close();
    }
    
    if (this.edgeProcess) {
      this.edgeProcess.kill();
      console.log('✅ Closed Edge browser');
    }
  }

  /**
   * Check if Edge is already running with remote debugging
   */
  async isEdgeRunningWithDebugging() {
    return new Promise((resolve) => {
      const req = http.get(`http://localhost:${this.debugPort}/json/version`, (res) => {
        if (res.statusCode === 200) {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              const jsonData = JSON.parse(data);
              console.log(`✅ Found existing Edge instance: ${jsonData.Browser}`);
              resolve(true);
            } catch (e) {
              resolve(false);
            }
          });
        } else {
          resolve(false);
        }
      });
      
      req.on('error', () => {
        resolve(false);
      });
      
      req.setTimeout(2000, () => {
        req.destroy();
        resolve(false);
      });
    });
  }

  /**
   * Helper method to start everything
   */
  async initialize() {
    // First check if Edge is already running with remote debugging
    const isRunning = await this.isEdgeRunningWithDebugging();
    
    if (isRunning) {
      console.log('🔗 Connecting to existing Edge instance...');
      const connected = await this.connectToRemoteEdge(false);
      if (connected) {
        return true;
      }
    }
    
    // If no existing instance or connection failed, launch new one
    console.log('🚀 No existing Edge instance found, launching new one...');
    const launched = await this.launchEdgeWithDebugging();
    
    if (!launched) {
      throw new Error('Failed to launch Edge with remote debugging');
    }
    
    // Wait a bit more and try to connect
    await new Promise(resolve => setTimeout(resolve, 3000));
    const connected = await this.connectToRemoteEdge();
    
    if (!connected) {
      throw new Error('Failed to connect to newly launched Edge');
    }
    
    return true;
  }
}

module.exports = BrowserHelper; 