import { useMemo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
// @ts-ignore
import SyntaxHighlighter from 'react-native-syntax-highlighter';
// @ts-ignore
import { atomOneDark } from 'react-syntax-highlighter/styles/hljs';

export interface CodeBlockProps {
  codeString: string;
  style?: StyleProp<ViewStyle>;
  height?: number;
}

export const CodeBlock = ({
  codeString,
  style = {},
  height = 200,
}: CodeBlockProps) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        codeContainer: {
          height,
          marginBottom: 10,
        },
      }),
    [height]
  );

  return (
    <View style={[styles.codeContainer, style]}>
      <SyntaxHighlighter
        language="typescript"
        style={atomOneDark}
        highlighter={'hljs'}
      >
        {codeString}
      </SyntaxHighlighter>
    </View>
  );
};
