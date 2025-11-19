import { Image, View } from 'react-native';
import type { Route } from '../../constants/routes';

export const getIcon = (name: Route, props: Record<string, unknown>) => {
  const { color, size = 25 } = props;

  return (
    <View style={{ height: size as number, width: size as number }}>
      <Image
        source={{ width: size as number, height: size as number, uri: name }}
        tintColor={color as string}
        resizeMode="contain"
        style={{
          width: size as number,
          height: size as number,
        }}
        fadeDuration={0}
        height={size as number}
        width={size as number}
        resizeMethod="scale"
      />
    </View>
  );
};
