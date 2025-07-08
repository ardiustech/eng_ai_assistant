#!/usr/bin/env node

const BrowserHelper = require('../../lib/browser-helper');
const config = require('./config');
const fs = require('fs');

async function postAnnouncement() {
  // Get announcement file path from args
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('❌ Error: Please provide the announcement file path as an argument');
    console.log('Usage: node post-announcement.js <file-path>');
    process.exit(1);
  }

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error('❌ Error reading file:', err.message);
    process.exit(1);
  }

  // Split into lines for typing
  const lines = content.split('\n');

  const browserHelper = new BrowserHelper();
  try {
    console.log('🚀 Initializing Slack post...');
    await browserHelper.initialize();
    const page = await browserHelper.createNewPage();

    console.log(`📍 Navigating to DM: ${config.dmUrls.johnLee}`);
    await page.goto(config.dmUrls.johnLee, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Wait for input to be ready
    await page.waitForSelector(config.selectors.messageInput);
    await page.waitForTimeout(config.delays.afterNavigation);

    // Focus input
    const input = await page.$(config.selectors.messageInput);
    await input.click();

    // Clear any existing text
    await page.keyboard.down('Meta');
    await page.keyboard.press('a');
    await page.keyboard.up('Meta');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(config.delays.afterNavigation);

    console.log('✍️ Typing announcement...');
    let inBulletMode = false;
    let currentBulletLevel = 0;
    let inNumberedListMode = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const raw = line.trim();
      
      if (!raw) {
        // Empty line - handle differently based on bullet/numbered mode
        if (inBulletMode) {
          // In bullet mode, empty lines can cause level changes or exit bullet mode
          // Skip empty lines while in bullet mode to maintain state consistency
          console.log('🔍 Skipping empty line while in bullet mode to maintain state');
          continue;
        } else if (inNumberedListMode) {
          // In numbered list mode, empty lines can cause issues
          // Skip empty lines while in numbered list mode to maintain state consistency
          console.log('🔍 Skipping empty line while in numbered list mode to maintain state');
          continue;
        } else {
          // Not in bullet or numbered mode - add newline normally
          await page.keyboard.down('Shift');
          await page.keyboard.press('Enter');
          await page.keyboard.up('Shift');
        }
        continue;
      }
      
      // Detect bullet level by counting leading tabs in original line
      const leadingTabs = line.match(/^\t*/)[0].length;
      const isBullet = raw.startsWith('- ') || raw.startsWith('• ');
      
      // Detect numbered list items (e.g., "1. ", "2. ", etc.)
      const numberedListMatch = raw.match(/^(\d+)\.\s+(.*)$/);
      const isNumberedList = numberedListMatch !== null;
      
      if (isBullet) {
        // Bullet point
        const textBody = raw.slice(2).trim();
        
        // Add logging for key sections to track bullet state
        if (textBody.includes('Near-term') || textBody.includes('Long-term') || textBody.includes('Accuracy') || textBody.includes('Customer Trust') || textBody.includes('Inaccurate Estimates') || textBody.includes('Data Inconsistency')) {
          console.log(`\n🔍 BULLET: Line ${i + 1}: "${textBody}"`);
          console.log(`🔍 Bullet mode: ${inBulletMode}, Level: ${currentBulletLevel}, Target level: ${leadingTabs}`);
        }
        
        if (!inBulletMode) {
          // First bullet point - use '*' to start bullet mode
          await page.keyboard.type(`* ${textBody}`, { delay: config.delays.typingMin });
          inBulletMode = true;
          currentBulletLevel = leadingTabs;
          
          if (textBody.includes('Near-term') || textBody.includes('Long-term')) {
            console.log(`🔍 Started bullet mode: level ${currentBulletLevel}`);
          }
        } else {
          // Always start with Shift+Enter to continue bullet mode
          if (textBody.includes('Long-term') || textBody.includes('Customer Trust')) {
            console.log(`🔍 Executing Shift+Enter...`);
          }
          await page.keyboard.down('Shift');
          await page.keyboard.press('Enter');
          await page.keyboard.up('Shift');
          
          // Add delay after Shift+Enter to let Slack process it
          await page.waitForTimeout(100);
          
          // Adjust level if needed
          if (leadingTabs > currentBulletLevel) {
            // Need to go deeper - use Tab
            if (textBody.includes('Accuracy') || textBody.includes('Customer Trust')) {
              console.log(`🔍 Executing Tab to go deeper (${currentBulletLevel} -> ${leadingTabs})...`);
            }
            await page.keyboard.press('Tab');
            await page.waitForTimeout(150); // Let Slack process the Tab
            currentBulletLevel = leadingTabs;
            
            if (textBody.includes('Accuracy') || textBody.includes('Customer Trust')) {
              console.log(`🔍 Went deeper with Tab: ${currentBulletLevel}`);
              // Add extra delay after going deeper into nested bullets following a main header
              await page.waitForTimeout(100);
            }
          } else if (leadingTabs < currentBulletLevel) {
            // Need to go back up - use Shift+Tab
            const levelsUp = currentBulletLevel - leadingTabs;
            if (textBody.includes('Long-term')) {
              console.log(`🔍 Executing ${levelsUp} Shift+Tab commands to go up (${currentBulletLevel} -> ${leadingTabs})...`);
            }
            for (let j = 0; j < levelsUp; j++) {
              if (textBody.includes('Long-term')) {
                console.log(`🔍 Executing Shift+Tab ${j + 1}/${levelsUp}...`);
              }
              await page.keyboard.down('Shift');
              await page.keyboard.press('Tab');
              await page.keyboard.up('Shift');
              
              // Add longer delay between Shift+Tab commands for Slack to process
              await page.waitForTimeout(150);
            }
            currentBulletLevel = leadingTabs;
            
            if (textBody.includes('Long-term')) {
              console.log(`🔍 Completed Shift+Tab sequence. Final level: ${currentBulletLevel}`);
              console.log(`🔍 Waiting for Slack to process level change...`);
              await page.waitForTimeout(300); // Extra wait for level change to take effect
            }
          } else {
            if (textBody.includes('Consistency') || textBody.includes('Operational Efficiency')) {
              console.log(`🔍 Same level ${currentBulletLevel} - no Tab/Shift+Tab needed`);
            }
          }
          
          // Type the bullet text
          if (textBody.includes('Long-term') || textBody.includes('Customer Trust')) {
            console.log(`🔍 Typing bullet text: "${textBody}"`);
          }
          await page.keyboard.type(textBody, { delay: config.delays.typingMin });
          
          // Add extra delay after typing main bullet headers (like "Long-term:")
          // to ensure Slack processes the bullet state before continuing
          if (textBody.includes('Long-term:') || textBody.includes('Near-term:')) {
            console.log(`🔍 Extra delay after main bullet header...`);
            await page.waitForTimeout(250);
          }
        }
      } else if (isNumberedList) {
        // Numbered list item
        const itemNumber = numberedListMatch[1];
        const itemContent = numberedListMatch[2];
        
        // Add logging for numbered list tracking
        if (itemContent.includes('Monitor Performance') || itemContent.includes('Gather Feedback')) {
          console.log(`\n🔍 NUMBERED: Line ${i + 1}: "${itemContent}"`);
          console.log(`🔍 Number: ${itemNumber}, In numbered mode: ${inNumberedListMode}`);
        }
        
        if (inBulletMode) {
          // Exit bullet mode first
          console.log(`🔍 Exiting bullet mode for numbered list`);
          await page.keyboard.down('Shift');
          await page.keyboard.press('Enter');
          await page.keyboard.up('Shift');
          await page.keyboard.press('Backspace');
          inBulletMode = false;
          currentBulletLevel = 0;
          
          // Add blank line for readability
          await page.keyboard.down('Shift');
          await page.keyboard.press('Enter');
          await page.keyboard.up('Shift');
        }
        
        if (itemNumber === '1') {
          // First numbered item - keep the number to start numbered list mode
          if (itemContent.includes('Monitor Performance')) {
            console.log(`🔍 Starting numbered list mode with: "1. ${itemContent}"`);
          }
          await page.keyboard.type(`1. ${itemContent}`, { delay: config.delays.typingMin });
          inNumberedListMode = true;
        } else {
          // Subsequent numbered items - strip the number, Slack will add it automatically
          if (itemContent.includes('Gather Feedback')) {
            console.log(`🔍 Continuing numbered list (${itemNumber} -> auto): "${itemContent}"`);
          }
          // Just do Shift+Enter to continue the numbered list
          await page.keyboard.down('Shift');
          await page.keyboard.press('Enter');
          await page.keyboard.up('Shift');
          await page.keyboard.type(itemContent, { delay: config.delays.typingMin });
        }
      } else {
        // Regular line (header, text, etc.)
        if (inBulletMode) {
          // Exit bullet mode: first do shift+enter, then immediately backspace
          console.log(`\n🔍 Exiting bullet mode for regular line: "${raw.substring(0, 50)}..."`);
          console.log(`🔍 Current bullet state: mode=${inBulletMode}, level=${currentBulletLevel}`);
          await page.keyboard.down('Shift');
          await page.keyboard.press('Enter');
          await page.keyboard.up('Shift');
          await page.keyboard.press('Backspace');
          inBulletMode = false;
          currentBulletLevel = 0;
          
          // Add blank line for readability
          await page.keyboard.down('Shift');
          await page.keyboard.press('Enter');
          await page.keyboard.up('Shift');
          console.log(`🔍 Exited bullet mode successfully`);
        }
        
        if (inNumberedListMode) {
          // Exit numbered list mode for regular lines
          console.log(`🔍 Exiting numbered list mode for regular line: "${raw.substring(0, 50)}..."`);
          inNumberedListMode = false;
          
          // Add blank line for readability
          await page.keyboard.down('Shift');
          await page.keyboard.press('Enter');
          await page.keyboard.up('Shift');
        }
        
        await page.keyboard.type(raw, { delay: config.delays.typingMin });
        
        // Insert newline via Shift+Enter
        await page.keyboard.down('Shift');
        await page.keyboard.press('Enter');
        await page.keyboard.up('Shift');
      }
    }

    console.log('📨 Sending message...');
    await page.click(config.selectors.sendButton);
    await page.waitForTimeout(config.delays.afterSend);

    console.log('✅ Announcement posted successfully');
    await page.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to post announcement:', error.message);
    process.exit(1);
  }
}

postAnnouncement().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
}); 