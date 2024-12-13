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
    const origin = Origin.fromState(req.yar.get('origin'))
    const destination = Destination.fromState()
    const tests = Tests.fromState()
    const licence = Licence.fromState(req.yar.get('licence'))
    const originValidity = origin.validate()

    const isOriginValid = originValidity.isValid

    const originGdsTask = buildGdsTaskItem({
      title: 'Movement origin',
      initialLink:
        originValidity.firstInvalidPage?.urlPath ?? origin.firstPage.urlPath,
      summaryLink: 'origin/check-answers',
      isValid: isOriginValid,
      isEnabled: true
    })

    const destinationGdsTask = buildGdsTaskItem({
      title: 'Movement destination',
      initialLink: '#',
      summaryLink: '#',
      isValid: destination.validate().isValid,
      isEnabled: isOriginValid
    })

    const testsGdsTask = buildGdsTaskItem({
      title: 'Tests',
      initialLink: '#',
      summaryLink: '#',
      isValid: tests.validate().isValid,
      isEnabled: isOriginValid
    })

    const licenceGdsTask = buildGdsTaskItem({
      title: 'Receiving the licence',
      initialLink: '/receiving-the-licence/licence-enter-email-address',
      summaryLink: '/receiving-the-licence/check-answers',
      isValid: licence.validate().isValid,
      isEnabled: true
    })

    const gdsTasks = [
      originGdsTask,
      destinationGdsTask,
      testsGdsTask,
      licenceGdsTask
    ]

    const allTasks = [origin, destination, tests, licence]
    const incompleteTasks =
      allTasks.length -
      allTasks.filter((task) => {
        return task.validate().isValid
      }).length

    return h.view('task-list/index', {
      pageTitle,
      heading,
      gdsTasks,
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
