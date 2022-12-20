export class TestHelper {
  static async delayed (delay: number, fn: () => void): Promise<any> {
    return await new Promise(res => setTimeout(() => {
      fn()
      res()
    }, delay))
  }
}
