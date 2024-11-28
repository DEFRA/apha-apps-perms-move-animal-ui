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
    return $('aria/Movement origin')
  }

  async selectMovementOrigin() {
    await page.selectElement(this.movementOriginLink)
  }

  async verifyStatus({ position, taskTitle, expectedStatus }) {
    const task = (await $$('.govuk-task-list__item'))[position - 1]
    const status = await task.$(`#task-list-${position}-status`)

    expect(await task.getText()).toContain(taskTitle)
    expect(await status.getText()).toBe(expectedStatus)
  }
}

export default new TaskListPage()
