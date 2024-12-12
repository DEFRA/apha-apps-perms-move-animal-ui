import { CphNumberPage } from '~/src/server/origin/cph-number/index.js'
import { OnOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'
import { OnOffFarm } from '~/src/server/common/model/answer/on-off-farm.js'
import { Origin } from '../origin.js'

/** @import {OnOffFarmData} from '~/src/server/common/model/answer/on-off-farm.js' */

const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressTown: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

const validState = {
  onOffFarm: /** @type {OnOffFarmData} */ ('off'),
  cphNumber: '12/345/6789',
  address: validAddress
}

const invalidState = {
  onOffFarm: /** @type {OnOffFarmData} */ ('off'),
  cphNumber: 'not-a-cph',
  address: validAddress // this is unreachable in the journey, since we've got an invalid question ahead of it
}

const exitState = {
  onOffFarm: /** @type {OnOffFarmData} */ ('on'),
  cphNumber: 'not-a-cph', // this is unreachable in the journey, because we will have exited already
  address: validAddress // this is unreachable in the journey, because we will have exited already
}

describe('SectionModel.value', () => {
  it('should short-circuit on an exit page', () => {
    const origin = Origin.fromState(exitState)
    const pages = origin.pages

    expect(pages).toHaveLength(1)
    expect(pages.at(0)).toBeInstanceOf(OnOffFarmPage)
    expect(origin[pages.at(0)?.questionKey ?? 'invalid']).toBeInstanceOf(
      OnOffFarm
    )
  })
})

describe('SectionModel.validate', () => {
  it('should return valid if all questions in journey are validly answered', () => {
    const origin = Origin.fromState(validState)

    expect(origin.validate()).toEqual({ isValid: true })
  })

  // Reason: We have not finalised how exit pages will behave
  it.skip('should return ... invalid ? ... if the section hits an exit condition before its complete', () => {
    const origin = Origin.fromState(exitState)

    expect(origin.validate().isValid).toBe(true)
  })

  it('should return invalid if the section hits a page with an invalid answer', () => {
    const origin = Origin.fromState(invalidState)
    const { isValid, firstInvalidPage } = origin.validate()

    expect(isValid).toBe(false)
    expect(firstInvalidPage).toBeInstanceOf(CphNumberPage)
  })
})

describe('SectionModel.fromState', () => {
  it('should return an instance of the class that produced it', () => {
    expect(Origin.fromState(validState)).toBeInstanceOf(Origin)
  })
})
