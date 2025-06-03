#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required tools
echo -e "${YELLOW}Checking required tools...${NC}"

# Check for Android tools
if ! command_exists adb; then
    echo -e "${RED}Error: adb not found. Please install Android SDK Platform Tools.${NC}"
    exit 1
fi

# Check for iOS tools
if ! command_exists xcodebuild; then
    echo -e "${RED}Error: xcodebuild not found. Please install Xcode Command Line Tools.${NC}"
    exit 1
fi

# Make scripts executable
chmod +x scripts/build-android.sh
chmod +x scripts/build-ios.sh

# Run Android builds
echo -e "\n${GREEN}Starting Android builds...${NC}"
./scripts/build-android.sh

# Run iOS builds
echo -e "\n${GREEN}Starting iOS builds...${NC}"
./scripts/build-ios.sh

echo -e "\n${GREEN}All builds completed successfully!${NC}"
