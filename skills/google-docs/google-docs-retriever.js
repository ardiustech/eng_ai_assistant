#!/usr/bin/env node

const BrowserHelper = require('../../lib/browser-helper');
const config = require('./config');
const fs = require('fs');
const path = require('path');

class GoogleDocsRetriever {
  constructor() {
    this.config = config;
    this.browserHelper = new BrowserHelper();
  }

  async initialize() {
    console.log('🚀 Initializing Google Docs Retriever...');
    await this.browserHelper.initialize();
    this.page = await this.browserHelper.createNewPage();
    
    // Set viewport
    await this.page.setViewportSize({ 
      width: this.config.googleDocs.viewportWidth, 
      height: this.config.googleDocs.viewportHeight 
    });
    
    console.log('✅ Connected to Edge browser');
  }

  async checkAuthentication() {
    console.log('🔍 Checking Google authentication status...');
    
    try {
      await this.page.goto('https://docs.google.com', { 
        waitUntil: 'domcontentloaded',
        timeout: 20000 
      });
      
      const currentUrl = this.page.url();
      console.log(`🔗 Current URL: ${currentUrl}`);
      
      // Check if we're on a login page
      if (currentUrl.includes('accounts.google.com') || currentUrl.includes('signin')) {
        console.log('❌ Not authenticated with Google');
        console.log('📝 Please log in to Google in the browser window and run the script again');
        return false;
      }
      
      console.log('✅ Already authenticated with Google');
      return true;
    } catch (error) {
      console.error('❌ Error checking authentication:', error.message);
      return false;
    }
  }

  async retrieveDocument(documentUrl) {
    console.log(`\n🔗 Retrieving document: ${documentUrl}`);
    
    try {
      // Navigate to the document
      console.log('📍 Navigating to document URL...');
      await this.page.goto(documentUrl, { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 // Increase timeout to 30 seconds
      });
      
      const currentUrl = this.page.url();
      console.log(`🔗 Current URL after navigation: ${currentUrl}`);
      
      // Check for access issues
      const title = await this.page.title();
      if (title.includes('Request access') || title.includes('You need permission')) {
        console.error('❌ Access denied to document. You need permission to view this document.');
        return null;
      }
      
      // Wait for the document content to load
      console.log('⏳ Waiting for document content to load...');
      
      // Try multiple selectors for Google Docs content
      try {
        await this.page.waitForSelector('.kix-page-content-wrapper', { 
          timeout: 15000 
        });
      } catch (e) {
        console.log('⚠️  Primary selector not found, trying alternative selectors...');
        
        // Try alternative selectors
        const selectors = [
          '.kix-page',
          '.kix-document',
          '[role="textbox"]',
          '.docs-texteventtarget-iframe'
        ];
        
        let found = false;
        for (const selector of selectors) {
          try {
            await this.page.waitForSelector(selector, { timeout: 5000 });
            console.log(`✅ Found content using selector: ${selector}`);
            found = true;
            break;
          } catch (e) {
            continue;
          }
        }
        
        if (!found) {
          console.log('⚠️  Document might be loading slowly, proceeding anyway...');
        }
      }
      
      // Wait a bit for dynamic content to settle
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Extract document information
      const documentInfo = await this.extractDocumentInfo();
      
      console.log('✅ Document information extracted successfully');
      return documentInfo;
      
    } catch (error) {
      console.error('❌ Error retrieving document:', error.message);
      
      // Take a screenshot for debugging
      const screenshotPath = path.join(this.config.output.outputDir, 'google-docs-error.png');
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`📸 Screenshot saved to: ${screenshotPath}`);
      
      return null;
    }
  }

  async extractDocumentInfo() {
    console.log('📊 Extracting document content...');
    
    const documentInfo = await this.page.evaluate(() => {
      // Helper function to extract text from Google Docs
      const extractText = () => {
        // Try multiple approaches to get the document content
        let fullText = '';
        
        // Method 1: Try to get from kix-page elements
        const pages = document.querySelectorAll('.kix-page-content-wrapper');
        if (pages.length > 0) {
          pages.forEach((page, pageIndex) => {
            if (pageIndex > 0) fullText += '\n\n--- Page Break ---\n\n';
            
            // Get all text spans within the page
            const textElements = page.querySelectorAll('.kix-wordhtmlgenerator-word-node');
            textElements.forEach(element => {
              fullText += element.textContent || '';
            });
          });
        }
        
        // Method 2: If no content found, try getting from the document body
        if (!fullText.trim()) {
          // Try to get text from the docs editor
          const docsEditor = document.querySelector('#docs-editor');
          if (docsEditor) {
            fullText = docsEditor.innerText || '';
          }
        }
        
        // Method 3: If still no content, get all text from body
        if (!fullText.trim()) {
          fullText = document.body.innerText || '';
          
          // Remove UI elements text
          const uiTexts = ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Extensions', 'Help', 'Share', 'Editing'];
          uiTexts.forEach(text => {
            fullText = fullText.replace(new RegExp(text + '\\s*', 'g'), '');
          });
        }
        
        return fullText.trim();
      };
      
      // Extract document title
      const titleElement = document.querySelector('.docs-title-input');
      const title = titleElement ? titleElement.value : document.title.replace(' - Google Docs', '').trim();
      
      // Extract document content
      const content = extractText();
      
      // Extract outline/headings if available
      const headings = [];
      
      // Try to find headings in the document
      const headingSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        '[role="heading"]',
        '.kix-paragraphrenderer[style*="font-size: 20pt"]',
        '.kix-paragraphrenderer[style*="font-size: 16pt"]',
        '.kix-paragraphrenderer[style*="font-size: 14pt"]'
      ];
      
      headingSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const text = element.textContent?.trim();
          if (text && text.length > 2 && text.length < 200) {
            const level = element.tagName ? parseInt(element.tagName.substring(1)) : 
                         element.getAttribute('aria-level') ? parseInt(element.getAttribute('aria-level')) : 
                         1;
            
            // Avoid duplicates
            if (!headings.some(h => h.text === text)) {
              headings.push({ level, text });
            }
          }
        });
      });
      
      // Sort headings by their position in the document
      headings.sort((a, b) => {
        const posA = content.indexOf(a.text);
        const posB = content.indexOf(b.text);
        return posA - posB;
      });
      
      return {
        title,
        content,
        headings,
        extractedAt: new Date().toISOString(),
        wordCount: content.split(/\s+/).filter(word => word.length > 0).length,
      };
    });
    
    // Get document URL and ID
    const currentUrl = this.page.url();
    const docIdMatch = currentUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    documentInfo.documentId = docIdMatch ? docIdMatch[1] : null;
    documentInfo.url = currentUrl;
    
    return documentInfo;
  }

  async saveDocumentData(documentInfo) {
    const timestamp = Date.now();
    
    // Save as JSON
    if (this.config.output.saveJson) {
      const jsonFilename = `${this.config.output.filePrefix}-${timestamp}.json`;
      const jsonPath = path.join(this.config.output.outputDir, jsonFilename);
      fs.writeFileSync(jsonPath, JSON.stringify(documentInfo, null, 2));
      console.log(`\n💾 Document data saved to: ${jsonFilename}`);
    }
    
    // Save as formatted text
    if (this.config.output.saveTxt) {
      const txtFilename = `${this.config.output.filePrefix}-${timestamp}.txt`;
      const txtPath = path.join(this.config.output.outputDir, txtFilename);
      
      let formattedText = `Document: ${documentInfo.title}\n`;
      formattedText += `URL: ${documentInfo.url}\n`;
      formattedText += `Document ID: ${documentInfo.documentId}\n`;
      formattedText += `Word Count: ${documentInfo.wordCount}\n`;
      formattedText += `Extracted: ${documentInfo.extractedAt}\n`;
      formattedText += '═'.repeat(50) + '\n\n';
      
      if (documentInfo.headings.length > 0) {
        formattedText += 'Document Outline:\n';
        documentInfo.headings.forEach(heading => {
          const indent = '  '.repeat(heading.level - 1);
          formattedText += `${indent}• ${heading.text}\n`;
        });
        formattedText += '\n' + '═'.repeat(50) + '\n\n';
      }
      
      formattedText += 'Content:\n\n';
      formattedText += documentInfo.content;
      
      fs.writeFileSync(txtPath, formattedText);
      console.log(`📄 Formatted text saved to: ${txtFilename}`);
    }
  }

  async displayDocumentInfo(documentInfo) {
    console.log('\n📄 Document Information:');
    console.log('═'.repeat(50));
    console.log(`Title: ${documentInfo.title}`);
    console.log(`Document ID: ${documentInfo.documentId}`);
    console.log(`Word Count: ${documentInfo.wordCount}`);
    console.log(`Headings Found: ${documentInfo.headings.length}`);
    console.log(`Extracted: ${documentInfo.extractedAt}`);
    console.log('═'.repeat(50));
    
    if (documentInfo.headings.length > 0) {
      console.log('\nDocument Outline:');
      documentInfo.headings.forEach(heading => {
        const indent = '  '.repeat(heading.level - 1);
        console.log(`${indent}• ${heading.text}`);
      });
    }
  }

  async cleanup() {
    if (this.page) {
      console.log('✅ Closed script tab');
      await this.page.close();
    }
  }
}

// Main execution
async function main() {
  const retriever = new GoogleDocsRetriever();
  
  try {
    // Get document URL from command line arguments
    const documentUrl = process.argv[2];
    
    if (!documentUrl) {
      console.error('❌ Error: Please provide a Google Docs URL as an argument');
      console.log('Usage: node google-docs-retriever.js <google-docs-url>');
      process.exit(1);
    }
    
    // Validate URL
    if (!documentUrl.includes('docs.google.com')) {
      console.error('❌ Error: Invalid Google Docs URL');
      console.log('Please provide a valid Google Docs URL (e.g., https://docs.google.com/document/d/...)');
      process.exit(1);
    }
    
    // Initialize browser
    await retriever.initialize();
    
    // Check authentication
    const isAuthenticated = await retriever.checkAuthentication();
    if (!isAuthenticated) {
      console.log('\n⚠️  Please log in to Google in the Edge browser window and run the script again.');
      await retriever.cleanup();
      process.exit(1);
    }
    
    // Retrieve document
    const documentInfo = await retriever.retrieveDocument(documentUrl);
    
    if (documentInfo) {
      // Display document info
      await retriever.displayDocumentInfo(documentInfo);
      
      // Save document data
      await retriever.saveDocumentData(documentInfo);
      
      console.log('\n✅ Script completed successfully');
    } else {
      console.error('\n❌ Failed to retrieve document');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await retriever.cleanup();
  }
}

// Run the script
main().then(() => {
  process.exit(0);
}).catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
}); 