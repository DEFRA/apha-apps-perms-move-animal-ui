import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { ActionableExitPage } from '~/src/server/common/model/page/actionable-exit-page-model.js'
import {
  emailOrPostPage,
  Answer as EmailOrPostAnswer
} from '../email-or-post/index.js'
import { postUnavailablePage } from './index.js'
import { EmailPage } from '../email/index.js'

const sectionKey = 'licence'
const pageUrl =
  '/exotics/receiving-the-licence/select-post-can-not-use-this-service'
const page = postUnavailablePage
const question = 'This service does not currently send licences by post'
const view = `exotics/licence/post-unavailable/index`

describe('PostUnavailablePage', () => {
  it('should be an instance of ActionableExitPage', () => {
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
      expect(page.indirectAction.page).toBe(emailOrPostPage)
    })

    it('should return an object with answer as an instance of CphKnownAnswer', () => {
      expect(page.indirectAction.answer).toBeInstanceOf(EmailOrPostAnswer)
    })

    it('should set the value to "email" in the answer', () => {
      expect(page.indirectAction.answer.toState()).toBe('email')
    })
  })

  describe('nextPage', () => {
    it('should return cphNumberPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(EmailPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
