[**@iterable/react-native-sdk v2.0.0-alpha**](../README.md) • **Docs**

***

[@iterable/react-native-sdk v2.0.0-alpha](../globals.md) / IterableInAppManager

# Class: IterableInAppManager

IterableInAppManager is set up as the inAppManager property of an Iterable instance.

## Constructors

### new IterableInAppManager()

> **new IterableInAppManager**(): [`IterableInAppManager`](IterableInAppManager.md)

#### Returns

[`IterableInAppManager`](IterableInAppManager.md)

## Methods

### getHtmlContentForMessage()

> **getHtmlContentForMessage**(`message`): `Promise`\<[`IterableHtmlInAppContent`](IterableHtmlInAppContent.md)\>

This method returns HTML in-app content for a specified in-app message.
This method returns a Promise. Use `then` to get the HTML content returned as an IterableHtmlInAppContent object.

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

the in-app message (an IterableInAppMessage object)

#### Returns

`Promise`\<[`IterableHtmlInAppContent`](IterableHtmlInAppContent.md)\>

#### Defined in

[inApp/classes/IterableInAppManager.ts:105](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppManager.ts#L105)

***

### getInboxMessages()

> **getInboxMessages**(): `Promise`\<[`IterableInAppMessage`](IterableInAppMessage.md)[]\>

This method returns the current user's list of in-app messages designated for the mobile inbox stored in the local queue in the form of a promise.
Use `then` keyword to get the array of IterableInAppMessage objects marked as `saveToInbox`.

This method does not cause the application to immediately check for new in-app messages on the server, since the SDK keeps the message list in sync.

parameters: none

#### Returns

`Promise`\<[`IterableInAppMessage`](IterableInAppMessage.md)[]\>

#### Defined in

[inApp/classes/IterableInAppManager.ts:43](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppManager.ts#L43)

***

### getMessages()

> **getMessages**(): `Promise`\<[`IterableInAppMessage`](IterableInAppMessage.md)[]\>

This method returns the current user's list of in-app messages stored in the local queue in the form of a promise.
Use `then` keyword to get the array of IterableInAppMessage objects.

This method does not cause the application to immediately check for new in-app messages on the server, since the SDK keeps the message list in sync.

parameters: none

#### Returns

`Promise`\<[`IterableInAppMessage`](IterableInAppMessage.md)[]\>

#### Defined in

[inApp/classes/IterableInAppManager.ts:28](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppManager.ts#L28)

***

### removeMessage()

> **removeMessage**(`message`, `location`, `source`): `void`

This method removes the specifed message from the current user's message queue.
Also, this method calls the inAppConsume method internally.

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

the in-app message (an IterableInAppMessage object)

• **location**: [`IterableInAppLocation`](../enumerations/IterableInAppLocation.md)

the location of the in-app message (an IterableInAppLocation enum)

• **source**: [`IterableInAppDeleteSource`](../enumerations/IterableInAppDeleteSource.md)

how the in-app message was deleted (an IterableInAppDeleteSource enum)

#### Returns

`void`

#### Defined in

[inApp/classes/IterableInAppManager.ts:76](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppManager.ts#L76)

***

### setAutoDisplayPaused()

> **setAutoDisplayPaused**(`paused`): `void`

This method turns on or off automatic displaying of incoming in-app messages.
If set to false, the SDK will immediately retrieve and process in-app messages from the message queue.
The default value of isAutoDisplayPaused is false (in the native code).

#### Parameters

• **paused**: `boolean`

whether the automatic displaying should be paused

#### Returns

`void`

#### Defined in

[inApp/classes/IterableInAppManager.ts:120](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppManager.ts#L120)

***

### setReadForMessage()

> **setReadForMessage**(`message`, `read`): `void`

This method sets the read status of specified in-app message.

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

the in-app message (an IterableInAppMessage object)

• **read**: `boolean`

the boolean value indicating whether the in-app message was read

#### Returns

`void`

#### Defined in

[inApp/classes/IterableInAppManager.ts:92](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppManager.ts#L92)

***

### showMessage()

> **showMessage**(`message`, `consume`): `Promise`\<`undefined` \| `string`\>

This method renders an in-app message and consumes it from the user's message queue if necessary.

This method returns a Promise. Use `then` to get the string it returns, which corresponds to the URL
of the button or link the current user tapped in the in-app message to close it.

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

The message to show (an IterableInAppMessage object)

• **consume**: `boolean`

Whether or not the message should be consumed from the user's message queue after being shown. This should be defaulted to true.

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[inApp/classes/IterableInAppManager.ts:59](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppManager.ts#L59)
