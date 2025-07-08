import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { addressPage } from './index.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { AreInFieldPage } from '../are-in-field/index.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'origin'
const questionKey = 'address'
const pageUrl = '/exotics/movement-origin/address'
const page = addressPage
const question = 'What is the origin premises address?'

const payload = {
  addressLine1: 'Starfleet Headquarters',
  addressLine2: '24-593 Federation Drive',
  addressTown: 'San Francisco Bay',
  addressCounty: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

describe('AddressPage', () => {
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
    expect(page.Answer).toBe(AddressAnswer)
  })

  describe('nextPage', () => {
    it('should return areInFieldPage when moving live animals and not moving from a domestic residence', () => {
      const context = {
        about: { whatIsMoving: 'live-animals' },
        origin: { typeOfAnimalLocation: 'other' }
      }
      const answer = new AddressAnswer(payload)
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBeInstanceOf(AreInFieldPage)
    })

    it('should return checkAnswersPage when moving from a domestic residence', () => {
      const context = {
        about: { whatIsMoving: 'live-animals' },
        origin: { typeOfAnimalLocation: 'domestic-residence' }
      }
      const answer = new AddressAnswer(payload)
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBeInstanceOf(CheckAnswersPage)
    })

    it('should return checkAnswersPage when not moving live animals', () => {
      const context = {
        about: { whatIsMoving: 'equipment' },
        origin: { typeOfAnimalLocation: 'other' }
      }
      const answer = new AddressAnswer(payload)
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBeInstanceOf(CheckAnswersPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
