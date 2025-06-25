# React Native New Architecture Support

This document explains the setup for React Native's new architecture (Fabric and TurboModules) for the Iterable React Native SDK.

## Overview

The new architecture introduces:
- **TurboModules**: A new way to create native modules with better performance
- **Fabric**: A new rendering system for React Native components
- **Codegen**: Automatic code generation from TypeScript spec files

## Spec Files Created

### 1. TypeScript Spec (`src/RNIterableSpec.ts`)
This file defines the interface between JavaScript and native code. It includes:
- All method signatures with proper TypeScript types
- Promise-based async methods
- Proper null handling for optional parameters

### 2. Android Spec (`android/src/main/java/com/iterable/reactnative/RNIterableAPISpec.java`)
This abstract class defines the interface for the Android implementation:
- Extends `TurboModule` instead of `ReactContextBaseJavaModule`
- Contains abstract method declarations for all native methods
- Properly typed parameters and return values

### 3. C++ Spec (`cpp/RNIterableAPISpec.h`)
This header file defines the C++ interface for the new architecture:
- Uses JSI (JavaScript Interface) for direct JavaScript-C++ communication
- Defines virtual methods for all native functionality
- Part of the TurboModule system

## Configuration Updates

### Package.json Changes
The `codegenConfig` has been updated to include:
- Spec file references for both iOS and Android
- Proper module naming and type definitions
- Platform-specific configurations

## Migration Steps

### 1. Update Native Modules
- Android: `RNIterableAPIModule` now extends `RNIterableAPISpec`
- iOS: The existing implementation will work with the new spec
- Remove `getName()` method from Android module (not needed in new architecture)

### 2. Build Configuration
To enable the new architecture:

```bash
# For Android
cd android && ./gradlew clean && cd ..
npx react-native run-android --new-arch

# For iOS
cd ios && xcodebuild clean && cd ..
npx react-native run-ios --new-arch
```

### 3. Metro Configuration
Ensure Metro is configured for the new architecture:

```javascript
// metro.config.js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
    unstable_enableSymlinks: true,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

## Benefits of New Architecture

1. **Better Performance**: Direct JSI communication reduces bridge overhead
2. **Type Safety**: Strong typing between JavaScript and native code
3. **Code Generation**: Automatic code generation reduces manual work
4. **Future-Proof**: Aligns with React Native's roadmap

## Testing

To test the new architecture:

1. Build the library with new architecture enabled
2. Test all existing functionality
3. Verify performance improvements
4. Check for any breaking changes

## Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all spec files are properly configured
2. **Type Errors**: Check TypeScript spec file for correct types
3. **Runtime Errors**: Verify native implementations match spec interfaces

### Debugging

- Use React Native's debugging tools
- Check Metro bundler logs
- Verify codegen output in build directories

## Next Steps

1. Test thoroughly with the new architecture
2. Update documentation for users
3. Consider adding Fabric components if needed
4. Monitor performance improvements
