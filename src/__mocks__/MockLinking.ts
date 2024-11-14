// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MockLinking {
  static canOpenURL = jest.fn()
  static openURL = jest.fn()

  static addEventListener = jest.fn()
  static removeEventListener = jest.fn()
}
