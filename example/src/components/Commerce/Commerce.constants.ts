import type { ImageProps } from 'react-native';

export type CommerceItem = {
  id: string;
  name: string;
  icon: ImageProps['source'];
  subtitle: string;
  price: number;
};

export const items: CommerceItem[] = [
  {
    id: 'black',
    name: 'Black Coffee',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    icon: require('./img/black-coffee.png'),
    subtitle: 'Maximize health benefits',
    price: 2.53,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    icon: require('./img/cappuccino.png'),
    subtitle: 'Tasty and creamy',
    price: 3.56,
  },
  {
    id: 'mocha',
    name: 'Mocha',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    icon: require('./img/mocha.png'),
    subtitle: 'Indulge yourself',
    price: 4.98,
  },
];
