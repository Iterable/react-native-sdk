#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Android build tests for all architectures...${NC}"

# Clean previous builds
echo "Cleaning previous builds..."
cd android
./gradlew clean

# Build for each architecture
echo -e "\n${GREEN}Building for arm64...${NC}"
./gradlew assembleArm64Debug
./gradlew assembleArm64Release

echo -e "\n${GREEN}Building for arm...${NC}"
./gradlew assembleArmDebug
./gradlew assembleArmRelease

echo -e "\n${GREEN}Building for x86...${NC}"
./gradlew assembleX86Debug
./gradlew assembleX86Release

echo -e "\n${GREEN}Building for x86_64...${NC}"
./gradlew assembleX86_64Debug
./gradlew assembleX86_64Release

# Run tests for each architecture
echo -e "\n${GREEN}Running tests for all architectures...${NC}"
./gradlew testArm64DebugUnitTest
./gradlew testArmDebugUnitTest
./gradlew testX86DebugUnitTest
./gradlew testX86_64DebugUnitTest

# Check build outputs
echo -e "\n${GREEN}Checking build outputs...${NC}"
BUILD_DIR="build/outputs/aar"
if [ -d "$BUILD_DIR" ]; then
    echo "Build outputs found in $BUILD_DIR:"
    ls -l $BUILD_DIR
else
    echo -e "${RED}No build outputs found!${NC}"
    exit 1
fi

echo -e "\n${GREEN}Android build tests completed successfully!${NC}"
