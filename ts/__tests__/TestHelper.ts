export class TestHelper {
  static delayed(delay: number, fn: () => void): Promise<any> {
    return new Promise(res => setTimeout(() => {
      fn()
      res()
    }, delay))
  }
}
