[**@iterable/react-native-sdk v2.0.0-alpha**](../README.md) • **Docs**

***

[@iterable/react-native-sdk v2.0.0-alpha](../globals.md) / IterableInboxDataModel

# Class: IterableInboxDataModel

## Constructors

### new IterableInboxDataModel()

> **new IterableInboxDataModel**(): [`IterableInboxDataModel`](IterableInboxDataModel.md)

#### Returns

[`IterableInboxDataModel`](IterableInboxDataModel.md)

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:26](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L26)

## Properties

### comparatorFn()?

> `optional` **comparatorFn**: (`message1`, `message2`) => `number`

#### Parameters

• **message1**: [`IterableInAppMessage`](IterableInAppMessage.md)

• **message2**: [`IterableInAppMessage`](IterableInAppMessage.md)

#### Returns

`number`

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:20](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L20)

***

### dateMapperFn()?

> `optional` **dateMapperFn**: (`message`) => `undefined` \| `string`

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

#### Returns

`undefined` \| `string`

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:24](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L24)

***

### filterFn()?

> `optional` **filterFn**: (`message`) => `boolean`

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

#### Returns

`boolean`

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:19](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L19)

## Methods

### deleteItemById()

> **deleteItemById**(`id`, `deleteSource`): `void`

#### Parameters

• **id**: `string`

• **deleteSource**: [`IterableInAppDeleteSource`](../enumerations/IterableInAppDeleteSource.md)

#### Returns

`void`

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:71](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L71)

***

### endSession()

> **endSession**(`visibleRows`): `Promise`\<`void`\>

#### Parameters

• **visibleRows**: [`InboxImpressionRowInfo`](../type-aliases/InboxImpressionRowInfo.md)[] = `[]`

#### Returns

`Promise`\<`void`\>

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:94](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L94)

***

### getFormattedDate()

> **getFormattedDate**(`message`): `undefined` \| `string`

#### Parameters

• **message**: [`IterableInAppMessage`](IterableInAppMessage.md)

#### Returns

`undefined` \| `string`

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:41](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L41)

***

### getHtmlContentForMessageId()

> **getHtmlContentForMessageId**(`id`): `Promise`\<[`IterableHtmlInAppContent`](IterableHtmlInAppContent.md)\>

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<[`IterableHtmlInAppContent`](IterableHtmlInAppContent.md)\>

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:53](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L53)

***

### refresh()

> **refresh**(): `Promise`\<[`InboxRowViewModel`](../type-aliases/InboxRowViewModel.md)[]\>

#### Returns

`Promise`\<[`InboxRowViewModel`](../type-aliases/InboxRowViewModel.md)[]\>

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:77](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L77)

***

### set()

> **set**(`filter`?, `comparator`?, `dateMapper`?): `void`

#### Parameters

• **filter?**

• **comparator?**

• **dateMapper?**

#### Returns

`void`

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:28](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L28)

***

### setMessageAsRead()

> **setMessageAsRead**(`id`): `void`

#### Parameters

• **id**: `string`

#### Returns

`void`

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:65](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L65)

***

### startSession()

> **startSession**(`visibleRows`): `void`

#### Parameters

• **visibleRows**: [`InboxImpressionRowInfo`](../type-aliases/InboxImpressionRowInfo.md)[] = `[]`

#### Returns

`void`

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:90](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L90)

***

### updateVisibleRows()

> **updateVisibleRows**(`visibleRows`): `void`

#### Parameters

• **visibleRows**: [`InboxImpressionRowInfo`](../type-aliases/InboxImpressionRowInfo.md)[] = `[]`

#### Returns

`void`

#### Defined in

[inbox/classes/IterableInboxDataModel.ts:99](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/inbox/classes/IterableInboxDataModel.ts#L99)
