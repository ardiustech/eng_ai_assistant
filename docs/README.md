# AI Assistant Automation Framework Documentation

Welcome to the documentation for the AI Assistant automation framework - a comprehensive system for automating development workflows and tool interactions.

## 📚 Documentation Index

### **Getting Started**
- **[Getting Started Guide](getting-started.md)** - Quick setup and first steps
- **[Architecture Overview](architecture.md)** - System design and principles
- **[Installation & Setup](getting-started.md#quick-setup)** - Prerequisites and configuration

### **Core Concepts**
- **[Skills System](architecture.md#skills-system)** - Automation modules and capabilities
- **[Repository Management](repository-management.md)** - Multi-repo development workflows
- **[Persistent Learning](architecture.md#persistent-learning-system)** - Knowledge accumulation

### **User Guides**
- **[Repository Management](repository-management.md)** - Managing code checkouts and contexts
- **[Creating Skills](creating-skills.md)** - Building new automation capabilities
- **[Skill Integration](architecture.md#integration-patterns)** - Cross-skill workflows

### **Developer Resources**
- **[Creating Skills Guide](creating-skills.md)** - Comprehensive skill development
- **[Architecture Deep Dive](architecture.md)** - Technical implementation details
- **[API Reference](../lib/browser-helper.js)** - Shared libraries and utilities

## 🎯 Quick Navigation

### **I want to...**

**🚀 Get started quickly**
→ [Getting Started Guide](getting-started.md)

**🔧 Set up a repository for code review**
→ [Repository Management: Code Review Workflow](repository-management.md#code-review-workflow)

**💡 Create a new automation skill**
→ [Creating Skills Guide](creating-skills.md)

**📋 Review pull requests with AI assistance**
→ [Code Review Skill](../skills/code-review/README.md)

**🛠️ Automate development workflows**
→ [Feature Development Skill](../skills/feature-development/README.md)

**🔍 Understand the system architecture**
→ [Architecture Guide](architecture.md)

**❓ Troubleshoot issues**
→ [Troubleshooting Section](getting-started.md#troubleshooting)

## 📖 Documentation Structure

```
docs/
├── README.md              # This file - documentation index
├── getting-started.md     # Quick setup and first steps
├── architecture.md        # System design and principles
├── creating-skills.md     # Building new automation skills
└── repository-management.md # Managing code repositories
```

## 🎨 Framework Overview

The AI Assistant automation framework provides:

### **🔧 Skills-Based Automation**
- **Web-based skills** for browser automation (Slack, Google Docs)
- **API-based skills** for service integration (JIRA, GitHub)
- **Documentation skills** for process guidance (Code Review, Development)

### **📁 Repository Management**
- Multi-repository support with persistent context
- Branch and PR checkout workflows
- AI-friendly development environments
- Automated setup and maintenance scripts

### **🧠 Persistent Learning**
- Accumulating knowledge across sessions
- Skill-specific and repository-specific learnings
- Automated pattern recognition and documentation
- Error prevention through historical context

### **🔄 Integration Capabilities**
- Cross-skill data sharing and workflows
- Browser session management for authenticated operations
- Standardized interfaces for consistent automation
- Extensible architecture for new capabilities

## 🛠️ Available Skills

### **Production Skills**
- **[Gusto Slack](../skills/gusto-slack/README.md)** - Slack automation and messaging
- **[Gusto JIRA](../skills/gusto-jira/README.md)** - JIRA integration and ticket management
- **[Google Docs](../skills/google-docs/README.md)** - Document automation and content extraction

### **Development Skills**
- **[Code Review](../skills/code-review/README.md)** - AI-assisted code review workflows
- **[Feature Development](../skills/feature-development/README.md)** - Development process automation

## 🔧 Repository Management

### **Current Repositories**
- **[Mithrin](../repos/mithrin/)** - Main development repository
- *(Additional repositories can be added using setup scripts)*

### **Management Commands**
```bash
# Setup new repository
./repos/setup-branch.sh git@github.com:org/repo.git main

# Setup PR for review
./repos/setup-pr.sh git@github.com:org/repo.git 123

# List all repositories
./repos/list-repos.sh

# Update existing repository
./repos/update-repo.sh repo-name
```

## 🚀 Common Workflows

### **Code Review Workflow**
1. **Setup PR**: `./repos/setup-pr.sh git@github.com:org/repo.git 123`
2. **Navigate**: `cd repos/repo/code/pr-123`
3. **Review**: Use AI code review skill with repository context
4. **Document**: Update learnings and patterns

### **Feature Development Workflow**
1. **Setup Branch**: `./repos/setup-branch.sh git@github.com:org/repo.git feature/name`
2. **Development**: Use AI development skills with established patterns
3. **Testing**: Run repository-specific test scripts
4. **Integration**: Follow established CI/CD workflows

### **Skill Development Workflow**
1. **Create Structure**: Follow [skill template](creating-skills.md#step-1-create-skill-directory-structure)
2. **Implement Logic**: Add core automation functionality
3. **Document Learning**: Create comprehensive `.cursor/` documentation
4. **Test Integration**: Verify cross-skill compatibility

## 🎯 Best Practices

### **For Users**
- **Read the getting started guide** before beginning
- **Use repository context** for consistent development
- **Document discoveries** in appropriate learnings files
- **Follow established patterns** for predictable results

### **For Developers**
- **Study existing skills** before creating new ones
- **Use standardized patterns** for consistency
- **Implement comprehensive error handling**
- **Document all learnings and gotchas**

### **For Teams**
- **Share learnings** across team members
- **Establish team-specific patterns** in repository context
- **Regular maintenance** of documentation and scripts
- **Integration with existing workflows**

## 🔍 Troubleshooting

### **Common Issues**
- **Authentication failures**: Check SSH keys and tokens
- **Browser connection issues**: Verify Edge debugging setup
- **Repository access**: Ensure proper permissions and SSH configuration
- **Skill connectivity**: Validate environment variables and API access

### **Getting Help**
1. **Check documentation** for your specific use case
2. **Review learnings files** for known issues and solutions
3. **Examine existing patterns** in similar skills or repositories
4. **Consult architecture guide** for system-level understanding

## 🔗 Quick Links

### **Documentation**
- [Getting Started](getting-started.md) | [Architecture](architecture.md) | [Creating Skills](creating-skills.md) | [Repository Management](repository-management.md)

### **Skills**
- [Code Review](../skills/code-review/README.md) | [Feature Development](../skills/feature-development/README.md) | [Gusto Slack](../skills/gusto-slack/README.md) | [Gusto JIRA](../skills/gusto-jira/README.md) | [Google Docs](../skills/google-docs/README.md)

### **Context & Learning**
- [Root Learnings](../.cursor/learnings.md) | [Mithrin Context](../repos/mithrin/.cursor/) | [Slack Learnings](../skills/gusto-slack/.cursor/learnings.md)

---

**Ready to get started?** 🚀 Begin with the [Getting Started Guide](getting-started.md) and explore the powerful automation capabilities of the AI Assistant framework! 