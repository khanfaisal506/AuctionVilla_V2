#!/bin/bash
set -e

echo "Step 1: Removing database files from git tracking..."
git rm -r --cached data/db/ 2>/dev/null || echo "Already untracked, skipping."

echo "Step 2: Committing the cleanup..."
git add .gitignore
git commit -m "Remove database files from git tracking" 2>/dev/null || echo "Nothing new to commit."

echo "Step 3: Pushing to GitHub..."
git push https://khanfaisal506:$GITHUB_PERSONAL_ACCESS_TOKEN@github.com/khanfaisal506/AuctionVilla.git main

echo "Done! Your project is now on GitHub."
