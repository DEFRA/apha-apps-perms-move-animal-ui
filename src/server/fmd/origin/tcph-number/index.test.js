import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { tcphNumberPage } from './index.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { MockOriginPage } from '../mock-page/index.js'
import { GridRefPage } from '../grid-ref/index.js'

const sectionKey = 'origin'
const questionKey = 'tcphNumber'
const pageUrl = '/fmd/movement-origin/TLA-or-tCPH-number'
const page = tcphNumberPage
const question =
  'What is the TLA or temporary county parish holding (tCPH) number?'

describe('Answer', () => {
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
    expect(page.Answer).toBe(CphNumberAnswer)
  })
})

describe('TcphNumberPage', () => {
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

  describe('nextPage', () => {
    it('should return the correct next page when slaughter on site', () => {
      const nextPage = page.nextPage(
        {},
        {
          about: {
            movementActivityType: 'slaughter-onsite'
          }
        }
      )
      expect(nextPage).toBeInstanceOf(GridRefPage)
    })

    it('should return the correct next page when carcasses', () => {
      const nextPage = page.nextPage(
        {},
        {
          about: {
            whatIsMoving: 'carcasses'
          }
        }
      )
      expect(nextPage).toBeInstanceOf(GridRefPage)
    })

    it('should return the correct next page when when neither  slaughter on site or carcasses', () => {
      const nextPage = page.nextPage(
        {},
        {
          about: {
            whatIsMoving: 'not - carcasses',
            movementActivityType: 'not - slaughter-onsite'
          }
        }
      )
      expect(nextPage).toBeInstanceOf(MockOriginPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
