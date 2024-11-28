import { $ } from '@wdio/globals'

import { Page } from './page.js'
import * as page from '../helpers/page.js'

class TaskListPage extends Page {
  get taskListPageHeading() {
    return 'Your Bovine Tuberculosis (TB) movement licence application'
  }

  get taskListPageTitle() {
    return 'Your Bovine Tuberculosis (TB) movement licence application'
  }

  get taskListPageUrlPath() {
    return 'task-list'
  }

  get movementOriginLink() {
    return $('[href="origin/to-or-from-own-premises"]')
  }

  async selectMovementOrigin() {
    await page.selectElement(this.movementOriginLink)
  }
}

export default new TaskListPage()
