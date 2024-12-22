import { delay } from "./delay";

describe('delay', () => {
  test('Delay test 1', async () => {
    const sum = await delay(() => 5 + 5, 1000)
    expect(sum).toBe(10)
  })
})