import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import JSONTree from 'react-native-json-tree';

import { colors, input } from '../constants';

const styles = StyleSheet.create({
  input: {
    ...input,
    height: 'auto',
    textAlignVertical: 'top',
    marginBottom: 0,
  },
  inputError: { borderColor: colors.borderDestructive },
  errorText: {
    color: colors.textDestructive,
    fontSize: 12,
    lineHeight: 16,
  },
  jsonTree: {
    marginTop: 5,
    marginBottom: input.marginBottom,
  },
});

interface JSONInputProps extends Omit<TextInputProps, 'value'> {
  value?: Record<string, unknown> | undefined;
  onChangeJSON?: (value: Record<string, unknown> | undefined) => void;
  onError?: (error: unknown) => void;
}

const createObjectFromString = (
  str: string = '',
  handleSuccess: (obj: Record<string, unknown>) => void = () => {},
  handleError: (err: any) => void = () => {}
) => {
  try {
    handleSuccess(JSON.parse(str.replace(/”|“/g, '"')));
  } catch (error) {
    handleError(error);
  }
};

const createStringFromObject = (
  obj: Record<string, unknown> = {},
  handleSuccess: (obj: string) => void = () => {},
  handleError: (err: any) => void = () => {}
) => {
  try {
    handleSuccess(JSON.stringify(obj, null, 2));
  } catch (error) {
    handleError(error);
  }
};

export const JSONInput = ({
  value,
  onChangeJSON = () => {},
  onChangeText = () => {},
  onError = () => {},
  style = {},
}: JSONInputProps) => {
  const [stringValue, setStringValue] = useState<string | undefined>();
  const [jsonValue, setJsonValue] = useState<
    Record<string, unknown> | undefined
  >();
  const [hasParsingError, setHasParsingError] = useState<boolean>(false);

  const handleOnChangeText = (str: string) => {
    setStringValue(str);
    onChangeText(str);
    createObjectFromString(
      str,
      (obj) => {
        onChangeJSON(obj);
        setJsonValue(obj);
        setHasParsingError(false);
      },
      (err) => {
        onError(err);
        setHasParsingError(true);
      }
    );
  };

  useEffect(() => {
    if (typeof value === 'object') {
      setJsonValue(value);
      createStringFromObject(value, setStringValue);
    }
  }, [value]);

  return (
    <>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.input, style, hasParsingError && styles.inputError]}
        value={stringValue}
        onChangeText={handleOnChangeText}
      />
      {hasParsingError && <Text style={styles.errorText}>Invalid JSON</Text>}
      <View style={styles.jsonTree}>
        <JSONTree data={jsonValue ?? {}} />
      </View>
    </>
  );
};

export default JSONInput;
