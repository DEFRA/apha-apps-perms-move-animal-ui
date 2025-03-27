import {
  selectElement,
  typeIntoElement,
  waitForEnabled,
  waitForPagePath
} from '../helpers/page.js'
import { Page } from '../page-objects/page.js'
import taskListPage from './taskListPage.js'

class SignInPage extends Page {
  pagePath = 'login/signin/creds'
  pageHeading = 'Sign in using Government Gateway'
  pageTitle = 'Sign in using Government Gateway - Government Gateway - GOV.UK'
  testId = '316462696033'
  testPassword = 'defraTest123'

  get idInput() {
    return $('#user_id')
  }

  get passwordInput() {
    return $('#password')
  }

  get signInButton() {
    return $('#continue')
  }

  async signInUsingTestCredentials() {
    await browser.url(taskListPage.pagePath)
    await this.verifyPageHeadingAndTitle()

    await typeIntoElement(this.idInput, this.testId)
    await typeIntoElement(this.passwordInput, this.testPassword)

    await waitForEnabled(this.signInButton, {
      timeoutMsg:
        'Expected sign-in button to become enabled within default timeout'
    })

    await expect(this.signInButton).toBeEnabled()

    await selectElement(this.signInButton)
    await waitForPagePath(taskListPage.pagePath)
  }
}

export default new SignInPage()
