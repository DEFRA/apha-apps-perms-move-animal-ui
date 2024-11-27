import { OnOffFarm } from './on-off-farm.js'

const validOnOffRadio = {
  onOffFarm: 'on'
}

describe('#OnOffFarm.validate', () => {
  test('should return true for on', () => {
    const { isValid, errors } = new OnOffFarm({
      onOffFarm: 'on'
    }).validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  test('should return true for off', () => {
    const { isValid, errors } = new OnOffFarm({
      onOffFarm: 'off'
    }).validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  test('should return false for empty', () => {
    const { isValid, errors } = new OnOffFarm({
      onOffFarm: ''
    }).validate()

    expect(isValid).toBe(false)
    expect(errors.onOffFarm.text).toBe(
      'Select if you are moving cattle on or off your farm or premises'
    )
  })
})

describe('#OnOffFarm.toState', () => {
  test('should replace missing data with blank string', () => {
    const data = new OnOffFarm({}).toState()

    expect(data).toBe('')
  })

  test('should pass through valid data unaltered', () => {
    const data = new OnOffFarm({ onOffFarm: 'on' }).toState()

    expect(data).toBe('on')
  })
})

describe('#OnOffFarm.fromState', () => {
  it('should return just the onOffFarm value from the payload', () => {
    const state = new OnOffFarm(validOnOffRadio).toState()
    expect(OnOffFarm.fromState(state)._data).toEqual(validOnOffRadio)
  })

  it('should return an empty object if the state is undefined', () => {
    expect(OnOffFarm.fromState(undefined)._data).toEqual({})
  })
})

describe('#OnOffFarm.value', () => {
  it('should return a value-wrapped object to rendering in the template', () => {
    expect(new OnOffFarm({ onOffFarm: 'on' }).value).toEqual({ value: 'on' })
  })
})
