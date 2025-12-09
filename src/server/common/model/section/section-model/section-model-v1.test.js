import { spyOnConfig } from '~/src/server/common/test-helpers/config.js'
import { subDays } from 'date-fns'

/** @import {OnOffFarmData} from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js' */

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

const mockRequest = /** @type { any } */ ({})

let OriginSection,
  CphNumberPage,
  OnOffFarmPage,
  OnOffFarmAnswer,
  BiosecuritySection,
  CphNumberAnswer,
  OriginAddressPage,
  AddressAnswer,
  OriginTypePage,
  OriginTypeAnswer,
  validOriginSectionState,
  validBiosecuritySectionState,
  Animals42DaysOldOrOlderPage,
  CalvesUnder42DaysOldPage,
  EarTagsCalvesPage,
  EarTagsOver42DaysOldPage,
  OldestCalfDobPage,
  TestingDatesPage,
  Animals42DaysOldOrOlderAnswer,
  CalvesUnder42DaysOldAnswer,
  CalfDob,
  EarTagsCalvesAnswer,
  EarTagsAnswer,
  TestingDatesAnswer,
  IdentificationSection

let invalidState, exitState, applicationState

describe('SectionModelV1', () => {
  beforeAll(async () => {
    spyOnConfig('featureFlags', { defraFormsEnabled: false })
    ;({ validBiosecuritySectionState, validOriginSectionState } = await import(
      '../../../test-helpers/journey-state.js'
    ))
    ;({ Animals42DaysOldOrOlderPage } = await import(
      '~/src/server/tb/identification/animals-42-days-old-or-older/index.js'
    ))
    ;({ CalvesUnder42DaysOldPage } = await import(
      '~/src/server/tb/identification/calves-under-42-days-old/index.js'
    ))
    ;({ EarTagsCalvesPage } = await import(
      '~/src/server/tb/identification/ear-tags-calves/index.js'
    ))
    ;({ EarTagsOver42DaysOldPage } = await import(
      '~/src/server/tb/identification/ear-tags-over-42-days-old/index.js'
    ))
    ;({ OldestCalfDobPage } = await import(
      '~/src/server/tb/identification/oldest-calf-dob/index.js'
    ))
    ;({ TestingDatesPage } = await import(
      '~/src/server/tb/identification/testing-dates/index.js'
    ))
    ;({ Animals42DaysOldOrOlderAnswer } = await import(
      '../../answer/animals-42-days-old-or-older/animals-42-days-old-or-older.js'
    ))
    ;({ CalfDob } = await import('../../answer/calf-dob/calf-dob.js'))
    ;({ CalvesUnder42DaysOldAnswer } = await import(
      '../../answer/calves-under-42-days-old/calves-under-42-days-old.js'
    ))
    ;({ EarTagsCalvesAnswer } = await import(
      '../../answer/ear-tags/ear-tags-calves.js'
    ))
    ;({ EarTagsAnswer } = await import('../../answer/ear-tags/ear-tags.js'))
    ;({ TestingDatesAnswer } = await import(
      '../../answer/testing-dates/testing-dates.js'
    ))
    ;({ IdentificationSection } = await import(
      '../../../../tb/identification/section.js'
    ))
    ;({ CphNumberPage } = await import(
      '~/src/server/tb/origin/cph-number/index.js'
    ))
    ;({ OnOffFarmPage } = await import(
      '~/src/server/tb/origin/on-off-farm/index.js'
    ))
    ;({ OnOffFarmAnswer } = await import(
      '~/src/server/common/model/answer/on-off-farm/on-off-farm.js'
    ))
    ;({ BiosecuritySection } = await import(
      '../../../../tb/biosecurity/section.js'
    ))
    ;({ CphNumberAnswer } = await import(
      '../../answer/cph-number/cph-number.js'
    ))
    ;({ OriginAddressPage } = await import(
      '~/src/server/tb/origin/address/index.js'
    ))
    ;({ AddressAnswer } = await import('../../answer/address/address.js'))
    ;({ OriginTypePage } = await import(
      '~/src/server/tb/origin/origin-type/index.js'
    ))
    ;({ OriginTypeAnswer } = await import(
      '../../answer/origin-type/origin-type.js'
    ))

    invalidState = {
      ...validOriginSectionState,
      cphNumber: 'not-a-cph'
    }

    exitState = {
      ...validOriginSectionState,
      onOffFarm: /** @type {OnOffFarmData} */ ('off'),
      originType: 'unrestricted-farm'
    }

    applicationState = {
      origin: validOriginSectionState
    }
    ;({ OriginSection } = await import('../../../../tb/origin/section.js'))
  })

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
      const origin = IdentificationSection.fromState(
        applicationStateWithWarning
      )
      const pageAnswers = origin._questionPageAnswers

      expect(pageAnswers).toHaveLength(6)
      expect(pageAnswers.at(0)?.page).toBeInstanceOf(CalvesUnder42DaysOldPage)
      expect(pageAnswers.at(0)?.answer).toBeInstanceOf(
        CalvesUnder42DaysOldAnswer
      )

      expect(pageAnswers.at(1)?.page).toBeInstanceOf(OldestCalfDobPage)
      expect(pageAnswers.at(1)?.answer).toBeInstanceOf(CalfDob)

      expect(pageAnswers.at(2)?.page).toBeInstanceOf(EarTagsCalvesPage)
      expect(pageAnswers.at(2)?.answer).toBeInstanceOf(EarTagsCalvesAnswer)

      expect(pageAnswers.at(3)?.page).toBeInstanceOf(
        Animals42DaysOldOrOlderPage
      )
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
      const origin = OriginSection.fromState({
        origin: validOriginSectionState
      })

      expect(origin.validate()).toEqual({ isValid: true })
    })

    // Reason: We have not finalised how exit pages will behave
    it('should return invalid if the section hits an exit condition before its complete', () => {
      const origin = OriginSection.fromState({ origin: exitState })
      const { isValid, firstInvalidPageUrl } = origin.validate()

      expect(isValid).toBe(false)
      expect(firstInvalidPageUrl).toBe(new OriginTypePage().urlPath)
    })

    it('should return invalid if the section hits a page with an invalid answer', () => {
      const origin = OriginSection.fromState({ origin: invalidState })
      const { isValid, firstInvalidPageUrl } = origin.validate()

      expect(isValid).toBe(false)
      expect(firstInvalidPageUrl).toBe(new CphNumberPage().urlPath)
    })

    it('should return the first page as invalid if no state can be found', () => {
      const origin = OriginSection.fromState({})

      const { isValid, firstInvalidPageUrl } = origin.validate()

      expect(isValid).toBe(false)
      expect(firstInvalidPageUrl).toBe(new OnOffFarmPage().urlPath)
    })
  })

  describe('SectionModel.firstPage', () => {
    it('should return the page from the page factory', () => {
      const origin = OriginSection.fromState({
        origin: validOriginSectionState
      })
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
      const origin = OriginSection.fromState({
        origin: validOriginSectionState
      })
      const result = origin.sectionData

      expect(result).toMatchSnapshot()
    })

    it('should include section key and title and question answers array', () => {
      const origin = OriginSection.fromState({
        origin: validOriginSectionState
      })
      const result = origin.sectionData

      expect(result.sectionKey).toBe(OriginSection.config.key)
      expect(result.title).toBe(OriginSection.config.title)
      expect(result.questionAnswers).toBeInstanceOf(Array)
      expect(result.questionAnswers.length).toBeGreaterThan(0)
    })

    it('should map question answers with question, questionKey, and answer data', () => {
      const origin = OriginSection.fromState({
        origin: validOriginSectionState
      })
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
      const origin = OriginSection.fromState({
        origin: validOriginSectionState
      })
      const result = origin.summaryViewModel(mockRequest, redirectUri)

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
      const result = biosecurity.summaryViewModel(mockRequest, redirectUri)

      result.forEach((item) => {
        expect(item.key).toBeDefined()
        expect(item.key).not.toBe('')
      })
    })

    it('should return empty array for section with no answers', () => {
      const origin = OriginSection.fromState({})
      const result = origin.summaryViewModel(mockRequest, redirectUri)

      expect(result).toBeInstanceOf(Array)
    })
  })

  describe('SectionModel.taskDetailsViewModel', () => {
    it('should return view model with valid section data', async () => {
      const origin = OriginSection.fromState({
        origin: validOriginSectionState
      })
      const result = await origin.taskDetailsViewModel(mockRequest, {
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

    it('should return initialLink as first invalid page when section is invalid', async () => {
      const origin = OriginSection.fromState({ origin: invalidState })
      const result = await origin.taskDetailsViewModel(mockRequest, {
        origin: invalidState
      })

      expect(result.isValid).toBe(false)
      expect(result.initialLink).toBe(new CphNumberPage().urlPath)
    })

    it('should return initialLink as first invalid page when section exits early', async () => {
      const origin = OriginSection.fromState({ origin: exitState })
      const result = await origin.taskDetailsViewModel(mockRequest, {
        origin: exitState
      })

      expect(result.isValid).toBe(false)
      expect(result.initialLink).toBe(new OriginTypePage().urlPath)
    })
  })
})
