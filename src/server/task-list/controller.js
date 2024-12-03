import { Origin } from '../common/model/section/origin.js'
import { Destination } from '../common/model/section/destination.js'
import { Tests } from '../common/model/section/tests.js'
import { License } from '../common/model/section/license.js'

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
    const license = License.fromState(req.yar.get('license'))
    const isOriginValid = origin.validate().isValid

    const originGdsTask = buildGdsTaskItem({
      title: 'Movement origin',
      initialLink: 'origin/to-or-from-own-premises',
      summaryLink: 'origin/summary',
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

    const licenseGdsTask = buildGdsTaskItem({
      title: 'Receiving the licence',
      initialLink: '/receiving-the-licence/licence-enter-email-address',
      summaryLink: '/receiving-the-licence/check-answers',
      isValid: license.validate().isValid,
      isEnabled: true
    })

    const gdsTasks = [
      originGdsTask,
      destinationGdsTask,
      testsGdsTask,
      licenseGdsTask
    ]

    const allTasks = [origin, destination, tests, license]
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
  handler(req, h) {
    const validations = [
      Origin.fromState(req.yar.get('origin')).validate().isValid,
      Destination.fromState().validate().isValid,
      Tests.fromState().validate().isValid,
      License.fromState(req.yar.get('license')).validate().isValid
    ]

    const isAllValid = validations.every(Boolean)

    return h.redirect(isAllValid ? '/check-answers' : '/task-list-incomplete')
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
