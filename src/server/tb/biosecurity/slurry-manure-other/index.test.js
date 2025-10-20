import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { disinfectantPage } from '../disinfectant/index.js'
import { SlurryManureOtherPage, slurryManureOtherPage } from './index.js'
import { SlurryManureOtherAnswer } from '../../../common/model/answer/slurry-manure-other/slurry-manure-other.js'

const sectionKey = 'biosecurity'
const question =
  'What other measures are being taken to manage slurry and manure?'
const questionKey = 'SlurryManureOther'
const pageUrl = '/biosecurity/manure-and-slurry-details-other'

describe('SlurryManureOtherPage', () => {
  const page = new SlurryManureOtherPage()

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
    expect(page.Answer).toBe(SlurryManureOtherAnswer)
  })

  it('nextPage should return disinfectant page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(disinfectantPage)
  })

  it('should export page', () => {
    expect(slurryManureOtherPage).toBeInstanceOf(SlurryManureOtherPage)
  })

  describePageSnapshot({
    describes: 'slurryManureOtherPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
