#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting iOS build tests for all architectures...${NC}"

# Clean previous builds
echo "Cleaning previous builds..."
cd ios
xcodebuild clean -project RNIterableAPI.xcodeproj -scheme RNIterableAPI

# Build for each architecture
echo -e "\n${GREEN}Building for arm64 (iPhone)...${NC}"
xcodebuild build -project RNIterableAPI.xcodeproj -scheme RNIterableAPI -configuration Debug -sdk iphoneos VALID_ARCHS="arm64 arm64e" ONLY_ACTIVE_ARCH=NO
xcodebuild build -project RNIterableAPI.xcodeproj -scheme RNIterableAPI -configuration Release -sdk iphoneos VALID_ARCHS="arm64 arm64e" ONLY_ACTIVE_ARCH=NO

echo -e "\n${GREEN}Building for x86_64 (Simulator)...${NC}"
xcodebuild build -project RNIterableAPI.xcodeproj -scheme RNIterableAPI -configuration Debug -sdk iphonesimulator VALID_ARCHS="x86_64" ONLY_ACTIVE_ARCH=NO
xcodebuild build -project RNIterableAPI.xcodeproj -scheme RNIterableAPI -configuration Release -sdk iphonesimulator VALID_ARCHS="x86_64" ONLY_ACTIVE_ARCH=NO

# Run tests
echo -e "\n${GREEN}Running tests...${NC}"
xcodebuild test -project RNIterableAPI.xcodeproj -scheme RNIterableAPI -destination 'platform=iOS Simulator,name=iPhone 14,OS=latest'

# Check build outputs
echo -e "\n${GREEN}Checking build outputs...${NC}"
BUILD_DIR="build"
if [ -d "$BUILD_DIR" ]; then
    echo "Build outputs found in $BUILD_DIR:"
    find $BUILD_DIR -name "*.a" -type f
else
    echo -e "${RED}No build outputs found!${NC}"
    exit 1
fi

echo -e "\n${GREEN}iOS build tests completed successfully!${NC}"
