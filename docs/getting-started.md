# Getting Started with AI Assistant Automation Framework

Welcome to the AI Assistant automation framework! This guide will help you get up and running quickly.

## Overview

This framework provides:
- **Skills-based automation** for various tools (Slack, JIRA, Google Docs, etc.)
- **Repository management** for AI-assisted code reviews and feature development
- **Persistent learnings** system to accumulate knowledge over time
- **Browser automation** capabilities for web-based tools

## Quick Setup

### Prerequisites

- Node.js (v14 or higher)
- Microsoft Edge browser (for browser automation)
- Git with SSH keys configured
- Access to target systems (Slack workspaces, JIRA, etc.)

### Installation

1. **Clone and setup:**
   ```bash
   git clone <your-repo-url>
   cd eng_ai_assistant
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials (see Environment Configuration below)
   ```

3. **Test the setup:**
   ```bash
   # Test Slack skill
   cd skills/gusto-slack && node test-connection.js
   
   # Test JIRA skill  
   cd ../gusto-jira && node test-connection.js
   
   # Test Google Docs skill
   cd ../google-docs && node test-connection.js
   ```

## Environment Configuration

Create a `.env` file in the root directory with:

```bash
# JIRA Configuration
ATLASSIAN_API_TOKEN=your_api_token_here
JIRA_BASE_URL=https://yourcompany.atlassian.net
JIRA_EMAIL=your.email@company.com
JIRA_PROJECT_KEY=PROJ

# Google Docs Configuration (if using)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Browser Configuration
EDGE_DEBUGGING_PORT=9222
```

### Getting API Credentials

**JIRA API Token:**
1. Go to [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click "Create API token"
3. Copy the token to your `.env` file

**Google API Credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable Google Docs API
3. Create OAuth 2.0 credentials
4. Add credentials to your `.env` file

## First Steps

### 1. Test Skills Connectivity

Start by testing individual skills to ensure they can connect to their respective services:

```bash
# Test all skills
./scripts/test-all-skills.sh  # (if available)

# Or test individually
cd skills/gusto-slack && node test-connection.js
cd skills/gusto-jira && node test-connection.js
cd skills/google-docs && node test-connection.js
```

### 2. Set Up Your First Repository

```bash
# Add a repository for code review
./repos/setup-branch.sh git@github.com:yourorg/yourrepo.git main

# Or set up a specific PR for review
./repos/setup-pr.sh git@github.com:yourorg/yourrepo.git 123
```

### 3. Explore Available Repositories

```bash
# List all configured repositories
./repos/list-repos.sh
```

## Common Use Cases

### Code Review Workflow

1. **Set up repository:**
   ```bash
   ./repos/setup-pr.sh git@github.com:yourorg/repo.git 456
   ```

2. **Navigate to PR directory:**
   ```bash
   cd repos/yourrepo/code/pr-456
   ```

3. **Use code-review skill** (see `skills/code-review/README.md` for detailed instructions)

### Slack Automation

1. **Ensure Edge browser is running** with remote debugging:
   ```bash
   # The skill will auto-launch Edge if needed
   ```

2. **Authenticate manually** in the browser first

3. **Run Slack operations:**
   ```bash
   cd skills/gusto-slack
   node slack-retriever.js "https://yourworkspace.slack.com/archives/C123/p456"
   node post-announcement.js
   ```

### JIRA Integration

1. **Test connection:**
   ```bash
   cd skills/gusto-jira
   node test-connection.js
   ```

2. **Use JIRA operations** (see skill documentation for specifics)

## Directory Structure

```
eng_ai_assistant/
├── docs/                    # Documentation (this directory)
├── .cursor/                 # Root-level learnings and patterns
├── lib/                     # Shared utilities
├── repos/                   # Repository management
│   ├── yourrepo/           # Individual repo contexts
│   └── *.sh                # Management scripts
├── skills/                  # Automation skills
│   ├── code-review/        # Code review automation
│   ├── feature-development/ # Feature development assistance
│   ├── google-docs/        # Google Docs integration
│   ├── gusto-jira/         # JIRA integration
│   └── gusto-slack/        # Slack automation
└── tmp/                    # Temporary files (kept clean)
```

## Key Concepts

### Skills
Self-contained automation modules for specific tools or workflows. Each skill has:
- **Main scripts** for operations
- **Test connection** script
- **Configuration** file
- **`.cursor/` directory** with learnings, best practices, automation rules, and prompts

### Repository Management
System for managing multiple repository checkouts for AI-assisted development:
- **Branch checkouts** for feature development
- **PR checkouts** for code reviews
- **Context preservation** across sessions
- **Script automation** for setup and updates

### Persistent Learnings
Knowledge accumulation system using `.cursor/` directories:
- **Root learnings** for general tool usage patterns
- **Skill learnings** for skill-specific knowledge
- **Repository learnings** for repo-specific context
- **Automation rules** for consistent processes

## Troubleshooting

### Common Issues

**1. Browser Connection Fails:**
```bash
# Check if Edge is running with remote debugging
curl http://localhost:9222/json/version

# If not, the skill will auto-launch Edge
```

**2. SAML Authentication Errors:**
```bash
# Use SSH instead of HTTPS for git operations
git clone git@github.com:org/repo.git  # ✅ Works
git clone https://github.com/org/repo.git  # ❌ May fail with SAML
```

**3. Skill Connection Failures:**
- Check `.env` file configuration
- Verify API tokens are valid
- Ensure network connectivity to target services
- Check authentication status in browser for web-based skills

### Getting Help

1. **Check skill-specific documentation:**
   ```bash
   cat skills/SKILL_NAME/README.md
   cat skills/SKILL_NAME/.cursor/learnings.md
   ```

2. **Review automation rules:**
   ```bash
   cat skills/SKILL_NAME/.cursor/automation-rules.md
   ```

3. **Check root learnings for general patterns:**
   ```bash
   cat .cursor/learnings.md
   ```

## Next Steps

- **[Architecture Guide](architecture.md)** - Understand the system design
- **[Creating Skills](creating-skills.md)** - Build your own automation skills
- **[Repository Management](repository-management.md)** - Advanced repo management
- **Individual skill READMEs** - Detailed skill documentation

## Advanced Usage

### Creating Custom Skills
See `docs/creating-skills.md` for detailed instructions on building new automation skills.

### Multiple Repository Workflows
See `docs/repository-management.md` for advanced repository management patterns.

### Browser Automation Best Practices
Check `skills/gusto-slack/.cursor/learnings.md` for detailed browser automation patterns and debugging techniques.

---

**Happy automating!** 🤖✨ 