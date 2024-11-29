import { selectElement } from '../helpers/page.js'
import { Page } from './page.js'

const pageHeadingAndTitle =
  'You need to complete all of the sections before you review and submit'

class TaskListIncompletePage extends Page {
  get pageHeading() {
    return pageHeadingAndTitle
  }

  get pageTitle() {
    return pageHeadingAndTitle
  }

  get pagePath() {
    return 'task-list-incomplete'
  }

  get goToApplicationElement() {
    return $('aria/Go to your application')
  }

  async selectGoToApplication() {
    return selectElement(await this.goToApplicationElement)
  }
}

export default new TaskListIncompletePage()
