#!/bin/bash

set -euxo
export SDK_DIR=$(cd `dirname "$0"`/.. && pwd)
cd $SDK_DIR

rm -rf tmp/
mkdir -v tmp/
cp docs/_config.yml tmp/
rm -rf docs/
typedoc --exclude **/ts/__mocks__/* --exclude **/ts/__tests__/* --out docs/ ts/
cp tmp/_config.yml docs/
rm -rf tmp/
