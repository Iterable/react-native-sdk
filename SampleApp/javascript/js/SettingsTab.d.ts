import { Component } from 'react';
interface Props {
}
interface State {
    email?: string;
    isLoggedIn: boolean;
}
declare class SettingsTab extends Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
    private renderLoggedIn;
    private renderLoggedOut;
    private onLoginTapped;
    private onLogoutTapped;
    private updateState;
}
export default SettingsTab;
