[**@iterable/react-native-sdk v2.0.0-alpha**](../README.md) • **Docs**

***

[@iterable/react-native-sdk v2.0.0-alpha](../globals.md) / IterableInAppMessage

# Class: IterableInAppMessage

Iterable in-app message

## Constructors

### new IterableInAppMessage()

> **new IterableInAppMessage**(`messageId`, `campaignId`, `trigger`, `createdAt`, `expiresAt`, `saveToInbox`, `inboxMetadata`, `customPayload`, `read`, `priorityLevel`): [`IterableInAppMessage`](IterableInAppMessage.md)

#### Parameters

• **messageId**: `string`

• **campaignId**: `number`

• **trigger**: [`IterableInAppTrigger`](IterableInAppTrigger.md)

• **createdAt**: `undefined` \| `Date`

• **expiresAt**: `undefined` \| `Date`

• **saveToInbox**: `boolean`

• **inboxMetadata**: `undefined` \| [`IterableInboxMetadata`](IterableInboxMetadata.md)

• **customPayload**: `any`

• **read**: `boolean`

• **priorityLevel**: `number`

#### Returns

[`IterableInAppMessage`](IterableInAppMessage.md)

#### Defined in

[inApp/classes/IterableInAppMessage.ts:62](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L62)

## Properties

### campaignId

> `readonly` **campaignId**: `number`

the campaign ID for this message

#### Defined in

[inApp/classes/IterableInAppMessage.ts:20](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L20)

***

### createdAt?

> `readonly` `optional` **createdAt**: `Date`

when was this message created

#### Defined in

[inApp/classes/IterableInAppMessage.ts:30](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L30)

***

### customPayload?

> `readonly` `optional` **customPayload**: `any`

Custom Payload for this message.

#### Defined in

[inApp/classes/IterableInAppMessage.ts:50](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L50)

***

### expiresAt?

> `readonly` `optional` **expiresAt**: `Date`

when to expire this in-app (undefined means do not expire)

#### Defined in

[inApp/classes/IterableInAppMessage.ts:35](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L35)

***

### inboxMetadata?

> `readonly` `optional` **inboxMetadata**: [`IterableInboxMetadata`](IterableInboxMetadata.md)

Metadata such as title, subtitle etc. needed to display this in-app message in inbox.

#### Defined in

[inApp/classes/IterableInAppMessage.ts:45](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L45)

***

### messageId

> `readonly` **messageId**: `string`

the ID for the in-app message

#### Defined in

[inApp/classes/IterableInAppMessage.ts:15](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L15)

***

### priorityLevel

> `readonly` **priorityLevel**: `number`

the priority value this in-app message has

#### Defined in

[inApp/classes/IterableInAppMessage.ts:60](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L60)

***

### read

> `readonly` **read**: `boolean`

Whether this inbox message has been read

#### Defined in

[inApp/classes/IterableInAppMessage.ts:55](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L55)

***

### saveToInbox

> `readonly` **saveToInbox**: `boolean`

Whether to save this message to inbox

#### Defined in

[inApp/classes/IterableInAppMessage.ts:40](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L40)

***

### trigger

> `readonly` **trigger**: [`IterableInAppTrigger`](IterableInAppTrigger.md)

when to trigger this in-app

#### Defined in

[inApp/classes/IterableInAppMessage.ts:25](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L25)

## Methods

### isSilentInbox()

> **isSilentInbox**(): `boolean`

#### Returns

`boolean`

#### Defined in

[inApp/classes/IterableInAppMessage.ts:103](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L103)

***

### fromDict()

> `static` **fromDict**(`dict`): [`IterableInAppMessage`](IterableInAppMessage.md)

#### Parameters

• **dict**: `any`

#### Returns

[`IterableInAppMessage`](IterableInAppMessage.md)

#### Defined in

[inApp/classes/IterableInAppMessage.ts:111](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L111)

***

### fromViewToken()

> `static` **fromViewToken**(`viewToken`): [`IterableInAppMessage`](IterableInAppMessage.md)

#### Parameters

• **viewToken**: `ViewToken`\<`any`\>

#### Returns

[`IterableInAppMessage`](IterableInAppMessage.md)

#### Defined in

[inApp/classes/IterableInAppMessage.ts:86](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inApp/classes/IterableInAppMessage.ts#L86)
