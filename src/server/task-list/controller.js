import { Origin } from '../common/model/section/origin.js'
import { Destination } from '../common/model/section/destination.js'
import { Tests } from '../common/model/section/tests.js'
import { Licence } from '../common/model/section/licence.js'

const pageTitle = 'Your Bovine Tuberculosis (TB) movement licence application'
const heading = pageTitle
const buttonText = 'Review and submit'

/**
 * A GDS styled example task list page controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const taskListGetController = {
  handler(req, h) {
    const application = {
      origin: Origin.fromState(req.yar.get('origin')),
      destination: Destination.fromState(),
      tests: Tests.fromState(),
      licence: Licence.fromState(req.yar.get('licence'))
    }

    const tasks = Object.values(application)

    const gdsTasks = Object.values(application).map((section) => {
      return buildGdsTaskItem({
        title: section.title,
        initialLink: section.initialPage.urlPath,
        summaryLink: section.summaryPageLink,
        isValid: section.validate().isValid,
        isEnabled: section.isEnabled
      })
    })

    const allTasks = tasks
    const incompleteTasks = allTasks.reduce((acc, task) => {
      if (!task.validate().isValid) {
        acc += 1
      }

      return acc
    }, 0)

    return h.view('task-list/index', {
      pageTitle,
      heading,
      gdsTasks,
      items: Object.values(application).map((section) => {
        return {
          title: section.title,
          initialLink: section.initialPage.urlPath,
          summaryLink: section.summaryPageLink,
          isValid: section.validate().isValid,
          isEnabled: section.isEnabled
        }
      }),
      incompleteTasks,
      buttonText
    })
  }
}

/**
 * A GDS styled example task list page controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const taskListPostController = {
  handler(_req, h) {
    return h.redirect('/submit/check-answers')
  }
}

/**
 * @param {object} params - The parameters to configure the GDS task item.
 * @param {string} params.title - The title of the task item.
 * @param {string} params.initialLink - The URL link to navigate when the task is incomplete or not enabled.
 * @param {string} params.summaryLink - The URL link to navigate when the task is completed.
 * @param {boolean} params.isValid - Indicates whether the task is valid or completed.
 * @param {boolean} params.isEnabled - Indicates whether the task is enabled and can be interacted with.
 * @returns {object} A GDS task item object ready to be used in a nunjucks template.
 */
function buildGdsTaskItem({
  title,
  initialLink,
  summaryLink,
  isValid,
  isEnabled
}) {
  let status, href
  if (!isEnabled) {
    status = {
      text: 'Cannot start yet',
      classes: 'govuk-task-list__status--cannot-start-yet'
    }
  } else if (isValid) {
    status = {
      text: 'Completed',
      classes: ''
    }
    href = summaryLink
  } else {
    status = {
      tag: {
        text: 'Incomplete',
        classes: 'govuk-tag--blue'
      }
    }
    href = initialLink
  }

  return {
    title: {
      text: title
    },
    href,
    status
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
