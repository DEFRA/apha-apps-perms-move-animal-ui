import { destinationTypePage, DestinationTypePage } from './index.js'
import { DestinationTypeAnswer } from '../../common/model/answer/destination-type/destination-type.js'
import { destinationGeneralLicencePage } from '../general-licence/index.js'
import { destinationFarmCphPage } from '../destination-farm-cph/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { contactTbRestrictedFarmPage } from '../contact-tb-restricted-farm/index.js'
import { isolationUnitExitPage } from '../isolation-unit-exit-page/index.js'
import { destinationTypeOtherPage } from '../destination-type-other/index.js'
import { additionalInfoPage } from '../additional-info/index.js'

/**
 * @import {DestinationTypeData} from '../../common/model/answer/destination-type/destination-type.js'
 */

const sectionKey = 'destination'
const question = 'Where are the animals going to?'
const questionKey = 'destinationType'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/type-of-destination'

const page = new DestinationTypePage()

describe('DestinationTypePage', () => {
  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(DestinationTypeAnswer)
  })

  it('should export page', () => {
    expect(destinationTypePage).toBeInstanceOf(DestinationTypePage)
  })
})

describe('DestinationTypePage.nextPage', () => {
  describe('off the farm', () => {
    const context = { origin: { onOffFarm: 'off' } }

    it('should return contact tb restricted farm page when answer is "tb-restricted-farm"', () => {
      const answer = new DestinationTypeAnswer({
        destinationType: 'tb-restricted-farm'
      })
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(contactTbRestrictedFarmPage)
    })

    it('should return general licence page when answer is "slaughter"', () => {
      const answer = new DestinationTypeAnswer({ destinationType: 'slaughter' })
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(destinationGeneralLicencePage)
    })

    it('should return the isolation unit exit page of that is selected', () => {
      const answer = new DestinationTypeAnswer({ destinationType: 'iso-unit' })
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(isolationUnitExitPage)
    })

    it('should return exit page when answer is "dedicated-sale"', () => {
      const answer = new DestinationTypeAnswer({
        destinationType: 'dedicated-sale'
      })
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(additionalInfoPage)
    })

    it('should return exitPage when answer is "afu"', () => {
      const answer = new DestinationTypeAnswer({ destinationType: 'afu' })
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(additionalInfoPage)
    })

    it('should return exitPage when answer is "zoo"', () => {
      const answer = new DestinationTypeAnswer({ destinationType: 'zoo' })
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(contactTbRestrictedFarmPage)
    })

    it('should return exitPage when answer is "lab"', () => {
      const answer = new DestinationTypeAnswer({ destinationType: 'lab' })
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(contactTbRestrictedFarmPage)
    })

    it('should return exitPage when answer is "other"', () => {
      const answer = new DestinationTypeAnswer({ destinationType: 'other' })
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(contactTbRestrictedFarmPage)
    })

    describePageSnapshot({
      describes: 'DestinationTypePage.content',
      it: 'should render expected response and content',
      pageUrl,
      state: context
    })
  })

  describe('on the farm', () => {
    const context = { origin: { onOffFarm: 'on' } }

    afterAll(jest.resetAllMocks)

    it('should return destination-farm-cph no matter what the answer', () => {
      const answer = new DestinationTypeAnswer(undefined)
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(destinationFarmCphPage)
    })

    it('should go to the correct page if other is selected', () => {
      const answer = new DestinationTypeAnswer({ destinationType: 'other' })
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(destinationTypeOtherPage)
    })

    it.each(['tb-restricted-farm', 'zoo', 'lab'])(
      'should return destination-farm-cph even for restricted -> restricted',
      (destinationType) => {
        const context = {
          origin: { onOffFarm: 'on', originType: 'tb-restricted-farm' }
        }
        const answer = new DestinationTypeAnswer({
          /* eslint-disable-next-line object-shorthand */
          destinationType: /** @type {DestinationTypeData} */ (destinationType)
        })
        const nextPage = page.nextPage(answer, context)
        expect(nextPage).toBe(destinationFarmCphPage)
      }
    )

    describePageSnapshot({
      describes: 'DestinationTypePage.content',
      it: 'should render expected response and content',
      pageUrl,
      state: context
    })
  })
})
