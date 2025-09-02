import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { isDesignatedPremisesPage } from './index.js'
import { DesignatedPremisesAnswer } from '../../common/model/answer/designated-premises/designated-premises.js'
import { AnimalsOnPremisesPage } from '../animals-on-premises/index.js'

const sectionKey = 'locationOfVisit'
const questionKey = 'isDesignatedPremises'
const pageUrl = '/fmd/location-of-visit/designated-premises'
const page = isDesignatedPremisesPage
const question = 'Is the premises designated?'

describe('IsDesignatedPremisesPage', () => {
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
    expect(page.Answer).toBe(DesignatedPremisesAnswer)
  })

  describe('nextPage', () => {
    it.each([
      ['yes', AnimalsOnPremisesPage],
      ['no', AnimalsOnPremisesPage],
      ['unknown', AnimalsOnPremisesPage]
    ])('for %s should return %s', (value, expectedPage) => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(expectedPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
