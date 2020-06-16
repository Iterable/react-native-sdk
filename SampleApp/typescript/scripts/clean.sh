#!/bin/sh

set -euxo
export BASE_DIR=$(cd `dirname "$0"`/.. && pwd)
cd $BASE_DIR

rm -rf node_modules/
rm -rf yarn.lock
yarn install
cd ios/
rm -rf Podfile.lock
rm -rf Pods/
rm -rf ~/Library/Caches/CocoaPods
rm -rf build/
pod install
