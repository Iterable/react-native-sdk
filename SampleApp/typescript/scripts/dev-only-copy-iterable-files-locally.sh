#!/bin/sh

# This will manually copy react-native-sdk files from top folder to the right place for sample-app.
# This is for dev use only. 

export sample_app_dir=`dirname $0`/..
cd $sample_app_dir
export sample_app_dir=`pwd`
export sdk_dir=$sample_app_dir/..
export dest_dir=$sample_app_dir/node_modules/@iterable/react-native-sdk
echo "sample_app_dir = $sample_app_dir"
echo "sdk_dir = $sdk_dir"
echo "dest_dir = $dest_dir"

cd $sdk_dir
pwd
npm run build

cd $sample_app_dir
pwd
rm -rf $dest_dir
mkdir -p $dest_dir/js
cp $sdk_dir/js/* $dest_dir/js/
cp $sdk_dir/*.podspec $dest_dir/
cp $sdk_dir/package.json $dest_dir/
cp -r $sdk_dir/ios $dest_dir/ios/
cp -r $sdk_dir/android $dest_dir/android/
