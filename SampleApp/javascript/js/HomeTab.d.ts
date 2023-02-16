import { Component } from 'react'
import { Coffee } from './Data'
export declare interface Screens {
  Home: undefined
  Detail: {
    coffee: Coffee
  }
}
export default class HomeTab extends Component {
  constructor (props: Readonly<{}>)
  navigate (coffee: Coffee): void
  render (): JSX.Element
  private readonly homeScreenRef
}
