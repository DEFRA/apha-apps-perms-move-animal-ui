import { biosecuritySectionIsVisible } from './visibility.js'
import {
  validApplicationState,
  validOriginSectionState,
  validDestinationSectionState
} from '../../test-helpers/journey-state.js'

const mockRequest = /** @type {any} */ ({})

describe('biosecuritySectionIsVisible', () => {
  it('returns false when no request is provided', async () => {
    await expect(
      biosecuritySectionIsVisible(validApplicationState)
    ).resolves.toBe(false)
  })

  it('returns true for on-farm movements when destination is not AFU', async () => {
    await expect(
      biosecuritySectionIsVisible(validApplicationState, mockRequest)
    ).resolves.toBe(true)
  })

  it('returns false for on-farm movements when destination is AFU', async () => {
    const appState = {
      ...validApplicationState,
      destination: {
        ...validApplicationState.destination,
        destinationType: 'afu'
      }
    }

    await expect(
      biosecuritySectionIsVisible(appState, mockRequest)
    ).resolves.toBe(false)
  })

  it('returns true for off-farm movements between TB-restricted premises when user owns both', async () => {
    const appState = {
      origin: validOriginSectionState,
      destination: {
        ...validDestinationSectionState,
        destinationType: 'tb-restricted-farm',
        ownBothOriginAndDestination: 'yes'
      }
    }

    await expect(
      biosecuritySectionIsVisible(appState, mockRequest)
    ).resolves.toBe(true)
  })

  it('returns false for off-farm movements when the user does not own both premises', async () => {
    const appState = {
      origin: validOriginSectionState,
      destination: {
        ...validDestinationSectionState,
        destinationType: 'tb-restricted-farm',
        ownBothOriginAndDestination: 'no'
      }
    }

    await expect(
      biosecuritySectionIsVisible(appState, mockRequest)
    ).resolves.toBe(false)
  })

  it('returns false when either section is incomplete', async () => {
    const appState = {
      origin: { onOffFarm: validOriginSectionState.onOffFarm },
      destination: {
        ...validDestinationSectionState,
        destinationType: 'tb-restricted-farm',
        ownBothOriginAndDestination: 'yes'
      }
    }

    await expect(
      biosecuritySectionIsVisible(appState, mockRequest)
    ).resolves.toBe(false)
  })
})
