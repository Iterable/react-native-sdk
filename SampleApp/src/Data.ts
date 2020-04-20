export type Coffee = {
    id: string
    name: string
    icon: any
    subtitle: string
}

export const coffees: Array<Coffee> = [{
    id: "black",
    name: 'Black Coffee',
    icon: require('../img/black-coffee.png'),
    subtitle: 'Black coffee is great for weight loss'
}, {
    id: "cappuccino",
    name: 'Cappuccino',
    icon: require('../img/cappuccino.png'),
    subtitle: 'It is tasty'
}, {
    id: 'mocha',
    name: 'Mocha',
    icon: require('../img/mocha.png'),
    subtitle: 'Indulge yourself'
},
]

