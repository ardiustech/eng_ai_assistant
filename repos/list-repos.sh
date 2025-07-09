#!/bin/bash

# Helper script for agents to list available repos and their checkouts
# Usage: ./list-repos.sh

echo "Available repositories and checkouts:"
echo "===================================="

if [ ! -d "repos" ]; then
    echo "No repos directory found."
    exit 0
fi

for REPO_DIR in repos/*/; do
    if [ -d "$REPO_DIR" ]; then
        REPO_NAME=$(basename "$REPO_DIR")
        echo ""
        echo "Repository: $REPO_NAME"
        echo "  Context: $REPO_DIR.cursor/"
        echo "  Checkouts:"
        
        # List all checkouts
        if [ -d "$REPO_DIR/code" ]; then
            for CODE_DIR in "$REPO_DIR"/code/*/; do
                if [ -d "$CODE_DIR" ]; then
                    CHECKOUT_NAME=$(basename "$CODE_DIR")
                    echo "    - $CHECKOUT_NAME ($CODE_DIR)"
                fi
            done
        else
            echo "    - No checkouts found"
        fi
        
        # Show context files
        if [ -d "$REPO_DIR/.cursor" ]; then
            echo "  Context files:"
            for CONTEXT_FILE in "$REPO_DIR"/.cursor/*.md; do
                if [ -f "$CONTEXT_FILE" ]; then
                    CONTEXT_NAME=$(basename "$CONTEXT_FILE")
                    echo "    - $CONTEXT_NAME"
                fi
            done
        fi
    fi
done

if [ $(find repos -maxdepth 1 -type d | wc -l) -eq 1 ]; then
    echo ""
    echo "No repositories found. Use setup-branch.sh or setup-pr.sh to create one."
fi 