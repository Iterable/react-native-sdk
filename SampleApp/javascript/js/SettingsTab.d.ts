import { Component } from 'react'
interface State {
  email?: string
  isLoggedIn: boolean
}
declare class SettingsTab extends Component<Props, State> {
  constructor (props: Props)
  render (): JSX.Element
  private readonly renderLoggedIn
  private readonly renderLoggedOut
  private readonly onLoginTapped
  private readonly onLogoutTapped
  private readonly updateState
}
export default SettingsTab
