#!/bin/bash

set -euxo pipefail
export SDK_DIR=$(cd `dirname "$0"`/.. && pwd)
cd $SDK_DIR
export VERSION=`sed -nE 's/"version": "([[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+)",/\1/p' package.json | xargs`
export MAJOR_VERSION=$(echo $VERSION | cut -d'.' -f1)
export MIDDLE_VERSION=$(echo $VERSION | cut -d'.' -f2)
export MINOR_VERSION=$(echo $VERSION | cut -d'.' -f3)

export NEXT_VERSION=$MAJOR_VERSION.$MIDDLE_VERSION.$((MINOR_VERSION+1))

sed -Ei '' "s/\"version\": \"[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+\",/\"version\": \"$NEXT_VERSION\",/" package.json

npm run build
npm publish
