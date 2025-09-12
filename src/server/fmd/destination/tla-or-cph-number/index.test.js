import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { tlaOrCphNumberPage } from './index.js'
import { PremisesTypePage } from '../premises-type/index.js'
import { TlaOrTcphNumberAnswer } from '../../common/model/answer/tla-tcph-number/tla-or-tcph-number.js'

const sectionKey = 'destination'
const questionKey = 'tlaOrTcphNumber'
const pageUrl = '/fmd/movement-destination/TLA-or-tCPH-number'
const page = tlaOrCphNumberPage
const question =
  'What is the TLA or temporary county parish holding (tCPH) number?'

describe('TlaOrCphNumberPage', () => {
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
    expect(page.Answer).toBe(TlaOrTcphNumberAnswer)
  })

  describe('nextPage', () => {
    it('should return premisesTypePage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(PremisesTypePage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
