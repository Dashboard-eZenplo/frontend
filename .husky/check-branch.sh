#!/bin/sh
current_branch=$(git symbolic-ref --short HEAD)

if [[ "$current_branch" =~ ^(feature|fix)/US-[0-9]+ ]] || [[ "$current_branch" =~ ^(feature|fix)/NOUS ]]; then
    echo "Branch name follows the format: 'feature/US-Number-description' or 'fix/US-Number-description' or 'feature/NOUS' or 'fix/NOUS' - Push successful"
    exit 0
else
    echo "Error - Branch name does not follow the required format: 'feature/US-Number-description' or 'fix/US-Number-description' or 'feature/NOUS' or 'fix/NOUS'"
    exit 1
fi
