import { Iterable } from '@iterable/react-native-sdk';
import { useMemo, useState } from 'react';
import { Alert, Pressable, Switch, Text, TextInput } from 'react-native';

import { CodeBlock } from '../../CodeBlock';
import JSONInput from '../../JSONInput';
import { NumberInput } from '../../NumberInput';
import { formStyles } from '../Apis.styles';

export const TrackPushOpenWithCampaignId = () => {
  const [campaignId, setCampaignId] = useState<number | undefined>(123);
  const [templateId, setTemplateId] = useState<number | undefined>(456);
  const [messageId, setMessageId] = useState<string | undefined>();
  const [appAlreadyRunning, setAppAlreadyRunning] = useState<boolean>(false);
  const [dataFields, setDataFields] = useState<
    Record<string, unknown> | undefined
  >({});

  const codeString = useMemo(() => {
    return `
Iterable.trackPushOpenWithCampaignId(
    ${campaignId || 0},
    ${templateId || 0},
    "${messageId}",
    ${appAlreadyRunning},
    // NOTE: the below value will only update when the JSON is valid
    ${JSON.stringify(dataFields)}
);
    `;
  }, [campaignId, templateId, messageId, appAlreadyRunning, dataFields]);

  return (
    <>
      <Text style={formStyles.label}>Campaign Id</Text>
      <NumberInput
        value={campaignId}
        onChangeNumber={setCampaignId}
        placeholder="eg: 123456"
      />
      <Text style={formStyles.label}>Template Id</Text>
      <NumberInput
        value={templateId}
        onChangeNumber={setTemplateId}
        placeholder="eg: 123456"
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
      <Text style={formStyles.label}>App already running?</Text>
      <Switch
        style={formStyles.switch}
        value={appAlreadyRunning}
        onValueChange={setAppAlreadyRunning}
      />
      <Text style={formStyles.label}>Data Fields</Text>
      <JSONInput value={dataFields} onChangeJSON={setDataFields} />
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.trackPushOpenWithCampaignId(
            campaignId ?? 0,
            templateId ?? 0,
            messageId,
            appAlreadyRunning,
            dataFields
          );
          Alert.alert('Push Open Tracked');
          console.log(`Push open track with the following values:
            campaignId: ${campaignId}
            templateId: ${templateId}
            messageId: ${messageId}
            appAlreadyRunning: ${appAlreadyRunning}
            dataFields: ${JSON.stringify(dataFields)}
            `);
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
