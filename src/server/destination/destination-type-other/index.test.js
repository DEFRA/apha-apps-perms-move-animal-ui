import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { destinationTypeOtherPage, DestinationTypeOtherPage } from './index.js'
import { destinationFarmCphPage } from '../destination-farm-cph/index.js'
import { DestinationTypeOtherAnswer } from '../../common/model/answer/destination-type-other/destination-type-other.js'

const sectionKey = 'destination'
const question =
  'What type of premises with TB restrictions are the animals moving off?'
const questionKey = 'destinationTypeOther'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/type-of-destination-other'

describe('DestinationTypeOtherPage', () => {
  const page = new DestinationTypeOtherPage()

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
    expect(page.Answer).toBe(DestinationTypeOtherAnswer)
  })

  it('nextPage should return destination summary page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(destinationFarmCphPage)
  })

  it('should export page', () => {
    expect(destinationTypeOtherPage).toBeInstanceOf(DestinationTypeOtherPage)
  })

  describePageSnapshot({
    describes: 'DestinationTypeOtherPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
