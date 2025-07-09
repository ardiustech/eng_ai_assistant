# AI Assistant Automation Framework

This repository provides an AI Assistant automation framework for browser automation, web service interactions, and development workflows. The framework supports multiple skills for various automation tasks and includes a repository management system for AI-assisted development.

## Tech Stack

- **Node.js**: Runtime environment (v18.0.0+)
- **Playwright**: Browser automation via Chrome DevTools Protocol
- **Microsoft Edge**: Browser with remote debugging enabled
- **dotenv**: Environment variable management
- **Shell Scripts**: Repository management and workflow automation

## Architecture

The framework uses a shared browser session approach, connecting to your existing Microsoft Edge browser where you can manually handle authentication, MFA, and session management. AI Assistant skills create new tabs to perform operations while preserving your authenticated sessions.

### Core Components

- **Skills System**: Modular automation skills for different services
- **Repository Management**: Multi-repository support for development workflows
- **Browser Helper**: Shared browser automation utilities
- **Documentation**: Comprehensive guides and API documentation
- **Validation & Health Checks**: Framework integrity and connectivity testing

## Directory Structure

- `docs/`: Comprehensive documentation and guides
  - `README.md`: Main documentation hub
  - `getting-started.md`: Quick setup and usage guide
  - `architecture.md`: System design and components
  - `creating-skills.md`: Skill development guide
  - `repository-management.md`: Repository workflow management
- `lib/`: Shared browser automation utilities
  - `browser-helper.js`: Microsoft Edge remote debugging connection
- `skills/`: AI Assistant skills for various web services and automation tasks
  - `gusto-slack/`: Slack interaction skill for Gusto workspace
  - `gusto-jira/`: JIRA integration for issue tracking
  - `google-docs/`: Google Docs content extraction and manipulation
  - `code-review/`: Code review automation and guidelines
  - `feature-development/`: Feature development workflows
- `repos/`: Repository management system
  - `setup-branch.sh`: Branch setup and checkout
  - `setup-pr.sh`: Pull request preparation
  - `update-repo.sh`: Repository synchronization
  - `list-repos.sh`: Repository listing
- `scripts/`: Framework utility scripts
  - `validate-framework.js`: Framework validation and integrity checks
  - `health-check.js`: Skill and repository connectivity testing
- `tmp/`: Temporary scripts (gitignored)
- `.env`: Environment variables (gitignored)
- `.env.example`: Environment variable template
- `package.json`: Unified dependency management

## Skills

### Gusto Slack Skill

AI Assistant skill for automated interaction with Gusto's Slack instance using shared Edge browser session.

**Features:**
- Manual authentication with session sharing
- Automatic handling of Slack app launch redirects
- Thread message extraction with robust selectors
- JSON output with thread data
- Advanced Slack message formatting automation:
  - Bold text with markdown parsing
  - Auto-formatted bullet lists with proper nesting
  - Auto-formatted numbered lists
  - Multi-line message composition
  - Emoji shortcut support
  - Content verification before sending
- **Announcement Posting**: Multi-line announcements in DM channels

### Gusto JIRA Skill

AI Assistant skill for automated interaction with JIRA for issue tracking and project management.

**Features:**
- JIRA API integration with authentication
- Issue retrieval and search functionality
- Project and user management
- Custom JQL query support
- Rate limiting and error handling

### Google Docs Skill

AI Assistant skill for automated extraction and manipulation of Google Docs content.

**Features:**
- Extract full document content from Google Docs
- Support for document tabs and navigation
- Multiple extraction methods for reliability
- Export to JSON and formatted text
- Document metadata extraction

### Code Review Skill

Documentation-based skill for code review automation and guidelines.

**Features:**
- Code review best practices and guidelines
- Automated review checklist generation
- Integration with repository workflows
- Review quality metrics and tracking

### Feature Development Skill

Documentation-based skill for feature development workflows.

**Features:**
- Feature development lifecycle management
- Development workflow automation
- Integration with repository management
- Feature tracking and progress monitoring

## Repository Management

The framework includes a comprehensive repository management system for AI-assisted development:

- **Multi-Repository Support**: Manage multiple repositories simultaneously
- **Branch Management**: Automated branch setup and switching
- **Pull Request Workflow**: Streamlined PR preparation and management
- **Context Preservation**: Persistent learning and context storage
- **SSH Authentication**: Secure authentication for SAML-protected organizations

## Quick Start

1. **Install Dependencies:**
   ```bash
   npm run setup
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Validate Framework:**
   ```bash
   npm run validate
   ```

4. **Test Connectivity:**
   ```bash
   npm run health-check
   ```

5. **Test Individual Skills:**
   ```bash
   npm run test-all-skills
   ```

## Framework Scripts

### Validation & Health Checks

- `npm run validate`: Comprehensive framework validation
- `npm run health-check`: Test all skills and repositories
- `npm run test-all-skills`: Run connectivity tests for all skills

### Skill Operations

- `npm run gusto-slack-test`: Test Slack connection
- `npm run gusto-jira-test`: Test JIRA connection
- `npm run google-docs-test`: Test Google Docs connection
- `npm run gusto-slack`: Retrieve Slack thread information
- `npm run gusto-jira`: Retrieve JIRA issues
- `npm run google-docs`: Extract Google Docs content

### Repository Management

- `npm run list-repos`: List configured repositories
- `npm run setup-branch`: Set up new branch for development
- `npm run setup-pr`: Prepare pull request
- `npm run update-repo`: Update repository

## Environment Variables

Create `.env` from `.env.example` and configure:

```env
# JIRA Integration
ATLASSIAN_API_TOKEN=your_api_token_here
JIRA_BASE_URL=https://yourcompany.atlassian.net
JIRA_EMAIL=your.email@company.com

# Slack Integration
SLACK_WORKSPACE_URL=https://yourcompany.slack.com

# Google Services
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Browser Automation
EDGE_DEBUGGING_PORT=9222

# Development & Debugging
DEBUG=false
NODE_ENV=production
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Getting Started](docs/getting-started.md)**: Quick setup and basic usage
- **[Architecture](docs/architecture.md)**: System design and components
- **[Creating Skills](docs/creating-skills.md)**: Skill development guide
- **[Repository Management](docs/repository-management.md)**: Repository workflows

## AI Assistant Workflow

1. **Framework Setup**: Run validation and health checks
2. **Environment Configuration**: Set up environment variables
3. **Manual Authentication**: Complete login/MFA in browser window
4. **AI Operations**: AI Assistant runs skills in new tabs, preserving sessions
5. **Session Persistence**: Authenticated state persists across operations

## Adding New Skills

1. Create skill directory: `skills/new-skill/`
2. Add skill scripts using `BrowserHelper` from `lib/browser-helper.js`
3. Update `package.json` scripts section
4. Create comprehensive documentation
5. Add `.cursor/` directory for persistent learning
6. Extract reusable patterns to `lib/` for broader skill reuse

See [Creating Skills](docs/creating-skills.md) for detailed guidance.

## Framework Benefits

- **Modular Design**: Each skill is self-contained with its own rules and context
- **Reusable Components**: Shared utilities in `lib/` benefit all skills
- **Accumulated Learning**: Skills document and reuse best practices over time
- **Flexible Interaction**: Skills can use browser automation, REST APIs, or hybrid approaches
- **Repository Integration**: Seamless integration with development workflows
- **Validation & Health Checks**: Comprehensive framework integrity testing
- **No Credential Storage**: Manual authentication, no stored passwords
- **MFA Compatible**: Handle complex authentication flows manually
- **Session Reuse**: Authenticated sessions persist between AI Assistant operations
- **Development Friendly**: Easy debugging with visible browser window
- **Secure**: No automated credential handling or bypassing security measures
- **Comprehensive Documentation**: Detailed guides and API documentation
- **Extensible Architecture**: Easy to add new skills and capabilities

## Support

For questions, issues, or contributions:
- Review the documentation in `docs/`
- Run `npm run validate` to check framework integrity
- Run `npm run health-check` to test connectivity
- Check skill-specific `.cursor/` directories for accumulated learnings
