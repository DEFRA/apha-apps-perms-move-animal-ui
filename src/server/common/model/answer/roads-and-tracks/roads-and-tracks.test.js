import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { RoadsAndTracksAnswer } from './roads-and-tracks.js'
/** @import {RoadsAndTracksPayload} from './roads-and-tracks.js' */

/** @type {RoadsAndTracksPayload} */
const payload = {
  roadsAndTracks: 'yes'
}

describe('RoadsAndTracks', () => {
  it('should be a radio button', () => {
    expect(new RoadsAndTracksAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(RoadsAndTracksAnswer.config.payloadKey).toBe('roadsAndTracks')
  })

  it('should define the right empty input message', () => {
    expect(RoadsAndTracksAnswer.config.errors.emptyOptionText).toBe(
      'Select if the incoming cattle come into contact with any roads or tracks used by the existing cattle'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(RoadsAndTracksAnswer.config.options)).toHaveLength(2)
    expect(RoadsAndTracksAnswer.config.options.yes.label).toBe('Yes')
    expect(RoadsAndTracksAnswer.config.options.no.label).toBe('No')
  })
})
