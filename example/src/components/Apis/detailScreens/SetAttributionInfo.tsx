import { Iterable, IterableAttributionInfo } from '@iterable/react-native-sdk';
import { useMemo, useState } from 'react';
import { Alert, Pressable, Text, TextInput } from 'react-native';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

export const SetAttributionInfo = () => {
  const [campaignId, setCampaignId] = useState<number | undefined>(123);
  const [templateId, setTemplateId] = useState<number | undefined>(456);
  const [messageId, setMessageId] = useState('');

  const codeString = useMemo(() => {
    return `
const info = new IterableAttributionInfo(
  ${campaignId || 0},
  ${templateId || 0},
  "${messageId}",
);

Iterable.setAttributionInfo(info);
    `;
  }, [campaignId, templateId, messageId]);

  const getNumberFromString = (str: string) => {
    return parseInt(str.replace(/\D/g, ''), 10);
  };

  return (
    <>
      <Text style={formStyles.label}>Campaign Id</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={(x) => setCampaignId(getNumberFromString(x))}
        value={campaignId ? String(campaignId) : undefined}
        placeholder="eg: 123456"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
      />
      <Text style={formStyles.label}>Template Id</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={(x) => setTemplateId(getNumberFromString(x))}
        value={templateId ? String(templateId) : undefined}
        placeholder="eg: 123456"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
      />
      <Text style={formStyles.label}>Message Id</Text>
      <TextInput
        style={formStyles.input}
        onChangeText={setMessageId}
        value={messageId}
        placeholder="eg: 123456"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          const info = new IterableAttributionInfo(
            campaignId || 0,
            templateId || 0,
            messageId
          );

          Iterable.setAttributionInfo(info);

          Alert.alert('Attribution info set:', JSON.stringify(info));
          console.log('Attribution info set:', info);
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
