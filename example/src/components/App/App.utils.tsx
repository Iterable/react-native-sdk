import Icon from 'react-native-vector-icons/Ionicons';

export const getIcon = (name: string, props: Record<string, any>) => (
  <Icon name={name} {...props} />
);
