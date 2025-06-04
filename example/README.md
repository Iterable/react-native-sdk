# Iterable React Native SDK Example

This example app demonstrates how to use the Iterable React Native SDK with both the old and new architectures.

## Architecture Support

The SDK supports both the old architecture (Paper) and the new architecture (Fabric/TurboModules):

### Old Architecture (Paper)
- Uses the traditional React Native bridge
- Compatible with all React Native versions
- No additional configuration needed

### New Architecture (Fabric/TurboModules)
- iOS: Uses Fabric for native components
- Android: Uses TurboModules for native modules
- Requires React Native 0.70.0 or later
- Requires additional configuration

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Configure the SDK:
```typescript
// Initialize with your API key
Iterable.initialize('YOUR_API_KEY');

// Set up event listeners
Iterable.onInAppReceived((message) => {
  console.log('In-app message received:', message);
});
```

3. Build for specific architecture:

For old architecture:
```bash
# iOS
yarn ios

# Android
yarn android
```

For new architecture:
```bash
# iOS
yarn ios --new-arch

# Android
yarn android --new-arch
```

## Key Features

### User Management
```typescript
// Set user email
await Iterable.setEmail('user@example.com');

// Get current email
const email = await Iterable.getEmail();

// Update user data
Iterable.updateUser({
  firstName: 'John',
  lastName: 'Doe',
  customField: 'customValue'
});
```

### Event Tracking
```typescript
// Track custom event
Iterable.trackEvent('button_clicked', {
  buttonName: 'track_event',
  timestamp: new Date().toISOString()
});
```

### In-App Messages
```typescript
// Get in-app messages
const messages = await Iterable.getInAppMessages();

// Show in-app message
await Iterable.showMessage(messageId, true);
```

### Inbox Messages
```typescript
// Get inbox messages
const messages = await Iterable.getInboxMessages();

// Mark message as read
Iterable.setReadForMessage(messageId, true);

// Remove message
Iterable.removeMessage(messageId, location, deleteSource);
```

## Architecture-Specific Features

### New Architecture (Fabric/TurboModules)

1. Better Performance:
   - Direct communication between JS and native
   - Reduced bridge overhead
   - Improved startup time

2. Type Safety:
   - Better TypeScript support
   - Compile-time type checking
   - Improved developer experience

3. Native Components:
   - iOS: Fabric-powered native components
   - Android: TurboModule-powered native modules

### Old Architecture (Paper)

1. Wider Compatibility:
   - Works with all React Native versions
   - No additional configuration needed
   - Stable and well-tested

2. Simpler Setup:
   - No architecture-specific code
   - Standard React Native bridge
   - Familiar development experience

## Troubleshooting

1. Build Issues:
   - Clean build folders: `yarn clean`
   - Rebuild: `yarn build:all`
   - Check architecture flags in `package.json`

2. Runtime Issues:
   - Check console logs
   - Verify API key
   - Ensure proper initialization

3. Architecture-Specific Issues:
   - Verify architecture flags
   - Check native module registration
   - Review build configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
