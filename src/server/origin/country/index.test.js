import { CountryAnswer } from '../../common/model/answer/country/country.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { importCphPage } from '../import-cph/index.js'
import { countryPage, CountryPage } from './index.js'
/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */

const sectionKey = 'origin'
const question = 'Which country are the animals coming from?'
const questionKey = 'country'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/origin/country'

describe('CountryPage', () => {
  const page = new CountryPage()

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
    expect(page.Answer).toBe(CountryAnswer)
  })

  it('nextPage should return manure and slurry page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toEqual(importCphPage)
  })

  it('should export page', () => {
    expect(countryPage).toBeInstanceOf(CountryPage)
  })

  describePageSnapshot({
    describes: 'CountryPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
