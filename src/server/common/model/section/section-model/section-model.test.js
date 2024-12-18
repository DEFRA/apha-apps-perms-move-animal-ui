import { CphNumberPage } from '~/src/server/origin/cph-number/index.js'
import { OnOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'
import { OnOffFarmAnswer } from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js'
import { OriginSection } from '../origin/origin.js'
import { CphNumberAnswer } from '../../answer/cph-number/cph-number.js'
import { OriginExitPage } from '~/src/server/exit-page/index.js'
import { OriginSummaryPage } from '~/src/server/origin/summary/index.js'
import { OriginAddressPage } from '~/src/server/origin/address/index.js'
import { AddressAnswer } from '../../answer/address/address.js'

/** @import {OnOffFarmData} from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js' */

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

describe('SectionModel.questionPages', () => {
  it('should short-circuit on an exit page', () => {
    const origin = OriginSection.fromState(exitState)
    const pages = origin._questionPages

    expect(pages).toHaveLength(1)
    expect(pages.at(0)).toBeInstanceOf(OnOffFarmPage)
    expect(origin[pages.at(0)?.questionKey ?? 'invalid']).toBeInstanceOf(
      OnOffFarmAnswer
    )
  })

  it('should short-circuit on a page with an invalid answer', () => {
    const origin = OriginSection.fromState(invalidState)
    const pages = origin._questionPages

    expect(pages).toHaveLength(2)
    expect(pages.at(0)).toBeInstanceOf(OnOffFarmPage)
    expect(origin[pages.at(0)?.questionKey ?? 'invalid']).toBeInstanceOf(
      OnOffFarmAnswer
    )

    expect(pages.at(1)).toBeInstanceOf(CphNumberPage)
    expect(origin[pages.at(1)?.questionKey ?? 'invalid']).toBeInstanceOf(
      CphNumberAnswer
    )
  })
})

describe('SectionModel.questionPageAnswers', () => {
  it('should return all of the pages with answers pre-populated', () => {
    const origin = OriginSection.fromState(validState)
    const pageAnswers = origin.questionPageAnswers

    expect(pageAnswers).toHaveLength(3)
    expect(pageAnswers.at(0)?.page).toBeInstanceOf(OnOffFarmPage)
    expect(pageAnswers.at(0)?.answer).toBeInstanceOf(OnOffFarmAnswer)

    expect(pageAnswers.at(1)?.page).toBeInstanceOf(CphNumberPage)
    expect(pageAnswers.at(1)?.answer).toBeInstanceOf(CphNumberAnswer)

    expect(pageAnswers.at(2)?.page).toBeInstanceOf(OriginAddressPage)
    expect(pageAnswers.at(2)?.answer).toBeInstanceOf(AddressAnswer)
  })
})

describe('SectionModel.finalPage', () => {
  it('should return exit page', () => {
    const origin = OriginSection.fromState(exitState)
    expect(origin.finalPage).toBeInstanceOf(OriginExitPage)
  })

  it('should short-circuit on invalid questions', () => {
    const origin = OriginSection.fromState(invalidState)
    expect(origin.finalPage).toBeInstanceOf(CphNumberPage)
  })

  it('go all the way through the journey to the summary page', () => {
    const origin = OriginSection.fromState(validState)
    expect(origin.finalPage).toBeInstanceOf(OriginSummaryPage)
  })
})

describe('SectionModel.validate', () => {
  it('should return valid if all questions in journey are validly answered', () => {
    const origin = OriginSection.fromState(validState)

    expect(origin.validate()).toEqual({ isValid: true })
  })

  // Reason: We have not finalised how exit pages will behave
  it('should return invalid if the section hits an exit condition before its complete', () => {
    const origin = OriginSection.fromState(exitState)
    const { isValid, firstInvalidPage } = origin.validate()

    expect(isValid).toBe(false)
    expect(firstInvalidPage).toBeInstanceOf(OnOffFarmPage)
  })

  it('should return invalid if the section hits a page with an invalid answer', () => {
    const origin = OriginSection.fromState(invalidState)
    const { isValid, firstInvalidPage } = origin.validate()

    expect(isValid).toBe(false)
    expect(firstInvalidPage).toBeInstanceOf(CphNumberPage)
  })
})

describe('SectionModel.fromState', () => {
  it('should return an instance of the class that produced it', () => {
    expect(OriginSection.fromState(validState)).toBeInstanceOf(OriginSection)
  })
})
