#!/bin/sh

set -euxo
export IT_DIR=$(cd `dirname "$0"`/.. && pwd)
cd $IT_DIR

rm -rf node_modules/
# You should not have to delete yarn.lock. If you do, uncomment the following line.
rm -rf yarn.lock 
yarn install
cd ios/
rm -rf Podfile.lock
rm -rf Pods/
rm -rf *.xcworkspace/
rm -rf ~/Library/Caches/CocoaPods
rm -rf build/
pod install



