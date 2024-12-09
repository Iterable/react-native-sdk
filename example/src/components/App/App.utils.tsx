import Icon from 'react-native-vector-icons/Ionicons';

export const getIcon = (name: string, props: Record<string, unknown>) => (
  <Icon name={name} {...props} />
);
