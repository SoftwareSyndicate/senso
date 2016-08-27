#!/bin/bash

echo "Building..."

# build a standalone executable with jspm
jspm bundle-sfx src/main.js dist/app.js

# copy dist to gh-pages
echo "Copying dist to gh-pages..."
cp dist/app.js gh-pages/
cp dist/app.js.map gh-pages/
