import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, ownBothOriginAndDestinationPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { destinationTypeOtherPage } from '../destination-type-other/index.js'
import { destinationFarmCphPage } from '../destination-farm-cph/index.js'
import { contactTbRestrictedFarmPage } from '../contact-tb-restricted-farm/index.js'

const sectionKey = 'destination'
const questionKey = 'ownBothOriginAndDestination'
const pageUrl = '/destination/who-is-responsible'
const page = ownBothOriginAndDestinationPage
const question =
  'Are you responsible for the TB restricted farm where the animals are going to?'
const payload = { [questionKey]: 'some text' }

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should define the right empty input message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if you are responsible for the TB restricted farm where the animals are going to'
    )
  })
})

describe('OwnBothOriginAndDestinationPage', () => {
  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(Answer)
  })

  describe('nextPage', () => {
    it('should return destination-type-other when answer is yes and origin is other', () => {
      const context = {
        origin: { onOffFarm: 'off', originType: 'other' }
      }
      const answer = new Answer(
        {
          ownBothOriginAndDestination: 'yes'
        },
        context
      )
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(destinationTypeOtherPage)
    })

    it('should return destination-farm-cph when answer is yes and origin is tb-restricted-farm', () => {
      const context = {
        origin: { onOffFarm: 'off', originType: 'tb-restricted-farm' }
      }
      const answer = new Answer(
        {
          ownBothOriginAndDestination: 'yes'
        },
        context
      )
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(destinationFarmCphPage)
    })

    it('should return contact-tb-restricted-farm when answer is no', () => {
      const context = {
        origin: { onOffFarm: 'off', originType: 'tb-restricted-farm' }
      }
      const answer = new Answer(
        {
          ownBothOriginAndDestination: 'no'
        },
        context
      )
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(contactTbRestrictedFarmPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
