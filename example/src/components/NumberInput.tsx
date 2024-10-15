import { useMemo } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { input } from '../constants';

const styles = StyleSheet.create({
  input,
});

const getNumberFromString = (str: string) => {
  try {
    if (str.length === 0) return undefined;
    const num = parseInt(str.replace(/\D/g, ''), 10);
    return Number.isNaN(num) ? 0 : num;
  } catch {
    return undefined;
  }
};

interface NumberInputProps extends Omit<TextInputProps, 'value'> {
  value?: number;
  onChangeNumber?: (value: number | undefined) => void;
}

export const NumberInput = ({
  value,
  onChangeNumber = () => {},
  style = {},
  ...props
}: NumberInputProps) => {
  const valueInput = useMemo(
    () => (typeof value === 'number' ? String(value) : undefined),
    [value]
  );

  return (
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      inputMode="numeric"
      {...props}
      style={[styles.input, style]}
      value={valueInput}
      onChangeText={(x) => onChangeNumber(getNumberFromString(x))}
    />
  );
};

export default NumberInput;
