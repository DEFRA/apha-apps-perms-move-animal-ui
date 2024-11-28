import { Origin } from '../common/model/origin/origin.js'
import { Destination } from '../common/model/destination/destination.js'
import { Tests } from '../common/model/tests/tests.js'
import { License } from '../common/model/license/license.js'

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
    const license = License.fromState()
    const isOriginValid = origin.validate().isValid

    const originGdsTask = buildGdsTaskItem(
      'Movement origin',
      'origin/to-or-from-own-premises',
      'origin/summary',
      isOriginValid,
      true
    )
    const destinationGdsTask = buildGdsTaskItem(
      'Movement destination',
      '#',
      '#',
      destination.validate().isValid,
      isOriginValid
    )
    const testsGdsTask = buildGdsTaskItem(
      'Tests',
      '#',
      '#',
      tests.validate().isValid,
      isOriginValid
    )
    const licenseGdsTask = buildGdsTaskItem(
      'Receiving the licence',
      '#',
      '#',
      license.validate().isValid,
      true
    )

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
      License.fromState().validate().isValid
    ]

    const isAllValid = validations.every(Boolean)

    return h.redirect(isAllValid ? '/check-answers' : '/task-list-incomplete')
  }
}

/**
 * @param {string} title
 * @param {string} initialLink
 * @param {string} summaryLink
 * @param {boolean} isValid
 * @param {boolean} isEnabled
 */
function buildGdsTaskItem(title, initialLink, summaryLink, isValid, isEnabled) {
  const status = {
    text: !isEnabled
      ? 'Cannot start yet'
      : isValid
        ? 'Completed'
        : 'Incomplete',
    classes: !isEnabled ? 'govuk-task-list__status--cannot-start-yet' : ''
  }

  const statusTag = {
    tag: {
      ...status,
      classes: 'govuk-tag--blue'
    }
  }

  return {
    title: {
      text: title
    },
    href: isEnabled ? (isValid ? summaryLink : initialLink) : null,
    status: isValid || !isEnabled ? status : statusTag
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
