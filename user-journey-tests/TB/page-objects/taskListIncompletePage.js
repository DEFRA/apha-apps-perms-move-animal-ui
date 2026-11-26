import {
  selectElement,
  selectLinkAndVerifyTitle,
  validateElementVisibleAndText,
  waitForPagePath,
  verifyPageTitle
} from '../helpers/page.js'
import taskListPage from './taskListPage.js'
import { Page } from './page.js'

const pageHeadingAndTitle =
  'You need to complete all of the sections before you review and submit'

class TaskListIncompletePage extends Page {
  pagePath = '/tb/task-list-incomplete'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get goToApplicationElement() {
    return $('main a[href="/task-list"]')
  }

  async selectGoToApplication() {
    return selectElement(await this.goToApplicationElement)
  }

  async verifyWelshAndEnglishTranslations() {
    const welshHeading =
      "Mae angen i chi gwblhau pob un o'r adrannau cyn i chi adolygu a chyflwyno"
    const welshTaskListTitle =
      'Eich cais am drwydded symud Twbercwlosis Buchol (TB)'

    await selectLinkAndVerifyTitle(this.getLanguageLink('cy'), welshHeading)
    await expect($('html')).toHaveAttribute('lang', 'cy')
    await validateElementVisibleAndText(this.getPageHeading(), welshHeading)
    await expect(this.goToApplicationElement).toHaveText("Ewch i'ch cais")
    await expect(this.goToApplicationElement).toHaveAttribute(
      'href',
      '/task-list'
    )
    await this.selectGoToApplication()
    await waitForPagePath(taskListPage.pagePath)
    await verifyPageTitle(welshTaskListTitle)
    await expect($('html')).toHaveAttribute('lang', 'cy')

    await taskListPage.selectReview()
    await waitForPagePath(this.pagePath)
    await verifyPageTitle(welshHeading)
    await selectLinkAndVerifyTitle(this.getLanguageLink('en'), this.pageTitle)
    await this.verifyPageHeadingAndTitle()
    await expect($('html')).toHaveAttribute('lang', 'en')
    await expect(this.goToApplicationElement).toHaveText(
      'Go to your application'
    )
    await expect(this.goToApplicationElement).toHaveAttribute(
      'href',
      '/task-list'
    )
    await this.selectGoToApplication()
    await waitForPagePath(taskListPage.pagePath)
    await taskListPage.verifyPageHeadingAndTitle()
    await expect($('html')).toHaveAttribute('lang', 'en')
  }
}

export default new TaskListIncompletePage()
