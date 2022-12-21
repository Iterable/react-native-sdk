// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TestHelper {
  static async delayed (delay: number, fn: () => void): Promise<void> {
    return await new Promise(resolve => setTimeout(() => {
      fn()
      resolve()
    }, delay))
  }
}
