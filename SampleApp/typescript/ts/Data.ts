export interface Coffee {
  id: string
  name: string
  icon: any
  subtitle: string
}

export const coffees: Coffee[] = [{
  id: 'black',
  name: 'Black Coffee',
  icon: require('../img/black-coffee.png'),
  subtitle: 'It\'s great for weight loss'
}, {
  id: 'cappuccino',
  name: 'Cappuccino',
  icon: require('../img/cappuccino.png'),
  subtitle: 'It is tasty'
}, {
  id: 'mocha',
  name: 'Mocha',
  icon: require('../img/mocha.png'),
  subtitle: 'Indulge yourself'
}
]
