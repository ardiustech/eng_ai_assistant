# AI Assistant Skills

This repository provides AI assistant skills for browser automation and web service interactions using Microsoft Edge with remote debugging. This approach allows sharing authenticated sessions between manual browsing and automated AI assistant operations.

## Tech Stack

- **Node.js**: Runtime environment
- **Playwright**: Browser automation via Chrome DevTools Protocol
- **Microsoft Edge**: Browser with remote debugging enabled
- **dotenv**: Environment variable management
- **textutil**: Document conversion (macOS built-in)

## Architecture

Instead of launching separate browser instances, this project connects to your existing Microsoft Edge browser where you can manually handle authentication, MFA, and session management. AI assistant skills create new tabs to perform operations while preserving your authenticated sessions.

## Directory Structure

- `lib/`: Shared browser automation utilities
  - `browser-helper.js`: Microsoft Edge remote debugging connection
- `skills/`: AI assistant skills for various web services and automation tasks
  - `gusto-slack/`: Slack interaction skill for Gusto workspace
  - `google-docs/`: Google Docs content extraction and manipulation skill
- `tmp/`: Temporary scripts (gitignored)
- `.env`: Environment variables (gitignored)
- `package.json`: Single dependency management for all skills

## Skills

### Gusto Slack Skill

AI assistant skill for automated interaction with Gusto's Slack instance using shared Edge browser session.

**Features:**
- Manual authentication with session sharing
- Automatic handling of Slack app launch redirects
- Thread message extraction with robust selectors
- JSON output with thread data
- Proper process exit handling (no hanging processes)
- Advanced Slack message formatting automation:
  - Bold text with markdown parsing
  - Auto-formatted bullet lists with proper nesting (Tab/Shift+Tab navigation)
  - Auto-formatted numbered lists with duplicate number prevention
  - Multi-line message composition with strategic timing delays
  - Emoji shortcut support
  - Content verification before sending
  - Robust bullet and numbered list state management for complex structures
- **Announcement Posting**: Skill to post multi-line announcements in DM channels with natural typing delays and proper bullet formatting

**Quick Start:**
```bash
# Install dependencies
npm install

# Test Slack connection (launches Edge if needed)
npm run gusto-slack-test

# Retrieve thread information
npm run gusto-slack "https://gustohq.slack.com/archives/C05GHL0381M/p1749775659622829"

# Post announcement to John Lee's DM
npm run gusto-slack-post better-estimates-2-launch-announcement-final.txt
```

### Google Docs Skill

AI assistant skill for automated extraction and manipulation of Google Docs content with support for document structure and formatting.

**Features:**
- Extract full document content from Google Docs
- Support for document tabs and navigation
- Multiple extraction methods for reliability
- Export to JSON and formatted text
- Handle authentication via shared browser session
- Document metadata extraction (title, word count, etc.)

**Quick Start:**
```bash
# Test Google Docs connection
npm run google-docs-test

# Extract document content
npm run google-docs "https://docs.google.com/document/d/YOUR_DOCUMENT_ID/edit"
```

**Alternative: Direct DOCX Processing**
If you have a downloaded .docx file, you can extract content directly:
```bash
# Uses macOS textutil for conversion
node skills/google-docs/google-docs-retriever.js local-file.docx
```

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Update `.env` file:
   ```env
   SLACK_WORKSPACE_URL=https://gusto.enterprise.slack.com
   ```

3. **Test Connection:**
   ```bash
   npm run gusto-slack-test
   # or
   npm run google-docs-test
   ```

## AI Assistant Workflow

1. **First Run**: Skill launches Microsoft Edge with remote debugging
2. **Manual Authentication**: Complete login/MFA in the browser window
3. **AI Operations**: AI assistant runs skills in new tabs, preserving your session
4. **Session Persistence**: Authenticated state persists across AI assistant operations

## Environment Variables

Current environment variables in `.env`:
- `SLACK_WORKSPACE_URL`: Your Slack workspace URL

## Adding New Skills

1. Create skill directory: `skills/new-skill/`
2. Add skill scripts using `BrowserHelper` from `lib/browser-helper.js`
3. Update `package.json` scripts section
4. Document skill in its own README with automation rules
5. Extract reusable patterns to `lib/` for broader skill reuse

## Skills Architecture Benefits

- **Modular Design**: Each skill is self-contained with its own rules and context
- **Reusable Components**: Shared utilities in `lib/` benefit all skills
- **Accumulated Learning**: Skills document and reuse best practices over time
- **Flexible Interaction**: Skills can use browser automation, REST APIs, or hybrid approaches
- **No Credential Storage**: Manual authentication, no stored passwords
- **MFA Compatible**: Handle complex authentication flows manually
- **Session Reuse**: Authenticated sessions persist between AI assistant operations
- **Development Friendly**: Easy debugging with visible browser window
- **Secure**: No automated credential handling or bypassing security measures
