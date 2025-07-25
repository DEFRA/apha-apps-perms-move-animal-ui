import { CphNumberPage } from '~/src/server/tb/origin/cph-number/index.js'
import { OnOffFarmPage } from '~/src/server/tb/origin/on-off-farm/index.js'
import { OnOffFarmAnswer } from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js'
import { OriginSection } from '../../../../tb/origin/section.js'
import { CphNumberAnswer } from '../../answer/cph-number/cph-number.js'
import { OriginAddressPage } from '~/src/server/tb/origin/address/index.js'
import { AddressAnswer } from '../../answer/address/address.js'
import { OriginTypePage } from '~/src/server/tb/origin/origin-type/index.js'
import { OriginTypeAnswer } from '../../answer/origin-type/origin-type.js'
import { validOriginSectionState } from '../../../test-helpers/journey-state.js'
import { subDays } from 'date-fns'
import { Animals42DaysOldOrOlderPage } from '~/src/server/tb/identification/animals-42-days-old-or-older/index.js'
import { CalvesUnder42DaysOldPage } from '~/src/server/tb/identification/calves-under-42-days-old/index.js'
import { EarTagsCalvesPage } from '~/src/server/tb/identification/ear-tags-calves/index.js'
import { EarTagsOver42DaysOldPage } from '~/src/server/tb/identification/ear-tags-over-42-days-old/index.js'
import { OldestCalfDobPage } from '~/src/server/tb/identification/oldest-calf-dob/index.js'
import { TestingDatesPage } from '~/src/server/tb/identification/testing-dates/index.js'
import { Animals42DaysOldOrOlderAnswer } from '../../answer/animals-42-days-old-or-older/animals-42-days-old-or-older.js'
import { CalfDob } from '../../answer/calf-dob/calf-dob.js'
import { CalvesUnder42DaysOldAnswer } from '../../answer/calves-under-42-days-old/calves-under-42-days-old.js'
import { EarTagsCalvesAnswer } from '../../answer/ear-tags/ear-tags-calves.js'
import { EarTagsAnswer } from '../../answer/ear-tags/ear-tags.js'
import { TestingDatesAnswer } from '../../answer/testing-dates/testing-dates.js'
import { IdentificationSection } from '../../../../tb/identification/section.js'

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

// This date will force a warning to be shown in animal identification section
const date36DaysOld = subDays(new Date(), 36)

const identificationStateWithWarning = {
  calvesUnder42DaysOld: 'yes',
  earTagsCalves: 'some_tags',
  oldestCalfDob: {
    day: date36DaysOld.getDate().toString(),
    month: (date36DaysOld.getMonth() + 1).toString(),
    year: date36DaysOld.getFullYear().toString()
  },
  animals42DaysOldOrOlder: 'yes',
  testingDates: '01/01/2023',
  earTags: 'some_other_tags'
}

const applicationStateWithWarning = {
  identification: identificationStateWithWarning
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

  it('should NOT short-circuit on a warning page if there are more answers after it', () => {
    const origin = IdentificationSection.fromState(applicationStateWithWarning)
    const pageAnswers = origin.questionPageAnswers

    expect(pageAnswers).toHaveLength(6)
    expect(pageAnswers.at(0)?.page).toBeInstanceOf(CalvesUnder42DaysOldPage)
    expect(pageAnswers.at(0)?.answer).toBeInstanceOf(CalvesUnder42DaysOldAnswer)

    expect(pageAnswers.at(1)?.page).toBeInstanceOf(OldestCalfDobPage)
    expect(pageAnswers.at(1)?.answer).toBeInstanceOf(CalfDob)

    expect(pageAnswers.at(2)?.page).toBeInstanceOf(EarTagsCalvesPage)
    expect(pageAnswers.at(2)?.answer).toBeInstanceOf(EarTagsCalvesAnswer)

    expect(pageAnswers.at(3)?.page).toBeInstanceOf(Animals42DaysOldOrOlderPage)
    expect(pageAnswers.at(3)?.answer).toBeInstanceOf(
      Animals42DaysOldOrOlderAnswer
    )

    expect(pageAnswers.at(4)?.page).toBeInstanceOf(TestingDatesPage)
    expect(pageAnswers.at(4)?.answer).toBeInstanceOf(TestingDatesAnswer)

    expect(pageAnswers.at(5)?.page).toBeInstanceOf(EarTagsOver42DaysOldPage)
    expect(pageAnswers.at(5)?.answer).toBeInstanceOf(EarTagsAnswer)
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
