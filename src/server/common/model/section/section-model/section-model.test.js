import { CphNumberPage } from '~/src/server/tb/origin/cph-number/index.js'
import { OnOffFarmPage } from '~/src/server/tb/origin/on-off-farm/index.js'
import { OnOffFarmAnswer } from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js'
import { OriginSection } from '../../../../tb/origin/section.js'
import { BiosecuritySection } from '../../../../tb/biosecurity/section.js'
import { CphNumberAnswer } from '../../answer/cph-number/cph-number.js'
import { OriginAddressPage } from '~/src/server/tb/origin/address/index.js'
import { AddressAnswer } from '../../answer/address/address.js'
import { OriginTypePage } from '~/src/server/tb/origin/origin-type/index.js'
import { OriginTypeAnswer } from '../../answer/origin-type/origin-type.js'
import {
  validBiosecuritySectionState,
  validOriginSectionState
} from '../../../test-helpers/journey-state.js'
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
    const pageAnswers = origin._questionPageAnswers

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
    const pageAnswers = origin._questionPageAnswers

    expect(pageAnswers).toHaveLength(2)
    expect(pageAnswers.at(0)?.page).toBeInstanceOf(OnOffFarmPage)
    expect(pageAnswers.at(0)?.answer).toBeInstanceOf(OnOffFarmAnswer)
    expect(pageAnswers.at(1)?.page).toBeInstanceOf(OriginTypePage)
    expect(pageAnswers.at(1)?.answer).toBeInstanceOf(OriginTypeAnswer)
  })

  it('should short-circuit on a page with an invalid answer', () => {
    const origin = OriginSection.fromState({ origin: invalidState })
    const pageAnswers = origin._questionPageAnswers

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
    const pageAnswers = origin._questionPageAnswers

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
    expect(origin._getFirstPage()).toBeInstanceOf(OnOffFarmPage)
  })
})

describe('SectionModel.fromState', () => {
  it('should return an instance of the class that produced it', () => {
    expect(
      OriginSection.fromState({ origin: validOriginSectionState })
    ).toBeInstanceOf(OriginSection)
  })
})

describe('SectionModel.sectionData', () => {
  it('should return complete section data with valid state', () => {
    const origin = OriginSection.fromState({ origin: validOriginSectionState })
    const result = origin.sectionData

    expect(result).toMatchSnapshot()
  })

  it('should include section key and title and question answers array', () => {
    const origin = OriginSection.fromState({ origin: validOriginSectionState })
    const result = origin.sectionData

    expect(result.sectionKey).toBe(OriginSection.config.key)
    expect(result.title).toBe(OriginSection.config.title)
    expect(result.questionAnswers).toBeInstanceOf(Array)
    expect(result.questionAnswers.length).toBeGreaterThan(0)
  })

  it('should map question answers with question, questionKey, and answer data', () => {
    const origin = OriginSection.fromState({ origin: validOriginSectionState })
    const result = origin.sectionData

    result.questionAnswers.forEach((qa) => {
      expect(qa).toHaveProperty('question')
      expect(qa).toHaveProperty('questionKey')
      expect(qa).toHaveProperty('answer')
    })
  })

  it('should filter out hidden answers', () => {
    const biosecurity = BiosecuritySection.fromState({
      biosecurity: validBiosecuritySectionState
    })
    const result = biosecurity.sectionData

    result.questionAnswers.forEach((qa) => {
      expect(qa.answer).toBeDefined()
    })
  })

  it('should return empty question answers for empty state', () => {
    const origin = OriginSection.fromState({})
    const result = origin.sectionData

    expect(result.sectionKey).toBe(OriginSection.config.key)
    expect(result.title).toBe(OriginSection.config.title)
    expect(result.questionAnswers).toBeInstanceOf(Array)
  })
})

describe('SectionModel.summaryViewModel', () => {
  const redirectUri = '/check-your-answers'

  it('should include array with correct properties and values for each item', () => {
    const origin = OriginSection.fromState({ origin: validOriginSectionState })
    const result = origin.summaryViewModel(redirectUri)

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBeGreaterThan(0)

    result.forEach((item) => {
      expect(item).toHaveProperty('key')
      expect(item).toHaveProperty('value')
      expect(item).toHaveProperty('url')
      expect(item).toHaveProperty('visuallyHiddenKey')
      expect(item).toHaveProperty('attributes')

      expect(item.key).toBeDefined()
      expect(item.value).toBeDefined()
      expect(item.url).toContain('?returnUrl=')
      expect(item.url).toContain(redirectUri)
      expect(item.visuallyHiddenKey).toBe(item.key)
      expect(item.attributes['data-testid']).toMatch(/-change-link$/)
    })
  })

  it('should filter out interstitial pages', () => {
    const biosecurity = BiosecuritySection.fromState({
      biosecurity: validBiosecuritySectionState
    })
    const result = biosecurity.summaryViewModel(redirectUri)

    result.forEach((item) => {
      expect(item.key).toBeDefined()
      expect(item.key).not.toBe('')
    })
  })

  it('should return empty array for section with no answers', () => {
    const origin = OriginSection.fromState({})
    const result = origin.summaryViewModel(redirectUri)

    expect(result).toBeInstanceOf(Array)
  })
})

describe('SectionModel.taskDetailsViewModel', () => {
  it('should return view model with valid section data', () => {
    const origin = OriginSection.fromState({ origin: validOriginSectionState })
    const result = origin.taskDetailsViewModel({
      origin: validOriginSectionState
    })

    expect(result).toMatchObject({
      title: OriginSection.config.title,
      initialLink: new OnOffFarmPage().urlPath,
      summaryLink: OriginSection.config.summaryLink,
      isValid: true,
      isEnabled: true
    })
  })

  it('should return initialLink as first invalid page when section is invalid', () => {
    const origin = OriginSection.fromState({ origin: invalidState })
    const result = origin.taskDetailsViewModel({ origin: invalidState })

    expect(result.isValid).toBe(false)
    expect(result.initialLink).toBe(new CphNumberPage().urlPath)
  })

  it('should return initialLink as first invalid page when section exits early', () => {
    const origin = OriginSection.fromState({ origin: exitState })
    const result = origin.taskDetailsViewModel({ origin: exitState })

    expect(result.isValid).toBe(false)
    expect(result.initialLink).toBe(new OriginTypePage().urlPath)
  })
})
