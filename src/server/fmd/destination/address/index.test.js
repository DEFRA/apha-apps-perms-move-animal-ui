import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { addressPage } from './index.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import {
  aboutSectionNonVisitComplete,
  aboutSectionVisitComplete
} from '~/src/server/common/test-helpers/exotic/journey-state.js'
import { ResponsiblePersonNamePage } from '../responsible-person-name/index.js'
import { CphNumberKnownPage } from '../cph-number-known/index.js'

const sectionKey = 'destination'
const questionKey = 'address'
const pageUrl = '/fmd/movement-destination/address'
const page = addressPage
const question = 'What is the destination address?'

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
    it.each([['pigs'], ['sheep-and-goats'], ['cattle']])(
      'should return CphNumberKnownPage for %s, if the movement is for live animals',
      (typeOfAnimal) => {
        const state = {
          about: {
            aboutSectionNonVisitComplete,
            typeOfAnimal,
            whatIsMoving: 'live-animals'
          }
        }
        const nextPage = page.nextPage(/** @type {AddressAnswer} */ ({}), state)
        expect(nextPage).toBeInstanceOf(CphNumberKnownPage)
      }
    )

    it.each([['pigs'], ['sheep-and-goats'], ['cattle']])(
      'should return ResponsiblePersonNamePage for %s, if the movement is NOT live animals',
      (typeOfAnimal) => {
        const state = {
          about: {
            aboutSectionNonVisitComplete,
            typeOfAnimal,
            whatIsMoving: 'carcasses'
          }
        }
        const nextPage = page.nextPage(/** @type {AddressAnswer} */ ({}), state)
        expect(nextPage).toBeInstanceOf(ResponsiblePersonNamePage)
      }
    )

    it('should return ResponsiblePersonNamePage for any other value', () => {
      const nextPage = page.nextPage(/** @type {AddressAnswer} */ ({}), {
        about: aboutSectionVisitComplete
      })
      expect(nextPage).toBeInstanceOf(ResponsiblePersonNamePage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
