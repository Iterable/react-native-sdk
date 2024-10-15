import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
// @ts-ignore
import SyntaxHighlighter from 'react-native-syntax-highlighter';
// @ts-ignore
import { atomOneDark } from 'react-syntax-highlighter/styles/hljs';

const styles = StyleSheet.create({
  codeContainer: {
    height: 200,
    marginBottom: 10,
  },
});

export interface CodeBlockProps {
  codeString: string;
  style?: StyleProp<ViewStyle>;
}

export const CodeBlock = ({ codeString, style = {} }: CodeBlockProps) => (
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
