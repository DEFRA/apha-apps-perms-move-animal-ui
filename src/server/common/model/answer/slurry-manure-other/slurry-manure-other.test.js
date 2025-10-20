import { TextAreaAnswer } from '../text-area/text-area.js'
import { SlurryManureOtherAnswer } from './slurry-manure-other.js'

describe('SlurryManureOtherAnswer', () => {
  it('should extend TextAreaAnswer', () => {
    expect(
      new SlurryManureOtherAnswer({
        SlurryManureOther: 'some details'
      })
    ).toBeInstanceOf(TextAreaAnswer)
  })

  it('should expose the expected config', () => {
    const config = SlurryManureOtherAnswer.config
    expect(config.payloadKey).toBe('SlurryManureOther')
    expect(config.rows).toBe(4)
    expect(config.spellcheck).toBe(false)
    expect(config.validation.maxLength).toEqual({
      value: 5000,
      message: 'Your answer must be no longer than 5000 characters'
    })
    expect(config.validation.empty?.message).toBe(
      'Enter details on the other measures being taken to manage slurry and manure'
    )
  })
})
