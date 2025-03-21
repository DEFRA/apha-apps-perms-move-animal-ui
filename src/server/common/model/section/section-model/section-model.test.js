import { CphNumberPage } from '~/src/server/origin/cph-number/index.js'
import { OnOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'
import { OnOffFarmAnswer } from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js'
import { OriginSection } from '../origin/origin.js'
import { CphNumberAnswer } from '../../answer/cph-number/cph-number.js'
import { OriginAddressPage } from '~/src/server/origin/address/index.js'
import { AddressAnswer } from '../../answer/address/address.js'
import { OriginTypePage } from '~/src/server/origin/origin-type/index.js'
import { OriginTypeAnswer } from '../../answer/origin-type/origin-type.js'
import { validOriginSectionState } from '../../../test-helpers/journey-state.js'

/** @import {OnOffFarmData} from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js' */

const invalidState = {
  ...validOriginSectionState,
  cphNumber: 'not-a-cph'
}

const exitState = {
  ...validOriginSectionState,
  onOffFarm: /** @type {OnOffFarmData} */ ('off'),
  originType: 'unrestricted-farm'
}

const applicationState = {
  origin: validOriginSectionState
}

describe('SectionModel.questionPageAnswers', () => {
  it('should return all of the pages with answers pre-populated', () => {
    const origin = OriginSection.fromState(applicationState)
    const pageAnswers = origin.questionPageAnswers

    expect(pageAnswers).toHaveLength(4)
    expect(pageAnswers.at(0)?.page).toBeInstanceOf(OnOffFarmPage)
    expect(pageAnswers.at(0)?.answer).toBeInstanceOf(OnOffFarmAnswer)

    expect(pageAnswers.at(1)?.page).toBeInstanceOf(OriginTypePage)
    expect(pageAnswers.at(1)?.answer).toBeInstanceOf(OriginTypeAnswer)

    expect(pageAnswers.at(2)?.page).toBeInstanceOf(CphNumberPage)
    expect(pageAnswers.at(2)?.answer).toBeInstanceOf(CphNumberAnswer)

    expect(pageAnswers.at(3)?.page).toBeInstanceOf(OriginAddressPage)
    expect(pageAnswers.at(3)?.answer).toBeInstanceOf(AddressAnswer)
  })

  it('should short-circuit on an exit page', () => {
    const origin = OriginSection.fromState({ origin: exitState })
    const pageAnswers = origin.questionPageAnswers

    expect(pageAnswers).toHaveLength(2)
    expect(pageAnswers.at(0)?.page).toBeInstanceOf(OnOffFarmPage)
    expect(pageAnswers.at(0)?.answer).toBeInstanceOf(OnOffFarmAnswer)
    expect(pageAnswers.at(1)?.page).toBeInstanceOf(OriginTypePage)
    expect(pageAnswers.at(1)?.answer).toBeInstanceOf(OriginTypeAnswer)
  })

  it('should short-circuit on a page with an invalid answer', () => {
    const origin = OriginSection.fromState({ origin: invalidState })
    const pageAnswers = origin.questionPageAnswers

    expect(pageAnswers).toHaveLength(3)
    expect(pageAnswers.at(0)?.page).toBeInstanceOf(OnOffFarmPage)
    expect(pageAnswers.at(0)?.answer).toBeInstanceOf(OnOffFarmAnswer)

    expect(pageAnswers.at(1)?.page).toBeInstanceOf(OriginTypePage)
    expect(pageAnswers.at(1)?.answer).toBeInstanceOf(OriginTypeAnswer)

    expect(pageAnswers.at(2)?.page).toBeInstanceOf(CphNumberPage)
    expect(pageAnswers.at(2)?.answer).toBeInstanceOf(CphNumberAnswer)
  })
})

describe('SectionModel.validate', () => {
  it('should return valid if all questions in journey are validly answered', () => {
    const origin = OriginSection.fromState({ origin: validOriginSectionState })

    expect(origin.validate()).toEqual({ isValid: true })
  })

  // Reason: We have not finalised how exit pages will behave
  it('should return invalid if the section hits an exit condition before its complete', () => {
    const origin = OriginSection.fromState({ origin: exitState })
    const { isValid, firstInvalidPage } = origin.validate()

    expect(isValid).toBe(false)
    expect(firstInvalidPage).toBeInstanceOf(OriginTypePage)
  })

  it('should return invalid if the section hits a page with an invalid answer', () => {
    const origin = OriginSection.fromState({ origin: invalidState })
    const { isValid, firstInvalidPage } = origin.validate()

    expect(isValid).toBe(false)
    expect(firstInvalidPage).toBeInstanceOf(CphNumberPage)
  })

  it('should return the first page as invalid if no state can be found', () => {
    const origin = OriginSection.fromState({})

    const { isValid, firstInvalidPage } = origin.validate()

    expect(isValid).toBe(false)
    expect(firstInvalidPage).toBeInstanceOf(OnOffFarmPage)
  })
})

describe('SectionModel.firstPage', () => {
  it('should return the page from the page factory', () => {
    const origin = OriginSection.fromState({ origin: validOriginSectionState })
    expect(origin.getFirstPage()).toBeInstanceOf(OnOffFarmPage)
  })
})

describe('SectionModel.fromState', () => {
  it('should return an instance of the class that produced it', () => {
    expect(
      OriginSection.fromState({ origin: validOriginSectionState })
    ).toBeInstanceOf(OriginSection)
  })
})
