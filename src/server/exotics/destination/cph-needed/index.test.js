import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { cphNeededPage } from './index.js'
import { ActionableExitPage } from '~/src/server/common/model/page/actionable-exit-page-model.js'
import { CphNumberPage } from '../cph-number/index.js'
import {
  cphNumberKnownPage,
  Answer as CphKnownAnswer
} from '../cph-number-known/index.js'

const sectionKey = 'destination'
const pageUrl = '/exotics/movement-destination/cph-needed'
const page = cphNeededPage
const question = `You need the destination's CPH number to continue your application`
const view = `exotics/destination/cph-needed/index`

describe('CphNeededPage', () => {
  it('should be an instance of CphNeededPage', () => {
    expect(page).toBeInstanceOf(ActionableExitPage)
  })

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct page title', () => {
    expect(page.pageTitle).toBe(question)
  })

  describe('indirectAction', () => {
    it('should return an object with page set to cphNumberKnownPage', () => {
      expect(page.indirectAction.page).toBe(cphNumberKnownPage)
    })

    it('should return an object with answer as an instance of CphKnownAnswer', () => {
      expect(page.indirectAction.answer).toBeInstanceOf(CphKnownAnswer)
    })

    it('should set the value to "yes" in the answer', () => {
      expect(page.indirectAction.answer.toState()).toBe('yes')
    })
  })

  describe('nextPage', () => {
    it('should return cphNumberPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(CphNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
