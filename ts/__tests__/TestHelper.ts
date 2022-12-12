export async function delayed (delay: number, fn: () => void): Promise<void> {
  return await new Promise(resolve => setTimeout(() => {
    fn()
    resolve()
  }, delay))
}
