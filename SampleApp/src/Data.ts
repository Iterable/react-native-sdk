export type Coffee = {
    name: string
    icon: any
    subtitle: string
}

export const coffees: Array<Coffee> = [{
    name: 'Black Coffee',
    icon: require('../img/black-coffee.png'),
    subtitle: 'Black coffee is great for weight loss'
}, {
    name: 'Cappuccino',
    icon: require('../img/cappuccino.png'),
    subtitle: 'It is tasty'
}, {
    name: 'Mocha',
    icon: require('../img/mocha.png'),
    subtitle: 'Indulge yourself'
},
]

