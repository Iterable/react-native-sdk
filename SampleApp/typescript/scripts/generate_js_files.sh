#!/bin/sh

# This will generate js files from ts files.
# This is for dev use only. 

export sample_app_dir=`dirname $0`/..
cd $sample_app_dir
export sample_app_dir=`pwd`
export dest_dir=$sample_app_dir/../javascript
rm -rf js/
yarn build
rm -rf $dest_dir/js
mv js/ $dest_dir/
cp $sample_app_dir/package.json $dest_dir/package.json
cp $sample_app_dir/ios/Podfile $dest_dir/ios/Podfile
