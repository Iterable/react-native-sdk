import { useMemo, useState } from 'react';
import { Alert, Pressable, Text, TextInput } from 'react-native';

import { Iterable } from '@iterable/react-native-sdk';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';
import NumberInput from '../../NumberInput';

const removeNonNumericExceptComma = (str: string) => str.replace(/[^\d,]/g, '');

const stringToNumberArray = (str: string) => {
  return removeNonNumericExceptComma(str)
    .split(',')
    .map((item) => Number(item))
    .filter((item) => !isNaN(item) && item !== 0);
};

const logArray = (name: string, arrString: string) =>
  console.log(
    name,
    stringToNumberArray(arrString),
    ...stringToNumberArray(arrString)
  );

export const UpdateSubscriptions = () => {
  const [emailListIds, setEmailListIds] = useState<string>('');
  const [unsubscribedChannelIds, setUnsubscribedChannelIds] =
    useState<string>('');
  const [unsubscribedMessageTypeIds, setUnsubscribedMessageTypeIds] =
    useState<string>('');
  const [subscribedMessageTypeIds, setSubscribedMessageTypeIds] =
    useState<string>('');
  const [campaignId, setCampaignId] = useState<number | undefined>();
  const [templateId, setTemplateId] = useState<number | undefined>();

  const codeString = useMemo(
    () =>
      `Iterable.updateSubscriptions(
  [${removeNonNumericExceptComma(emailListIds)}],
  [${removeNonNumericExceptComma(unsubscribedChannelIds)}],
  [${removeNonNumericExceptComma(unsubscribedMessageTypeIds)}],
  [${removeNonNumericExceptComma(subscribedMessageTypeIds)}],
  ${campaignId},
  ${templateId}
);`,
    [
      emailListIds,
      unsubscribedChannelIds,
      unsubscribedMessageTypeIds,
      subscribedMessageTypeIds,
      campaignId,
      templateId,
    ]
  );

  return (
    <>
      <Text style={formStyles.label}>Email List Ids</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={setEmailListIds}
        value={emailListIds}
        placeholder="eg: 36, 29, 492"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={formStyles.label}>Unsubscribed Channel Ids</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={setUnsubscribedChannelIds}
        value={unsubscribedChannelIds}
        placeholder="eg: 36, 29, 492"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={formStyles.label}>Unsubscribed Message Type Ids</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={setUnsubscribedMessageTypeIds}
        value={unsubscribedMessageTypeIds}
        placeholder="eg: 36, 29, 492"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={formStyles.label}>Subscribed Message Type Ids</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={setSubscribedMessageTypeIds}
        value={subscribedMessageTypeIds}
        placeholder="eg: 36, 29, 492"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={formStyles.label}>
        Campaign Id
        <Text style={formStyles.requiredStar}>*</Text>
      </Text>
      <NumberInput
        value={campaignId}
        onChangeNumber={setCampaignId}
        placeholder="eg: 1234"
      />
      <Text style={formStyles.label}>
        Template Id<Text style={formStyles.requiredStar}>*</Text>
      </Text>
      <NumberInput
        value={templateId}
        onChangeNumber={setTemplateId}
        placeholder="eg: 5678"
      />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          console.log(
            'emailListIds',
            emailListIds,
            stringToNumberArray(emailListIds)
          );
          if (!campaignId || !templateId) {
            Alert.alert(
              'Campaign Id and Template Id are required',
              'Please enter a valid Campaign Id and Template Id'
            );
            return;
          }

          Iterable.updateSubscriptions(
            stringToNumberArray(emailListIds),
            stringToNumberArray(unsubscribedChannelIds),
            stringToNumberArray(unsubscribedMessageTypeIds),
            stringToNumberArray(subscribedMessageTypeIds),
            campaignId,
            templateId
          );
          Alert.alert(
            '`Iterable.updateSubscriptions` called',
            'Check the console for more detail'
          );
          console.group('`Iterable.updateSubscription` called with:');
          logArray('emailListIds', emailListIds);
          logArray('unsubscribedChannelIds', unsubscribedChannelIds);
          logArray('unsubscribedMessageTypeIds', unsubscribedMessageTypeIds);
          logArray('subscribedMessageTypeIds', subscribedMessageTypeIds);
          console.log('campaignId', campaignId);
          console.log('templateId', templateId);
          console.groupEnd();
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
