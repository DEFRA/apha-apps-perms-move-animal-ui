import { recommendRunnerCount } from './browserstackMetrics'

describe('recommendRunnerCount', () => {
  it('should take half availableThreads runners if that figure is greater than the minimum preferred', () => {
    expect(recommendRunnerCount({ availableThreads: 16 })).toBe(8)
    expect(recommendRunnerCount({ availableThreads: 15 })).toBe(7)
  })

  it('should take the minimum preferred if half availableThreads runners is too small, but available runners is more than minimum preferred', () => {
    expect(recommendRunnerCount({ availableThreads: 10 })).toBe(6)
    expect(recommendRunnerCount({ availableThreads: 8 })).toBe(6)
  })

  it('should take all that remains if the availableThreads is below minimum preferred', () => {
    expect(recommendRunnerCount({ availableThreads: 4 })).toBe(4)
  })
})
