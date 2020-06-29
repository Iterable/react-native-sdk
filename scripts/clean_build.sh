#!/bin/sh

set -euxo
export BASE_DIR=$(cd `dirname "$0"`/.. && pwd)
cd $BASE_DIR

rm -rf node_modules/
rm -rf yarn.lock

yarn install
rm -rf js/ && tsc

