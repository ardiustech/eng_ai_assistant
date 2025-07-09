#!/bin/bash

# Helper script for agents to checkout a specific branch from a repo
# Usage: ./setup-branch.sh <repo-url> <branch-name>

set -e

if [ $# -ne 2 ]; then
    echo "Usage: $0 <repo-url> <branch-name>"
    echo "Example: $0 https://github.com/user/repo.git main"
    exit 1
fi

REPO_URL=$1
BRANCH_NAME=$2

# Extract repo name from URL
REPO_NAME=$(basename "$REPO_URL" .git)

# Create directory structure
REPO_DIR="repos/$REPO_NAME"
CODE_DIR="$REPO_DIR/code/$BRANCH_NAME"
CURSOR_DIR="$REPO_DIR/.cursor"
SCRIPTS_DIR="$REPO_DIR/scripts"

echo "Setting up branch '$BRANCH_NAME' for repo '$REPO_NAME'..."

# Create directories
mkdir -p "$CURSOR_DIR"
mkdir -p "$SCRIPTS_DIR"

# Initialize .cursor directory with templates if it doesn't exist
if [ ! -f "$CURSOR_DIR/learnings.md" ]; then
    echo "# Learnings for $REPO_NAME" > "$CURSOR_DIR/learnings.md"
    echo "" >> "$CURSOR_DIR/learnings.md"
    echo "## Key Discoveries" >> "$CURSOR_DIR/learnings.md"
    echo "- Document important findings here" >> "$CURSOR_DIR/learnings.md"
    echo "" >> "$CURSOR_DIR/learnings.md"
    echo "## Gotchas" >> "$CURSOR_DIR/learnings.md"
    echo "- Note any tricky issues or edge cases" >> "$CURSOR_DIR/learnings.md"
fi

if [ ! -f "$CURSOR_DIR/code-patterns.md" ]; then
    echo "# Code Patterns for $REPO_NAME" > "$CURSOR_DIR/code-patterns.md"
    echo "" >> "$CURSOR_DIR/code-patterns.md"
    echo "## Architecture Notes" >> "$CURSOR_DIR/code-patterns.md"
    echo "- Document key architectural decisions" >> "$CURSOR_DIR/code-patterns.md"
    echo "" >> "$CURSOR_DIR/code-patterns.md"
    echo "## Common Patterns" >> "$CURSOR_DIR/code-patterns.md"
    echo "- Note recurring code patterns and conventions" >> "$CURSOR_DIR/code-patterns.md"
fi

if [ ! -f "$CURSOR_DIR/review-guidelines.md" ]; then
    echo "# Review Guidelines for $REPO_NAME" > "$CURSOR_DIR/review-guidelines.md"
    echo "" >> "$CURSOR_DIR/review-guidelines.md"
    echo "## Review Checklist" >> "$CURSOR_DIR/review-guidelines.md"
    echo "- [ ] Code follows project conventions" >> "$CURSOR_DIR/review-guidelines.md"
    echo "- [ ] Tests are included and passing" >> "$CURSOR_DIR/review-guidelines.md"
    echo "- [ ] Documentation is updated" >> "$CURSOR_DIR/review-guidelines.md"
    echo "" >> "$CURSOR_DIR/review-guidelines.md"
    echo "## Specific Guidelines" >> "$CURSOR_DIR/review-guidelines.md"
    echo "- Document repo-specific review practices" >> "$CURSOR_DIR/review-guidelines.md"
fi

if [ ! -f "$CURSOR_DIR/agent-notes.md" ]; then
    echo "# Agent Notes for $REPO_NAME" > "$CURSOR_DIR/agent-notes.md"
    echo "" >> "$CURSOR_DIR/agent-notes.md"
    echo "## Preferences" >> "$CURSOR_DIR/agent-notes.md"
    echo "- Document agent-specific preferences and settings" >> "$CURSOR_DIR/agent-notes.md"
    echo "" >> "$CURSOR_DIR/agent-notes.md"
    echo "## Automation Notes" >> "$CURSOR_DIR/agent-notes.md"
    echo "- Note any automation-specific considerations" >> "$CURSOR_DIR/agent-notes.md"
fi

# Clone the repo if it doesn't exist
if [ ! -d "$CODE_DIR" ]; then
    echo "Cloning repository..."
    git clone --branch "$BRANCH_NAME" "$REPO_URL" "$CODE_DIR"
else
    echo "Repository already exists, updating..."
    cd "$CODE_DIR"
    git fetch origin
    git checkout "$BRANCH_NAME"
    git pull origin "$BRANCH_NAME"
    cd - > /dev/null
fi

echo "Successfully set up branch '$BRANCH_NAME' for repo '$REPO_NAME'"
echo "Code location: $CODE_DIR"
echo "Context location: $CURSOR_DIR"
echo "Scripts location: $SCRIPTS_DIR" 