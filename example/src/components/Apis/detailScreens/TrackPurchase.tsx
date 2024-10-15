import { useMemo, useState } from 'react';
import { Alert, Pressable, Text } from 'react-native';

import { Iterable, IterableCommerceItem } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import JSONInput from '../../JSONInput';
import { NumberInput } from '../../NumberInput';
import { formStyles } from '../Apis.styles';

export const TrackPurchase = () => {
  const [total, setTotal] = useState<number | undefined>(1000);
  const [dataFields, setDataFields] = useState<
    Record<string, unknown> | undefined
  >({});

  const codeString = useMemo(() => {
    return `
const items = [
  new IterableCommerceItem('id1', 'item_name', 123.456, 789),
  new IterableCommerceItem('id2', 'item_name_2', 1000, 1),
  new IterableCommerceItem(
    'id3',
    'New Commerce Item',
    299,
    2,
    'SKUString',
    'This is the third test item',
    'www.google.com',
    'www.placekitten.com/300/400',
    ['shopping', 'travel']
  ),
];

Iterable.trackPurchase(
  ${total ?? 0},
  items,
  // dataFiels will only update when the JSON is valid
  ${JSON.stringify(dataFields)},
);
`;
  }, [total, dataFields]);

  return (
    <>
      <Text style={formStyles.label}>Campaign Id</Text>
      <NumberInput
        value={total}
        onChangeNumber={setTotal}
        placeholder="eg: 123456"
      />
      <Text style={formStyles.label}>Data Fields</Text>
      <JSONInput value={dataFields} onChangeJSON={setDataFields} />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} style={{ height: 410 }} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          const items = [
            new IterableCommerceItem('id1', 'item_name', 123.456, 789),
            new IterableCommerceItem('id2', 'item_name_2', 1000, 1),
            new IterableCommerceItem(
              'id3',
              'New Commerce Item',
              299,
              2,
              'SKUString',
              'This is the third test item',
              'www.google.com',
              'www.placekitten.com/300/400',
              ['shopping', 'travel']
            ),
          ];

          Iterable.trackPurchase(total || 0, items, dataFields);
          Alert.alert('Track Purchase', 'Track Purchase called');
          console.log(`
Track Purchase called with the following parameters:
total: ${total}
items: ${JSON.stringify(items)}
dataFields: ${JSON.stringify(dataFields)}
          `);
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
