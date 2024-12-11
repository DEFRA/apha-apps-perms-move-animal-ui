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

    const gdsTasks = tasks.map((section) => {
      return {
        title: section.title,
        initialLink: section.initialPage.urlPath,
        summaryLink: section.summaryPageLink,
        isValid: section.validate().isValid,
        isEnabled: section.isEnabled
      }
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
      tasks: gdsTasks,
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
 * @import { ServerRoute } from '@hapi/hapi'
 */
