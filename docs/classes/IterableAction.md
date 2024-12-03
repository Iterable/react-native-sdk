[**@iterable/react-native-sdk v2.0.0-alpha**](../README.md) • **Docs**

***

[@iterable/react-native-sdk v2.0.0-alpha](../globals.md) / IterableAction

# Class: IterableAction

IterableAction represents an action defined as a response to user events.
It is currently used in push notification actions (open push & action buttons).

## Constructors

### new IterableAction()

> **new IterableAction**(`type`, `data`?, `userInput`?): [`IterableAction`](IterableAction.md)

#### Parameters

• **type**: `string`

• **data?**: `string`

• **userInput?**: `string`

#### Returns

[`IterableAction`](IterableAction.md)

#### Defined in

[core/classes/IterableAction.ts:10](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableAction.ts#L10)

## Properties

### data?

> `optional` **data**: `string`

#### Defined in

[core/classes/IterableAction.ts:7](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableAction.ts#L7)

***

### type

> **type**: `string`

#### Defined in

[core/classes/IterableAction.ts:6](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableAction.ts#L6)

***

### userInput?

> `optional` **userInput**: `string`

#### Defined in

[core/classes/IterableAction.ts:8](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableAction.ts#L8)

## Methods

### fromDict()

> `static` **fromDict**(`dict`): [`IterableAction`](IterableAction.md)

#### Parameters

• **dict**: `any`

#### Returns

[`IterableAction`](IterableAction.md)

#### Defined in

[core/classes/IterableAction.ts:16](https://github.com/Iterable/react-native-sdk/blob/33a336d972ce3f91e45be0626b4337400455463a/src/core/classes/IterableAction.ts#L16)
