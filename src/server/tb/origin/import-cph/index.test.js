import { importCphPage, ImportCphPage } from './index.js'
import { CphNumberAnswer } from '../../../common/model/answer/cph-number/cph-number.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { cphNumberPage } from '../cph-number/index.js'
import { importAddressPage } from '../import-address/index.js'

const sectionKey = 'origin'
const question =
  'What is the County Parish Holding (CPH) number of the UK point of entry?'
const questionKey = 'cphNumber'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/origin/import-cph'

describe('ImportCphPage', () => {
  const page = new ImportCphPage()

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

  it('should share a question key with CphNumberPage, since they control the sae data', () => {
    expect(page.sectionKey).toBe(cphNumberPage.sectionKey)
    expect(page.questionKey).toBe(cphNumberPage.questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(CphNumberAnswer)
  })

  it('nextPage should return address page', () => {
    const answer = new CphNumberAnswer({ cphNumber: '12/123/1234' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(importAddressPage)
  })

  it('should export page', () => {
    expect(importCphPage).toBeInstanceOf(ImportCphPage)
  })
})

describePageSnapshot({
  describes: '#ImportCphPage.content',
  it: 'should render expected response and content',
  pageUrl
})
