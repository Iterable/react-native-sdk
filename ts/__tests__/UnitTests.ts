import { Iterable } from '../Iterable'

test('a', () => {
  expect(1 + 2).toBe(3)
})

test("set/get email", () => {
  Iterable.setEmail("user@example.com")
  return Iterable.getEmail().then(email => {
    expect(email).toBe("user@example.com")
  })
})
