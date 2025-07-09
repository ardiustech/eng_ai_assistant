# Architecture Guide

## System Overview

The AI Assistant automation framework is designed as a modular, extensible system for automating interactions with various tools and managing AI-assisted development workflows.

## Core Design Principles

### 1. **Modular Skills-Based Architecture**
- Each automation capability is encapsulated as a "skill"
- Skills are self-contained with their own dependencies, configuration, and context
- Easy to add, remove, or modify individual skills without affecting others

### 2. **Persistent Knowledge Accumulation**
- `.cursor/` directories store learnings, patterns, and context
- Knowledge persists across sessions and accumulates over time
- Failures and solutions are documented to prevent repeated mistakes

### 3. **Separation of Concerns**
- **Skills**: Tool-specific automation logic
- **Repository Management**: Code checkout and context management
- **Shared Libraries**: Common utilities and patterns
- **Documentation**: User guides and system knowledge

### 4. **Browser Session Management**
- Leverages existing authenticated browser sessions
- Avoids credential storage and complex authentication flows
- Enables manual intervention when automated flows fail

## Directory Architecture

```
eng_ai_assistant/
├── .cursor/                 # Root-level system learnings
├── docs/                    # System documentation
├── lib/                     # Shared libraries and utilities
├── repos/                   # Repository management system
│   ├── {repo-name}/        # Individual repository contexts
│   │   ├── .cursor/        # Repo-specific learnings
│   │   ├── code/           # Code checkouts (gitignored)
│   │   └── scripts/        # Repo-specific scripts
│   └── *.sh               # Management scripts
├── skills/                  # Automation skills collection
│   ├── {skill-name}/       # Individual skill modules
│   │   ├── .cursor/        # Skill-specific context
│   │   ├── *.js           # Skill implementation
│   │   ├── config.js      # Configuration
│   │   ├── test-connection.js # Health check
│   │   └── README.md      # Skill documentation
│   └── _templates/         # Skill creation templates
└── tmp/                    # Temporary files (regularly cleaned)
```

## Key Components

### Skills System

#### Skill Structure
Each skill follows a standardized structure:

```
skills/{skill-name}/
├── .cursor/
│   ├── learnings.md        # Accumulated knowledge and gotchas
│   ├── automation-rules.md # Step-by-step automation procedures
│   ├── best-practices.md   # Proven patterns and approaches
│   └── prompts.md         # AI agent prompts and templates
├── config.js              # Environment and configuration
├── test-connection.js     # Health check and validation
├── {main-script}.js       # Primary automation logic
├── package.json           # Dependencies (if needed)
└── README.md             # User documentation
```

#### Skill Types

**1. Web-Based Skills** (e.g., Slack, Google Docs)
- Use browser automation via Microsoft Edge remote debugging
- Leverage existing authenticated sessions
- Handle complex UI interactions and state management

**2. API-Based Skills** (e.g., JIRA)
- Direct API integration with token-based authentication
- Structured data exchange
- Rate limiting and error handling

**3. Documentation Skills** (e.g., Code Review, Feature Development)
- Guidance and methodology without executable automation
- Context-aware prompts and best practices
- Integration patterns with other skills

### Repository Management System

#### Purpose
- Manage multiple repository checkouts for AI-assisted development
- Provide consistent context and script management
- Support both branch-based development and PR-based code reviews

#### Structure
```
repos/{repo-name}/
├── .cursor/
│   ├── learnings.md        # Repo-specific discoveries
│   ├── code-patterns.md    # Architecture and pattern notes
│   ├── review-guidelines.md # Code review standards
│   └── agent-notes.md     # AI agent context and preferences
├── code/                   # Gitignored code checkouts
│   ├── main/              # Main branch checkout
│   ├── pr-{number}/       # PR-specific checkouts
│   └── {branch-name}/     # Feature branch checkouts
└── scripts/               # Repo-specific automation scripts
```

#### Management Scripts
- **`setup-branch.sh`**: Clone and set up branch checkouts
- **`setup-pr.sh`**: Clone and set up PR checkouts with PR context
- **`update-repo.sh`**: Update existing checkouts
- **`list-repos.sh`**: Display all configured repositories and checkouts

### Persistent Learning System

#### Three-Level Learning Hierarchy

**1. Root Level** (`.cursor/learnings.md`)
- General tool usage patterns
- Cross-cutting concerns and discoveries
- Authentication and access patterns
- Common debugging techniques

**2. Skill Level** (`skills/{skill}/.cursor/`)
- Tool-specific automation patterns
- API quirks and limitations
- UI automation techniques
- Error patterns and solutions

**3. Repository Level** (`repos/{repo}/.cursor/`)
- Codebase-specific patterns
- Team conventions and standards
- Architecture decisions
- Review guidelines and preferences

#### Learning Categories

**Learnings** (`learnings.md`)
- Discovered patterns and behaviors
- Gotchas and unexpected issues
- Performance considerations
- Integration insights

**Automation Rules** (`automation-rules.md`)
- Step-by-step procedures
- Decision trees and conditionals
- Error handling workflows
- Setup and configuration steps

**Best Practices** (`best-practices.md`)
- Proven approaches and patterns
- Quality standards and guidelines
- Security and privacy considerations
- Maintenance and operational practices

**Prompts** (`prompts.md`)
- AI agent templates and examples
- Context-setting instructions
- Task-specific guidance
- Integration workflows

### Shared Library System

#### Browser Helper (`lib/browser-helper.js`)
- Microsoft Edge remote debugging integration
- Session management and lifecycle
- Page creation and cleanup
- Error handling and retry logic

#### Common Patterns
- Configuration management
- Input validation
- Error handling
- File operations
- Process management

## Data Flow Architecture

### Skill Execution Flow
```
1. Agent Request
   ↓
2. Skill Selection & Configuration
   ↓
3. Environment Validation
   ↓
4. Resource Initialization (browser, API clients)
   ↓
5. Operation Execution
   ↓
6. Result Processing & Validation
   ↓
7. Context Updates & Learning Capture
   ↓
8. Resource Cleanup
   ↓
9. Response to Agent
```

### Repository Workflow
```
1. Repository Setup Request
   ↓
2. Authentication & Access Validation  
   ↓
3. Clone/Checkout Operations
   ↓
4. Context Initialization (.cursor/ setup)
   ↓
5. Script and Template Installation
   ↓
6. Verification & Testing
   ↓
7. Ready for AI-Assisted Operations
```

## Integration Patterns

### Cross-Skill Integration
- **Data Exchange**: JSON-based structured output
- **Browser Sharing**: Reuse authenticated sessions across skills
- **Context Sharing**: Cross-reference learnings and patterns
- **Workflow Chaining**: Output of one skill feeds into another

### External System Integration
- **Authentication**: Leverage existing user sessions and tokens
- **API Integration**: RESTful APIs with proper error handling
- **File System**: Temporary files for data exchange and debugging
- **Process Management**: Graceful startup, execution, and cleanup

## Security Considerations

### Credential Management
- **No Stored Credentials**: Leverage existing authenticated sessions
- **Environment Variables**: Sensitive data in `.env` files (gitignored)
- **Manual Authentication**: Guide users through secure login flows
- **Session Isolation**: Browser sessions maintain security boundaries

### Data Handling
- **Temporary Files**: Cleaned up after operations
- **Sensitive Content**: Proper handling of confidential information
- **Access Controls**: Respect system and application permissions
- **Audit Trail**: Operation logging for accountability

## Scalability and Performance

### Modular Design Benefits
- **Independent Scaling**: Skills can be optimized individually
- **Resource Isolation**: Skills don't interfere with each other
- **Selective Loading**: Only load needed skills and dependencies
- **Parallel Execution**: Multiple skills can run concurrently

### Performance Considerations
- **Browser Resource Management**: Proper tab and session cleanup
- **Memory Usage**: Minimize long-lived objects and references
- **File System**: Regular cleanup of temporary files
- **Network Optimization**: Efficient API usage and caching

## Error Handling Strategy

### Three-Level Error Handling

**1. Operational Errors**
- Network timeouts and connectivity issues
- Authentication failures and session expiration
- API rate limiting and service unavailability

**2. Logical Errors**
- Invalid input or configuration
- Unexpected UI states or API responses
- Data validation and processing failures

**3. System Errors**
- Browser crashes or connection failures
- File system permissions and storage issues
- Resource exhaustion and system limits

### Recovery Patterns
- **Retry Logic**: Exponential backoff for transient failures
- **Graceful Degradation**: Fallback to simpler approaches
- **Manual Intervention**: Guide users through complex scenarios
- **State Recovery**: Resume operations from checkpoint data

## Extension Points

### Adding New Skills
1. Create skill directory structure
2. Implement core automation logic
3. Add configuration and testing
4. Document learnings and best practices
5. Create integration templates

### Enhancing Existing Skills
1. Update automation rules and learnings
2. Add new operation modes or capabilities
3. Improve error handling and recovery
4. Optimize performance and reliability
5. Expand integration patterns

### System-Level Extensions
1. Add new shared libraries and utilities
2. Enhance repository management capabilities
3. Improve cross-skill integration patterns
4. Add monitoring and observability features
5. Enhance security and privacy controls

## Monitoring and Observability

### Health Checking
- **Skill Health**: Regular connectivity and functionality tests
- **System Health**: Resource usage and availability monitoring
- **Integration Health**: Cross-skill communication validation

### Performance Monitoring
- **Operation Timing**: Track skill execution times
- **Resource Usage**: Monitor memory, CPU, and storage
- **Error Rates**: Track failure patterns and recovery success

### Learning Analytics
- **Knowledge Growth**: Track accumulation of learnings
- **Pattern Recognition**: Identify common issues and solutions
- **Optimization Opportunities**: Find areas for improvement

---

This architecture enables a robust, extensible system for AI-assisted automation while maintaining simplicity, security, and reliability. 