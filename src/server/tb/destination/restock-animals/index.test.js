import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { RestockAnimalPage, restockAnimalPage } from './index.js'
import { RestockAnimalsAnswer } from '../../../common/model/answer/restock-animals/restock-animals.js'
import { restockReasonPage } from '../restock-reason/index.js'

const sectionKey = 'destination'
const question = 'Which types of animals are you restocking?'
const questionKey = 'restockAnimals'
const pageUrl = '/destination/restocking-additional-info-animal-type'

describe('RestockAnimalPage', () => {
  const page = new RestockAnimalPage()

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

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(RestockAnimalsAnswer)
  })

  it('nextPage should return other wildlife measures page when the answer includes "other"', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(restockReasonPage)
  })

  it('should export page', () => {
    expect(restockAnimalPage).toBeInstanceOf(RestockAnimalPage)
  })

  describePageSnapshot({
    describes: 'restockAnimal.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
