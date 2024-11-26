import { OnOffFarm } from './on-off-farm.js'

describe('#OnOffFarm.validate', () => {
  test('should return true for on', () => {
    const { isValid, errors } = OnOffFarm.validate({
      onOffFarm: 'on'
    })

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  test('should return true for off', () => {
    const { isValid, errors } = OnOffFarm.validate({
      onOffFarm: 'off'
    })

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  test('should return false for empty', () => {
    const { isValid, errors } = OnOffFarm.validate({
      onOffFarm: ''
    })

    expect(isValid).toBe(false)
    expect(errors.onOffFarm.text).toBe(
      'Select if you are moving cattle on or off your farm or premises'
    )
  })
})

describe('#OnOffFarm.toState', () => {
  test('should replace missing data with blank string', () => {
    const data = OnOffFarm.toState({})

    expect(data).toBe('')
  })

  test('should pass through valid data unaltered', () => {
    const data = OnOffFarm.toState({ onOffFarm: 'on' })

    expect(data).toBe('on')
  })
})

describe('#OnOffFarm.fromState', () => {
  it('should wrap the state in the appropriate payload key', () => {
    expect(OnOffFarm.fromState('off')).toEqual({ onOffFarm: 'off' })
  })

  it('should return an empty object if the state is undefined', () => {
    expect(OnOffFarm.fromState(undefined)).toEqual({})
  })
})
