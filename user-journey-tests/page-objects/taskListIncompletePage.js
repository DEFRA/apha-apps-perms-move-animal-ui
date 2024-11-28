import { selectElement } from '../helpers/page.js'
import { Page } from './page.js'

class TaskListIncompletePage extends Page {
  get taskListIncompletePageHeading() {
    return 'You need to complete all of the sections before you review and submit'
  }

  get taskListIncompletePageTitle() {
    return 'You need to complete all of the sections before you review and submit'
  }

  get taskListIncompletePageUrlPath() {
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
