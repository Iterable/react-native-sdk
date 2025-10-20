---
group: Guides
category: Guides
---

# Most Used Modules

The modules you are most likely to use are as follows:

## [IterableConfig](/classes/index.IterableConfig.html)
This class contains a variety of options that you are able to set for Iterables
React Native SDK.

It is used in conjunction with `Iterable` to initialize the repository.

```ts
const config = new IterableConfig({
  inAppDisplayInterval: 10.0,
  logLevel: IterableLogLevel.debug,
  urlHandler: (url, context) => {
    if (url.includes)
  }
});

// Initialize the SDK
Iterable.initialize(YOUR_API_KEY, config);
```

## [Iterable](/classes/index.Iterable.html)

The majority of the functionality you will need inside of Iterable is housed in
this class.

As specified in [`IterableConfig`](#IterableConfig), you can use this to
initialize the SDK:

```typescript
Iterable.initialize(YOUR_API_KEY, new IterableConfig());
```

`Iterable` contains a slew of methods, and the following helper classes:
- `Iterable.authManager` -- authentication functionality
- `Iterable.inAppManager` -- in-app message functionality
- `Iterable.track` -- tracking functionality
- `Iterable.user` -- functionality related to the current user
