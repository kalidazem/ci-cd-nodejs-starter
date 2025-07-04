#!/bin/bash
VERSION=$(jq -r .version package.json)
echo "::set-output name=version::$VERSION"
echo ${VERSION}