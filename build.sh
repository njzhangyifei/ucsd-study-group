#!/bin/bash
git checkout -b "build-`date -I`"
cordova platform add android
cordova build android
ionic run android
