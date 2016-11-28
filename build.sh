#!/bin/bash
branch_name="$(git symbolic-ref HEAD 2>/dev/null)" ||
    branch_name="(unnamed branch)"     # detached HEAD

branch_name=${branch_name##refs/heads/}
git checkout -b "build-${branch_name}-`date -I`"
cordova platform add android
cordova build android
ionic run android
