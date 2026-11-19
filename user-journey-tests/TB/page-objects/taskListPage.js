import { $ } from '@wdio/globals'

import { Page } from './page.js'
import * as page from '../helpers/page.js'
import { secureDeviceArray } from '../helpers/constants.js'

const pageHeadingAndTitle =
  'Your Bovine Tuberculosis (TB) movement licence application'
const normalizeText = (text) => text.replace(/\s+/g, ' ').trim()

class TaskListPage extends Page {
  pagePath = 'task-list'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get movementOriginLink() {
    return $('aria/Movement origin')
  }

  get receivingTheLicenceLink() {
    return $('aria/Receiving the licence')
  }

  get movementDestinationLink() {
    return $('aria/Movement destination')
  }

  get animalIdentifiersLink() {
    return $('aria/Animal identification')
  }

  get biosecurityLink() {
    return $('aria/Biosecurity details')
  }

  get biosecurityMapLink() {
    return $('aria/Biosecurity map')
  }

  get reviewLink() {
    return $('aria/Review and submit')
  }

  async getTaskToCompleteCount() {
    const element = await $('[data="test-id-task-to-complete-count"]')
    return normalizeText(await element.getText())
  }

  async selectMovementOrigin(nextPage) {
    await page.selectElement(this.movementOriginLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectReceiveTheLicence(nextPage) {
    await page.selectElement(this.receivingTheLicenceLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectMovementDestination(nextPage) {
    await page.selectElement(this.movementDestinationLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectAnimalIdentificationLink(nextPage) {
    await page.selectElement(this.animalIdentifiersLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectBiosecurityLink(nextPage) {
    await page.selectElement(this.biosecurityLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectBiosecurityMapLink(nextPage) {
    await page.selectElement(this.biosecurityMapLink)
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

  async verifyWelshTranslationAndRestoreEnglish(remaining, total) {
    const titles = {
      'Movement origin': 'Tarddiad y symudiad',
      'Movement destination': 'Cyrchfan symud',
      'Receiving the licence': 'Derbyn y drwydded',
      'Animal identification': 'Adnabod anifeiliaid',
      'Biosecurity details': 'Manylion bioddiogelwch',
      'Biosecurity map': 'Map bioddiogelwch'
    }
    const statuses = {
      Incomplete: 'Anghyflawn',
      Completed: 'Wedi cwblhau',
      'Cannot start yet': 'Methu dechrau eto'
    }
    const readTasks = async () => {
      const tasks = []
      for (const item of await $$('.govuk-task-list__item')) {
        const link = await item.$('a')
        tasks.push({
          title: normalizeText(
            await item.$('.govuk-task-list__name-and-hint').getText()
          ),
          status: normalizeText(
            await item.$('.govuk-task-list__status').getText()
          ),
          href: (await link.isExisting())
            ? await link.getAttribute('href')
            : null
        })
      }
      return tasks
    }
    const englishTasks = await readTasks()
    expect(englishTasks).toHaveLength(total)
    const button = $('main form button')
    const buttonClass = await button.getAttribute('class')

    try {
      await page.selectElement(this.getLanguageLink('cy'))
      await expect(this.getPageHeading()).toHaveText(
        'Eich cais am drwydded symud Twbercwlosis Buchol (TB)'
      )
      expect(await readTasks()).toEqual(
        englishTasks.map(({ title, status, href }) => ({
          title: titles[title],
          status: statuses[status],
          href
        }))
      )
      const progress = normalizeText(await this.getIntroText().getText())
      expect(progress).toBe(
        remaining === 0
          ? 'Rydych wedi cwblhau pob adran.'
          : `Mae gennych ${remaining} allan o ${total} adran ar ôl i'w cwblhau.`
      )
      await expect(button).toHaveText('Adolygu a chyflwyno')
      expect(await button.getAttribute('class')).toBe(buttonClass)
    } finally {
      await page.selectElement(this.getLanguageLink('en'))
      await this.verifyPageHeadingAndTitle()
    }
    expect(await readTasks()).toEqual(englishTasks)
    await expect(button).toHaveText('Review and submit')
  }

  async selectReview() {
    await page.selectElement(this.reviewLink)
    if (secureDeviceArray.includes(browser.capabilities?.deviceName)) {
      await page.checkForSecurityPopUpAndResolve()
    }
  }
}

export default new TaskListPage()
