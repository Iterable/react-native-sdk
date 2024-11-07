[**@iterable/react-native-sdk v2.0.0-alpha**](../README.md) • **Docs**

***

[@iterable/react-native-sdk v2.0.0-alpha](../globals.md) / Iterable

# Class: Iterable

## Constructors

### new Iterable()

> **new Iterable**(): [`Iterable`](Iterable.md)

#### Returns

[`Iterable`](Iterable.md)

## Properties

### inAppManager

> `static` **inAppManager**: [`IterableInAppManager`](IterableInAppManager.md)

#### Defined in

[core/classes/Iterable.ts:29](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L29)

***

### logger

> `static` **logger**: [`IterableLogger`](IterableLogger.md)

#### Defined in

[core/classes/Iterable.ts:31](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L31)

***

### savedConfig

> `static` **savedConfig**: [`IterableConfig`](IterableConfig.md)

#### Defined in

[core/classes/Iterable.ts:33](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L33)

## Methods

### disableDeviceForCurrentUser()

> `static` **disableDeviceForCurrentUser**(): `void`

This static method disables the device's token for the current user.

parameters: none

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:203](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L203)

***

### getAttributionInfo()

> `static` **getAttributionInfo**(): `Promise`\<`undefined` \| [`IterableAttributionInfo`](IterableAttributionInfo.md)\>

This static method returns the attribution information stored.
The attribution information contains the campaign ID, template ID, and message ID of the message
that prompted the user to recently click a link.
See IterableAttributionInfo class defined above.

Iterable.getAttributionInfo returns a promise that resolves to an IterableAttributionInfo object.
Use the keyword `then` to get the result of the promise.

parameters: none

#### Returns

`Promise`\<`undefined` \| [`IterableAttributionInfo`](IterableAttributionInfo.md)\>

#### Defined in

[core/classes/Iterable.ts:236](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L236)

***

### getEmail()

> `static` **getEmail**(): `Promise`\<`undefined` \| `string`\>

This static method returns the email associated with the current user.
Iterable.getEmail returns a promise. Use the keyword `then` to get the result of the promise.

parameters: none

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[core/classes/Iterable.ts:138](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L138)

***

### getLastPushPayload()

> `static` **getLastPushPayload**(): `Promise`\<`any`\>

This static method returns the payload of the last push notification with which the user
opened the application (by clicking an action button, etc.).

Iterable.getLastPushPayload returns a promise. Use the keyword `then` to get the result of the promise.

Parameters: none

#### Returns

`Promise`\<`any`\>

#### Defined in

[core/classes/Iterable.ts:218](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L218)

***

### getUserId()

> `static` **getUserId**(): `Promise`\<`undefined` \| `string`\>

This static method returns the userId associated with the current user.
Iterable.getUserId returns a promise. Use the keyword `then` to get the result of the promise.

parameters: none

#### Returns

`Promise`\<`undefined` \| `string`\>

#### Defined in

[core/classes/Iterable.ts:191](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L191)

***

### handleAppLink()

> `static` **handleAppLink**(`link`): `Promise`\<`boolean`\>

This static method handles a universal link whether it is internal to the application or an external link.
HandleAppLink will hand the passed in URL to IterableConfig.urlHandler, where it is determined whether or not
the app can handle the clicked URL.

#### Parameters

• **link**: `string`

URL link to be handled

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[core/classes/Iterable.ts:498](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L498)

***

### inAppConsume()

> `static` **inAppConsume**(`message`, `location`, `source`): `void`

This static method removes the specifed message from the current user's message queue.
Also, creates an in-app delete event for the specified message on the current user's profile
unless otherwise specifed (specifying a source of IterableInAppDeleteSource.unknown prevents
an inAppDelete event from being created).

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

[core/classes/Iterable.ts:427](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L427)

***

### initialize()

> `static` **initialize**(`apiKey`, `config`): `Promise`\<`boolean`\>

This static method is used to initialize the React Native SDK in your app's Javascript or Typescript code.

Pass in a mobile API key distributed with the mobile app.
Warning: never user server-side API keys with the React Native SDK, mobile API keys have minimal access for security purposes.

Pass in an IterableConfig object with the various customization properties setup.

Note: Use Iterable.initialize and NOT Iterable.initialize2, as Iterable.initialize2 is only used internally.

#### Parameters

• **apiKey**: `string`

mobile API key provided with the application

• **config**: [`IterableConfig`](IterableConfig.md) = `...`

config object with various properties

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[core/classes/Iterable.ts:49](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L49)

***

### initialize2()

> `static` **initialize2**(`apiKey`, `config`, `apiEndPoint`): `Promise`\<`boolean`\>

DO NOT CALL THIS METHOD.
This method is used internally to connect to staging environment.

#### Parameters

• **apiKey**: `string`

• **config**: [`IterableConfig`](IterableConfig.md) = `...`

• **apiEndPoint**: `string`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[core/classes/Iterable.ts:69](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L69)

***

### setAttributionInfo()

> `static` **setAttributionInfo**(`attributionInfo`?): `void`

This static method manually sets the current attribution information stored.
The attribution information contains the campaign ID, template ID, and message ID of the message
that prompted the user to recently click a link.
See IterableAttributionInfo class defined above.

For deep link clicks, Iterable sets attribution information automatically.
However, use this method to set it manually if ever necessary.

#### Parameters

• **attributionInfo?**: [`IterableAttributionInfo`](IterableAttributionInfo.md)

object storing current attribution info

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:265](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L265)

***

### setEmail()

> `static` **setEmail**(`email`?, `authToken`?): `void`

This static method associates the current user with the passed in email parameter.

Iterable's React Native SDK persists the user across app sessions and restarts, until you manually change the user using
Iterable.setEmail or Iterable.setUserId.

User profile creation:

If your Iterable project does not have a user with the passed in email, setEmail creates one and adds the email address
to the user's Iterable profile.

Registering device token:

If IterableConfig.autoPushRegisteration is set to true, calling setEmail automatically registers the device for push
notifications and sends the deviceId and token to Iterable.

Optional JWT token parameter:

An optional valid, pre-fetched JWT can be passed in to avoid race conditions.
The SDK uses this JWT to authenticate API requests for this user.

Signing out a user from the SDK:

To tell the SDK to sign out the current user, pass null into Iterable.setEmail.
If IterableConfig.autoPushRegisteration is set to true, calling Iterable.setEmail(null) prevents Iterable from sending further
push notifications to that user, for that app, on that device.
On the user's Iterable profile, endpointEnabled is set to false for the device.

Note: specify a user by calling Iterable.setEmail or Iterable.setUserId, but NOT both.

#### Parameters

• **email?**: `null` \| `string`

email address to associate with the current user

• **authToken?**: `null` \| `string`

valid, pre-fetched JWT the SDK can use to authenticate API requests, optional - if null/undefined, no JWT related action will be taken

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:125](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L125)

***

### setUserId()

> `static` **setUserId**(`userId`?, `authToken`?): `void`

This static method associates the current user with the passed in userId parameter.

Iterable's React Native SDK persists the user across app sessions and restarts, until you manually change the user using
Iterable.setEmail or Iterable.setUserId.

User profile creation:

If your Iterable project does not have a user with the passed in UserId, setUserId creates one and adds a placeholder email
address to the user's Iterable profile.

Registering device token:

If IterableConfig.autoPushRegisteration is set to true, calling setUserId automatically registers the device for push
notifications and sends the deviceId and token to Iterable.

Optional JWT token parameter:

An optional valid, pre-fetched JWT can be passed in to avoid race conditions.
The SDK uses this JWT to authenticate API requests for this user.

Signing out a user from the SDK:

To tell the SDK to sign out the current user, pass null into Iterable.setUserId.
If IterableConfig.autoPushRegisteration is set to true, calling Iterable.setUserId(null) prevents Iterable from sending further
push notifications to that user, for that app, on that device.
On the user's Iterable profile, endpointEnabled is set to false for the device.

Note: specify a user by calling Iterable.setEmail or Iterable.setUserId, but NOT both.

parameters:

#### Parameters

• **userId?**: `null` \| `string`

user ID to associate with the current user
optional parameter:

• **authToken?**: `null` \| `string`

valid, pre-fetched JWT the SDK can use to authenticate API requests, optional - if null/undefined, no JWT related action will be taken

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:178](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L178)

***

### trackEvent()

> `static` **trackEvent**(`name`, `dataFields`): `void`

This static method creates a custom event to the current user's Iterable profile.
Pass in the name of the event stored in eventName key and the data associated with the event.
The eventType is set to "customEvent".

#### Parameters

• **name**: `string`

the eventName of the custom event

• **dataFields**: `any`

descriptive data to store on the custom event

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:445](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L445)

***

### trackInAppClick()

> `static` **trackInAppClick**(`message`, `location`, `clickedUrl`): `void`

This static method creates an inAppClick event for the specified message on the current user's profile
for manual tracking purposes. Iterable's SDK automatically tracks in-app message clicks when you use the
SDK's default rendering. Click events refer to click events within the in-app message to distinguish
from inAppOpen events.

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

the in-app message (an IterableInAppMessage object)

• **location**: [`IterableInAppLocation`](../enumerations/IterableInAppLocation.md)

the location of the in-app message (an IterableInAppLocation enum)

• **clickedUrl**: `string`

the URL clicked by the user

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:379](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L379)

***

### trackInAppClose()

> `static` **trackInAppClose**(`message`, `location`, `source`, `clickedUrl`?): `void`

This static method creates an inAppClose event for the specified message on the current user's profile
for manual tracking purposes. Iterable's SDK automatically tracks in-app message close events when you use the
SDK's default rendering.

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

the in-app message (an IterableInAppMessage object)

• **location**: [`IterableInAppLocation`](../enumerations/IterableInAppLocation.md)

the location of the in-app message (an IterableInAppLocation enum)

• **source**: [`IterableInAppCloseSource`](../enumerations/IterableInAppCloseSource.md)

the way the in-app was closed (an IterableInAppCloseSource enum)

• **clickedUrl?**: `string`

the URL clicked by the user

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:400](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L400)

***

### trackInAppOpen()

> `static` **trackInAppOpen**(`message`, `location`): `void`

This static method creates an inAppOpen event for the specified message on the current user's profile
for manual tracking purposes. Iterable's SDK automatically tracks in-app message opens when you use the
SDK's default rendering.

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

the in-app message (an IterableInAppMessage object)

• **location**: [`IterableInAppLocation`](../enumerations/IterableInAppLocation.md)

the location of the in-app message (an IterableInAppLocation enum)

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:359](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L359)

***

### trackPurchase()

> `static` **trackPurchase**(`total`, `items`, `dataFields`): `void`

This static method creates a purchase event on the current user's Iterable profile.
Represent each item in the purchase event with an IterableCommerceItem object.
See IterableCommerceItem class defined above.

Note: total is a parameter that is passed in. Iterable does not sum the price fields of the various items in the purchase event.

#### Parameters

• **total**: `number`

the total cost of the purchase

• **items**: [`IterableCommerceItem`](IterableCommerceItem.md)[]

the items included in the purchase

• **dataFields**: `any`

descriptive data to store on the purchase event

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:340](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L340)

***

### trackPushOpenWithCampaignId()

> `static` **trackPushOpenWithCampaignId**(`campaignId`, `templateId`, `messageId`, `appAlreadyRunning`, `dataFields`): `void`

This static method creates a pushOpen event on the current user's Iterable profile,
populating it with data provided to the method call.

#### Parameters

• **campaignId**: `number`

the ID of the campaign to associate with the push open

• **templateId**: `number`

the ID of the template to associate with the push open

• **messageId**: `undefined` \| `string`

the ID of the message to associate with the push open

• **appAlreadyRunning**: `boolean`

whether or not the app was already running when the push notification arrived

• **dataFields**: `any`

information to store with the push open event

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:282](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L282)

***

### updateCart()

> `static` **updateCart**(`items`): `void`

This static method updates the items saved in the shopping cart (or equivalent).
Represent each item in the updateCart event with an IterableCommerceItem object.
See IterableCommerceItem class defined above.

#### Parameters

• **items**: [`IterableCommerceItem`](IterableCommerceItem.md)[]

the items added to the shopping cart

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:308](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L308)

***

### updateEmail()

> `static` **updateEmail**(`email`, `authToken`?): `void`

This static method changes the value of the email field on the current user's Iterable profile.

If Iterable.setUserId was used to identify the current user, Iterable.updateEmail can be called to
give the current user a real (non-placeholder) email address.

An optional valid, pre-fetched JWT can be passed in to avoid race conditions.
The SDK uses this JWT to authenticate API requests for this user.

#### Parameters

• **email**: `string`

the new email to set

• **authToken?**: `string`

the new auth token (JWT) to set with the new email, optional - if null/undefined, no JWT-related action will be taken

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:484](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L484)

***

### updateSubscriptions()

> `static` **updateSubscriptions**(`emailListIds`, `unsubscribedChannelIds`, `unsubscribedMessageTypeIds`, `subscribedMessageTypeIds`, `campaignId`, `templateId`): `void`

This static method updates the current user's subscribed email lists, unsubscribed channel IDs,
unsubscribed message type IDs (for opt-out message types), and subscribed message type IDs (for opt-in message types)
on the current user's profile.

pass in null for any of emailListIds, unsubscribedChannelIds, unsubscribedMessageTypeIds, or subscribedMessageTypeIds
to indicate that Iterable should not change the current value on the current user's profile.

#### Parameters

• **emailListIds**: `undefined` \| `number`[]

the list of email lists (by ID) to which the user should be subscribed

• **unsubscribedChannelIds**: `undefined` \| `number`[]

the list of message channels (by ID) to which the user should be unsubscribed

• **unsubscribedMessageTypeIds**: `undefined` \| `number`[]

the list of message types (by ID) to which the user should be unsubscribed (for opt-out message types)

• **subscribedMessageTypeIds**: `undefined` \| `number`[]

the list of message types (by ID) to which the user should be subscribed (for opt-in message types)

• **campaignId**: `number`

the campaign ID to associate with events generated by this request, use -1 if unknown or not applicable

• **templateId**: `number`

the template ID to associate with events generated by this request, use -1 if unknown or not applicable

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:520](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L520)

***

### updateUser()

> `static` **updateUser**(`dataFields`, `mergeNestedObjects`): `void`

This static method saves data to the current user's Iterable profile.

If mergeNestedObjects is set to true, top-level objects in the passed in dataFields parameter
are merged with their counterparts that already exist on the user's profile.
Otherwise, they are added.

If mergeNestedObjects is set to false, the top-level objects in the passed in dataFields parameter
overwrite their counterparts that already exist on the user's profile.
Otherwise, they are added.

#### Parameters

• **dataFields**: `any`

data fields to store in user profile

• **mergeNestedObjects**: `boolean`

flag indicating whether to merge top-level objects

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:465](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L465)

***

### wakeApp()

> `static` **wakeApp**(): `void`

This static method launches the application from the background for Android devices.

parameters: none

#### Returns

`void`

#### Defined in

[core/classes/Iterable.ts:320](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/Iterable.ts#L320)
