# Slack Automation Rules

## Configuration
- See `config.js` for DM URLs and common selectors
- John Lee's DM URL: https://app.slack.com/client/E03CXP6PB47/D02925XRMRQ

## Message Formatting
1. **Markdown Parsing**
   - Single asterisks (*text*) work for bold formatting in most cases
   - Emoji + asterisk combinations may not parse correctly for bold (e.g., 🏗️ *text* might show asterisks literally)
   - Character-by-character typing with natural delays (10-30ms) helps trigger Slack's markdown parsing
   - Use emoji shortcuts (:rocket:, :building_construction:, etc.) instead of direct emoji characters for better compatibility

2. **Line Breaks and Message Structure**
   - **CRITICAL**: Use Shift+Enter (not Enter) for line breaks within a single message to avoid sending multiple separate messages
   - Always implement this as: `await page.keyboard.down('Shift'); await page.keyboard.press('Enter'); await page.keyboard.up('Shift');`
   - Regular Enter will send the message immediately - only use at the very end
   - Always verify content length before sending (should be >100 chars for substantial content)
   - Wait 2+ seconds after typing to allow markdown parsing before sending

3. **Lists and Bullet Mode Management**
   - **Bulleted Lists**: Add the first bullet (•) manually, then Shift+Enter will auto-continue the list
   - **Numbered Lists**: Add the first number (1.) manually, then Shift+Enter will auto-continue the numbering
   - Slack's auto-formatting only triggers when you start a list properly - typing all bullets/numbers manually won't trigger list formatting

   **CRITICAL BULLET MODE BEHAVIOR:**
   - **Starting Bullet Mode**: Type `* text` for the first bullet - this activates bullet mode
   - **Continuing Bullets**: For subsequent bullets, just type the text content (no asterisk) - Slack auto-creates the bullet
   - **Staying in Bullet Mode**: Use Shift+Enter after each bullet to continue the list
   - **Exiting Bullet Mode**: Use this exact sequence:
     1. Shift+Enter (creates new line while still in bullet mode)
     2. Backspace (exits bullet mode completely)
     3. Shift+Enter (adds blank line for readability)
     4. Type your non-bullet content
   - **Common Mistake**: Adding `*` to every bullet creates extra asterisks (e.g., "* • text")
   - **State Tracking**: Always track whether you're in bullet mode to avoid formatting errors

4. **Link Formatting**
   - Use <URL|display text> format for clickable links with custom text
   - Be aware that the pipe character (|) may get URL-encoded during automation
   - Fallback: URLs are clickable even without formatting

## Automation Best Practices
1. **Input Methods**
   - Clipboard paste often fails in Slack - use direct typing with messageInput.type() instead
   - Use .ql-editor selector for the message input field
   - Always click to focus the input before typing

2. **Timing and Delays**
   - Add natural typing delays (Math.random() * 20 + 10 ms per character)
   - Wait 100ms after Shift+Enter for line breaks
   - Wait 2000ms before sending to ensure markdown parsing completes

3. **Content Verification**
   - Always check content length after typing (messageInput.textContent())
   - Take screenshots before and after sending for debugging
   - Log formatted vs plain lines for troubleshooting

4. **Bullet Mode State Management**
   - Use a boolean flag (`inBulletMode`) to track current state
   - Only use `*` prefix for the first bullet in a sequence
   - Always exit bullet mode properly before typing section headers or non-bullet content
   - Test bullet sequences in isolation before integrating into larger messages

## Common Issues and Solutions
1. **Bold Text Not Working**
   - Try emoji shortcuts instead of direct emojis
   - Consider alternative emphasis (ALL CAPS, brackets, arrows)
   - Some emoji + asterisk combinations never parse correctly

2. **Lists Not Auto-Formatting**
   - Ensure you only manually type the first item
   - Let Slack auto-add subsequent bullets/numbers
   - Empty lines end list formatting

3. **Multiple Messages Instead of One**
   - Always use Shift+Enter, never just Enter (except to send)
   - Track list state to know when to end formatting

4. **Extra Asterisks in Bullet Points**
   - **Problem**: Typing `* text` for every bullet creates "* • text" (both asterisk and bullet)
   - **Solution**: Only use `*` for the first bullet, then just type content for subsequent bullets
   - **Root Cause**: Slack auto-creates bullets when in bullet mode, so manual `*` creates duplicates

5. **Section Headers Appearing as Bullets**
   - **Problem**: Not properly exiting bullet mode causes headers to become bullet points
   - **Solution**: Use the exact exit sequence: Shift+Enter → Backspace → Shift+Enter → Type header
   - **Critical**: The backspace must come immediately after the Shift+Enter to exit bullet mode

## Testing Approach
When testing Slack formatting:
1. Create small test scripts to verify specific formatting
2. Test one formatting type at a time
3. Use manual typing to confirm what works before automating
4. Compare automated results with manual results
5. **For bullet testing**: Test bullet mode entry, continuation, and exit sequences separately
6. **For complex messages**: Test section transitions (bullet list → header → bullet list) in isolation 