import { $ } from '@wdio/globals'

import { Page } from './page.js'
import * as page from '../helpers/page.js'

class TaskListPage extends Page {
  get pageHeading() {
    return 'Your Bovine Tuberculosis (TB) movement licence application'
  }

  get pageTitle() {
    return 'Your Bovine Tuberculosis (TB) movement licence application'
  }

  get pagePath() {
    return 'task-list'
  }

  get movementOriginLink() {
    return $('aria/Movement origin')
  }

  get receivingTheLicenceLink() {
    return $('aria/Receiving the licence')
  }

  get reviewLink() {
    return $('aria/Review and submit')
  }

  async getTaskToCompleteCount() {
    const element = await $('[data="test-id-task-to-complete-count"]')
    return element.getText()
  }

  async selectMovementOrigin() {
    await page.selectElement(this.movementOriginLink)
  }

  async selectReceiveTheLicence() {
    await page.selectElement(this.receivingTheLicenceLink)
  }

  async verifyStatus({ position, taskTitle, expectedStatus }) {
    const task = (await $$('.govuk-task-list__item'))[position - 1]
    const status = await task.$(`#task-list-${position}-status`)

    expect(await task.getText()).toContain(taskTitle)
    expect(await status.getText()).toContain(expectedStatus)
  }

  async selectReview() {
    await page.selectElement(this.reviewLink)
  }
}

export default new TaskListPage()
