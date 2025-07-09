# Repository Management Guide

This guide covers the repository management system for AI-assisted development workflows.

## Overview

The repository management system provides:
- **Multi-repository support** for managing different codebases
- **Branch and PR checkout workflows** for development and code review
- **Persistent context storage** for repository-specific learnings
- **Automated setup scripts** for consistent environment preparation
- **Integration with AI skills** for enhanced development workflows

## Repository Structure

Each managed repository follows this structure:

```
repos/{repo-name}/
├── .cursor/                 # Repository-specific context
│   ├── learnings.md         # Discoveries and insights
│   ├── code-patterns.md     # Architecture and design patterns
│   ├── review-guidelines.md # Code review standards
│   └── agent-notes.md       # AI agent preferences and context
├── code/                    # Code checkouts (gitignored)
│   ├── main/               # Main branch checkout
│   ├── develop/            # Development branch checkout
│   ├── pr-{number}/        # Pull request checkouts
│   └── feature-{name}/     # Feature branch checkouts
└── scripts/                # Repository-specific scripts
    ├── build.sh            # Build automation
    ├── test.sh             # Testing automation
    └── deploy.sh           # Deployment automation
```

## Management Scripts

### 1. Setup Branch (`setup-branch.sh`)

Sets up a repository branch for development work.

**Usage:**
```bash
./repos/setup-branch.sh <repo-url> <branch-name>
```

**Examples:**
```bash
# Setup main branch
./repos/setup-branch.sh git@github.com:org/repo.git main

# Setup development branch
./repos/setup-branch.sh git@github.com:org/repo.git develop

# Setup feature branch
./repos/setup-branch.sh git@github.com:org/repo.git feature/user-auth
```

**What it does:**
1. Creates repository directory structure
2. Clones the repository using SSH
3. Checks out the specified branch
4. Initializes `.cursor/` context files
5. Sets up repository-specific scripts
6. Validates the checkout

### 2. Setup PR (`setup-pr.sh`)

Sets up a pull request for code review.

**Usage:**
```bash
./repos/setup-pr.sh <repo-url> <pr-number>
```

**Examples:**
```bash
# Setup PR #123 for review
./repos/setup-pr.sh git@github.com:org/repo.git 123

# Setup PR from different remote
./repos/setup-pr.sh git@github.com:org/repo.git 456
```

**What it does:**
1. Creates repository directory structure
2. Clones the repository
3. Fetches the PR as a local branch
4. Checks out the PR branch
5. Initializes context with PR metadata
6. Sets up review-specific scripts

### 3. Update Repository (`update-repo.sh`)

Updates an existing repository checkout.

**Usage:**
```bash
./repos/update-repo.sh <repo-name> [branch-name]
```

**Examples:**
```bash
# Update main branch
./repos/update-repo.sh myrepo main

# Update current branch
./repos/update-repo.sh myrepo

# Update specific feature branch
./repos/update-repo.sh myrepo feature/auth
```

**What it does:**
1. Navigates to repository directory
2. Fetches latest changes from remote
3. Updates the specified branch
4. Refreshes repository context
5. Updates any repository-specific scripts

### 4. List Repositories (`list-repos.sh`)

Lists all configured repositories and their checkouts.

**Usage:**
```bash
./repos/list-repos.sh
```

**Output example:**
```
📁 Available Repositories:

myrepo/
├── 📂 code/
│   ├── main/          (last updated: 2 hours ago)
│   ├── develop/       (last updated: 1 day ago)
│   └── pr-123/        (last updated: 30 minutes ago)
├── 📋 .cursor/        (4 context files)
└── 🔧 scripts/        (3 automation scripts)

another-repo/
├── 📂 code/
│   └── main/          (last updated: 1 week ago)
├── 📋 .cursor/        (4 context files)
└── 🔧 scripts/        (2 automation scripts)

📊 Total: 2 repositories, 4 checkouts
```

## Repository Context System

### Context Files

Each repository maintains context in its `.cursor/` directory:

#### 1. Learnings (`learnings.md`)
Repository-specific discoveries and insights:
```markdown
# MyRepo - Repository Learnings

## Architecture Insights
- Uses microservices architecture with Docker containers
- API Gateway pattern with Kong
- Event-driven communication via Redis

## Development Patterns
- Feature branch workflow with PR reviews
- CI/CD pipeline runs on every push
- Automated testing with Jest and Cypress

## Common Issues
- Build fails if Node.js version < 16
- Database migrations must be run manually
- Redis connection issues in development

## Performance Considerations
- Bundle size optimization important for frontend
- Database queries need indexing for large datasets
- CDN caching strategy for static assets

## Integration Points
- Slack notifications for deployments
- JIRA integration for issue tracking
- GitHub Actions for CI/CD pipeline
```

#### 2. Code Patterns (`code-patterns.md`)
Architecture and design patterns discovered:
```markdown
# MyRepo - Code Patterns

## Frontend Architecture
- React with TypeScript
- Redux for state management
- Material-UI for components
- React Router for navigation

## Backend Architecture
- Express.js with TypeScript
- Prisma ORM for database access
- JWT authentication
- REST API with OpenAPI spec

## Design Patterns
- Repository pattern for data access
- Service layer for business logic
- Factory pattern for creating objects
- Observer pattern for event handling

## Code Organization
- Feature-based directory structure
- Barrel exports for clean imports
- Shared utilities in common directory
- Environment-specific configurations

## Testing Patterns
- Unit tests with Jest
- Integration tests with Supertest
- E2E tests with Playwright
- Test data factories for setup
```

#### 3. Review Guidelines (`review-guidelines.md`)
Code review standards and preferences:
```markdown
# MyRepo - Code Review Guidelines

## Review Standards
- All PRs require at least 2 approvals
- Automated tests must pass before merge
- Code coverage must be > 80%
- Documentation required for new features

## Focus Areas
- Security vulnerabilities
- Performance implications
- Code maintainability
- API design consistency

## Common Review Points
- Error handling completeness
- Input validation and sanitization
- Database query optimization
- Component reusability

## Team Preferences
- Prefer composition over inheritance
- Use TypeScript strict mode
- Follow established naming conventions
- Include meaningful commit messages

## Review Process
1. Automated checks must pass
2. Self-review by author
3. Peer review by team member
4. Final approval by tech lead
5. Merge with squash commit
```

#### 4. Agent Notes (`agent-notes.md`)
AI agent preferences and context:
```markdown
# MyRepo - AI Agent Notes

## Agent Preferences
- Focus on TypeScript and React patterns
- Emphasize test-driven development
- Pay attention to performance implications
- Consider security best practices

## Context Priorities
- User authentication and authorization
- API design consistency
- Database schema changes
- Frontend component architecture

## Review Focus
- Code quality and maintainability
- Error handling and edge cases
- Documentation completeness
- Testing coverage and quality

## Common Tasks
- Code review assistance
- Bug investigation and fixes
- Feature implementation guidance
- Performance optimization suggestions

## Integration Points
- Slack notifications for important changes
- JIRA ticket references in commits
- GitHub PR template compliance
- Documentation updates in wiki
```

## Workflow Examples

### Code Review Workflow

1. **Setup PR for Review:**
   ```bash
   ./repos/setup-pr.sh git@github.com:org/repo.git 123
   ```

2. **Navigate to PR Directory:**
   ```bash
   cd repos/repo/code/pr-123
   ```

3. **Review Context:**
   ```bash
   # Check repository patterns
   cat ../../../.cursor/code-patterns.md
   
   # Review guidelines
   cat ../../../.cursor/review-guidelines.md
   
   # Agent context
   cat ../../../.cursor/agent-notes.md
   ```

4. **Perform Review:**
   - Use AI code review skill
   - Follow established guidelines
   - Document findings in agent notes

### Feature Development Workflow

1. **Setup Feature Branch:**
   ```bash
   ./repos/setup-branch.sh git@github.com:org/repo.git feature/auth
   ```

2. **Development Environment:**
   ```bash
   cd repos/repo/code/feature-auth
   
   # Run setup scripts
   ../../../scripts/setup-dev.sh
   ```

3. **Development Process:**
   - Use AI development skills
   - Follow established patterns
   - Update learnings as needed

4. **Integration Testing:**
   ```bash
   # Run repository-specific tests
   ../../../scripts/test.sh
   ```

## Advanced Features

### Multi-Repository Operations

For operations across multiple repositories:

```bash
# Update all repositories
for repo in repos/*/; do
    repo_name=$(basename "$repo")
    ./repos/update-repo.sh "$repo_name"
done

# List all repositories
./repos/list-repos.sh

# Search across all repositories
grep -r "searchterm" repos/*/code/
```

### Repository-Specific Scripts

Each repository can have custom automation scripts:

```bash
# Build script
repos/myrepo/scripts/build.sh

# Test script
repos/myrepo/scripts/test.sh

# Deploy script
repos/myrepo/scripts/deploy.sh
```

### Context Synchronization

Keep context files synchronized across checkouts:

```bash
# Sync context from main to feature branch
cp -r repos/myrepo/.cursor/* repos/myrepo/code/feature-auth/.cursor/
```

## Authentication and Access

### SSH Key Setup

For private repositories, ensure SSH keys are configured:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Add public key to GitHub
cat ~/.ssh/id_ed25519.pub
```

### SAML Organization Access

For SAML-protected organizations:

1. **Use SSH instead of HTTPS:**
   ```bash
   # ✅ This works
   git@github.com:org/repo.git
   
   # ❌ This may fail
   https://github.com/org/repo.git
   ```

2. **Authorize GitHub CLI if needed:**
   ```bash
   gh auth login
   ```

## Troubleshooting

### Common Issues

#### 1. **Repository Not Found**
```bash
Error: Repository not found or access denied
```
**Solution:**
- Verify repository URL is correct
- Check SSH key is added to GitHub
- Ensure you have access to the repository

#### 2. **Branch Doesn't Exist**
```bash
Error: Branch 'feature/auth' not found
```
**Solution:**
- Check branch name spelling
- Verify branch exists on remote
- Try fetching latest changes first

#### 3. **Permission Denied**
```bash
Permission denied (publickey)
```
**Solution:**
- Check SSH key is configured
- Verify key is added to SSH agent
- Test SSH connection: `ssh -T git@github.com`

#### 4. **Directory Already Exists**
```bash
Error: Directory repos/myrepo already exists
```
**Solution:**
- Remove existing directory or use update script
- Check if repository is already set up

### Debugging Commands

```bash
# Check repository status
git status

# Check remote configuration
git remote -v

# Check branch tracking
git branch -vv

# Check SSH connection
ssh -T git@github.com

# Check available branches
git branch -a
```

## Integration with AI Skills

### Code Review Integration

```bash
# Setup PR and start review
./repos/setup-pr.sh git@github.com:org/repo.git 123
cd repos/repo/code/pr-123

# Use AI code review skill
# The skill will automatically use repository context
```

### Feature Development Integration

```bash
# Setup feature branch
./repos/setup-branch.sh git@github.com:org/repo.git feature/auth
cd repos/repo/code/feature-auth

# Use AI development skill
# The skill will leverage repository patterns and guidelines
```

## Best Practices

### Repository Management

1. **Regular Updates:**
   - Update repository checkouts regularly
   - Sync context files across branches
   - Keep documentation current

2. **Context Maintenance:**
   - Document discoveries in learnings
   - Update patterns as code evolves
   - Maintain review guidelines

3. **Security:**
   - Use SSH for private repositories
   - Regularly rotate SSH keys
   - Keep sensitive data in environment variables

### Development Workflow

1. **Branch Naming:**
   - Use descriptive branch names
   - Follow team conventions
   - Include ticket numbers if applicable

2. **Context Sharing:**
   - Share learnings across team
   - Document common patterns
   - Update review guidelines

3. **Integration:**
   - Leverage AI skills for efficiency
   - Use repository context for consistency
   - Automate repetitive tasks

## Configuration

### Environment Variables

```bash
# Repository management settings
REPOS_DEFAULT_BRANCH=main
REPOS_CLONE_DEPTH=1
REPOS_SSH_KEY_PATH=~/.ssh/id_ed25519

# Git configuration
GIT_USER_NAME="Your Name"
GIT_USER_EMAIL="your@email.com"
```

### Global Settings

```bash
# Set up global git configuration
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.editor "code --wait"
```

---

This repository management system provides a robust foundation for AI-assisted development workflows, with persistent context and flexible automation capabilities. 