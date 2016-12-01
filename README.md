# UCSD Study Group

## Environment Setup

- Install node.js, make sure you have the latest version of `npm`
- Install packages by running `npm install`
- Install `ionic` and `cordova` by running `npm install -g ionic cordova`
    - Note: if you have previously installed `cordova`, it might be a good idea
    to uninstall if first.
- Run `ionic serve --lab`

## Build APK and Run with Android Virtual Device
- Run `./build.sh`
    - Note: the script will create a new branch `build-*-[date]`  from the
    current branch and build in the new branch.

## Run Tests
- Run `./runtest.sh`
    - Dependency: `python` and internet connection
    - Note: you will probably need to refresh your browser if you cannot see
    the webpage.
