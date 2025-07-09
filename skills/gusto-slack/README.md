# Gusto Slack Skill

This skill provides Eng AI Assistant capabilities for automated interaction with Gusto's Slack instance using Microsoft Edge with remote debugging.

## Overview

Instead of attempting to automate authentication, this skill connects to your existing Microsoft Edge browser session where you can manually handle login, MFA, and session management. Eng AI Assistant creates new tabs to perform operations while preserving your authenticated session.

## Features

- **Session Sharing**: Uses your existing Edge browser session
- **Manual Authentication**: You handle Okta/MFA authentication manually
- **Thread Extraction**: Retrieves messages, authors, timestamps from Slack threads
- **Message Posting**: Advanced Slack message formatting with bullets, numbered lists, and proper timing
- **Flexible Selectors**: Adapts to different Slack UI versions
- **JSON Export**: Saves thread data to JSON files
- **Accumulated Learning**: Incorporates best practices from `slack-automation-rules.md`

## Prerequisites

- Microsoft Edge browser installed
- Access to Gusto Slack workspace
- Valid Gusto credentials

## Setup

1. **Environment Configuration** (repo root `.env`):
   ```env
   SLACK_WORKSPACE_URL=https://gusto.enterprise.slack.com
   ```

2. **Install Dependencies** (from repo root):
   ```bash
   npm install
   ```

## Usage

### Test Connection

```bash
npm run gusto-slack-test
# or
node skills/gusto-slack/test-connection.js
```

This will:
1. Launch Edge with remote debugging (if not already running)
2. Open Slack workspace in a new tab
3. Check if you're authenticated
4. Guide you through manual authentication if needed

### Retrieve Thread Information

```bash
npm run gusto-slack "THREAD_URL"
# or
node skills/gusto-slack/slack-retriever.js "THREAD_URL"
```

Example:
```bash
npm run gusto-slack "https://gusto.enterprise.slack.com/archives/C05GHL0381M/p1749775659622829"
```

### Post Announcements

```bash
npm run gusto-slack-post announcement-file.txt
# or
node skills/gusto-slack/post-announcement.js announcement-file.txt
```

## Eng AI Assistant Workflow

1. **First Run**: Skill launches Edge with remote debugging
2. **Manual Authentication**: Complete Okta login, MFA in the browser
3. **AI Operations**: Eng AI Assistant runs skill operations in new tabs
4. **Session Persistence**: Your authentication persists across Eng AI Assistant operations

## Output

Thread information is extracted as JSON:

```json
{
  "url": "https://gusto.enterprise.slack.com/archives/C05GHL0381M/p1749775659622829",
  "channel": "Channel Name",
  "messageCount": 5,
  "extractedAt": "2024-07-07T20:00:00.000Z",
  "messages": [
    {
      "index": 1,
      "author": "John Doe",
      "time": "2024-07-07T15:30:00.000Z",
      "content": "Message content here"
    }
  ]
}
```

## Skill Structure

```
skills/gusto-slack/
├── README.md                    # This file
├── slack-retriever.js           # Main skill script for thread extraction
├── post-announcement.js         # Skill script for posting announcements
├── test-connection.js           # Connection testing script
├── slack-automation-rules.md    # Detailed automation rules and best practices
└── config.js                    # Skill configuration
```

## Skill Rules and Learning

This skill maintains accumulated learnings in `slack-automation-rules.md` covering:
- Message formatting best practices
- Bullet and numbered list automation
- Timing and delay strategies
- Content verification approaches
- State management for complex formatting

## Troubleshooting

### Edge Not Found
- Ensure Microsoft Edge is installed
- Check the Edge executable paths in `lib/browser-helper.js`

### Connection Failed
- Close any existing Edge instances
- Try running `npm run gusto-slack-test` first
- Check firewall/network settings

### Authentication Issues
- Complete login manually in the Edge browser
- Ensure you have access to the Gusto Slack workspace
- Check if your session has expired

### No Messages Found
- Verify the thread URL is correct
- Ensure you have access to the channel
- Check if the thread is in a private channel

## Technical Details

- **Browser**: Microsoft Edge with remote debugging
- **Connection**: Chrome DevTools Protocol (CDP)
- **Port**: 9222 (configurable)
- **Session**: Shared with manual browser usage
- **Dependencies**: Playwright for browser automation
- **Reusable Components**: Uses shared `BrowserHelper` from `lib/` 