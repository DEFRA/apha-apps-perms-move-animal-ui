import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { cphNumberPage } from './index.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { ResponsiblePersonNamePage } from '../responsible-person-name/index.js'

const sectionKey = 'destination'
const questionKey = 'cphNumber'
const pageUrl = '/exotics/movement-destination/cph-number'
const page = cphNumberPage
const question = 'What is the CPH number for the destination premises?'

describe('CphNumberPage', () => {
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

  describe('nextPage', () => {
    it('should return ResponsiblePersonNamePage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(ResponsiblePersonNamePage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
