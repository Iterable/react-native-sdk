#!/bin/bash

set -euxo
export SDK_DIR=$(cd `dirname "$0"`/.. && pwd)
cd $SDK_DIR

unalias -a
ls docs | grep -v _config.yml | xargs rm -rf
typedoc --out out_folder/ ts/
cp docs/_config.yml out_folder/
rm -rf docs/
mv out_folder/ docs/
