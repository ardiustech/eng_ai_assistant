#!/bin/bash

# Helper script for agents to update existing repo checkouts
# Usage: ./update-repo.sh <repo-name>

set -e

if [ $# -ne 1 ]; then
    echo "Usage: $0 <repo-name>"
    echo "Example: $0 myrepo"
    exit 1
fi

REPO_NAME=$1
REPO_DIR="repos/$REPO_NAME"

if [ ! -d "$REPO_DIR" ]; then
    echo "Error: Repository '$REPO_NAME' not found in repos/ directory"
    exit 1
fi

echo "Updating all checkouts for repo '$REPO_NAME'..."

# Update all branches and PRs
for CODE_DIR in "$REPO_DIR"/code/*/; do
    if [ -d "$CODE_DIR" ]; then
        CHECKOUT_NAME=$(basename "$CODE_DIR")
        echo "Updating $CHECKOUT_NAME..."
        
        cd "$CODE_DIR"
        
        # Check if it's a PR or branch
        if [[ "$CHECKOUT_NAME" == pr-* ]]; then
            # It's a PR
            PR_NUMBER=${CHECKOUT_NAME#pr-}
            git fetch origin pull/$PR_NUMBER/head:pr-$PR_NUMBER
            git checkout pr-$PR_NUMBER
        else
            # It's a branch
            git fetch origin
            git checkout "$CHECKOUT_NAME"
            git pull origin "$CHECKOUT_NAME"
        fi
        
        cd - > /dev/null
        echo "Updated $CHECKOUT_NAME"
    fi
done

echo "Successfully updated all checkouts for repo '$REPO_NAME'" 