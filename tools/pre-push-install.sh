#!/bin/bash

dir=`pwd`
while [ ! -d "$dir/.git" ]; do
    dir=`dirname $dir`
    if [ "$dir" == "/" ]; then
        echo "Cannot find .git directory."
        exit 1
    fi
done

if [ -e "$dir/.git/hooks/pre-push" ]; then
    echo "A pre-push hook is already installed."
else
    ln -s "$dir/tools/git-pre-push" "$dir/.git/hooks/pre-push"
    chmod +x "$dir/tools/git-pre-push"
    echo "Git pre-push hook installed."
fi
