import { $ } from '@wdio/globals'

import { Page } from '../../TB/page-objects/page.js'
import * as page from '../../TB/helpers/page.js'

const pageHeadingAndTitle =
  'Your foot and mouth disease movement licence application'

class TaskListPage extends Page {
  pagePath = 'exotics/task-list'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get aboutMovementLink() {
    return $('aria/About the movement')
  }

  get movementOriginLink() {
    return $('aria/Movement origin')
  }

  get visitDetailsLink() {
    return $('aria/Visit details')
  }

  get reviewLink() {
    return $('aria/Review and submit')
  }

  async getTaskToCompleteCount() {
    const element = await $('[data="test-id-task-to-complete-count"]')
    return element.getText()
  }

  async selectAboutMovement(nextPage) {
    await page.selectElement(this.aboutMovementLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectMovementOrigin(nextPage) {
    await page.selectElement(this.movementOriginLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectVisitDetails(nextPage) {
    await page.selectElement(this.visitDetailsLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async verifyStatus({ position, taskTitle, expectedStatus }) {
    const task = (await $$('.govuk-task-list__item'))[position - 1]
    const status = await task.$(`#task-list-${position}-status`)

    expect(await task.getText()).toContain(taskTitle)
    expect(await status.getText()).toContain(expectedStatus)
  }

  async verifyAllStatus(statusArray) {
    for (const { position, taskTitle, expectedStatus } of statusArray) {
      await this.verifyStatus({ position, taskTitle, expectedStatus })
    }
  }

  async selectReview() {
    await page.selectElement(this.reviewLink)
  }
}

export default new TaskListPage()
