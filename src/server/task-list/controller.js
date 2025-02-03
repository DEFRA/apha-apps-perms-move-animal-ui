import { OriginSection } from '../common/model/section/origin/origin.js'
import { DestinationSection } from '../common/model/section/destination/destination.js'
import { LicenceSection } from '../common/model/section/licence/licence.js'
import { BiosecuritySection } from '../common/model/section/biosecurity/biosecurity.js'

const pageTitle = 'Your Bovine Tuberculosis (TB) movement licence application'
const heading = pageTitle
const buttonText = 'Review and submit'

/**
 * A GDS styled example task list page controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const taskListGetController = {
  handler(req, h) {
    const origin = OriginSection.fromState(req.yar.get('origin'))
    const destination = DestinationSection.fromState(req.yar.get('destination'))
    const licence = LicenceSection.fromState(req.yar.get('licence'))
    const biosecurity = BiosecuritySection.fromState(req.yar.get('biosecurity'))

    const originValidity = origin.validate()
    const destinationValidity = destination.validate()

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
      initialLink:
        destinationValidity.firstInvalidPage?.urlPath ??
        destination.firstPage.urlPath,
      summaryLink: '/destination/check-answers',
      isValid: destinationValidity.isValid,
      isEnabled: isOriginValid
    })

    const licenceGdsTask = buildGdsTaskItem({
      title: 'Receiving the licence',
      initialLink: licence.firstPage.urlPath,
      summaryLink: '/receiving-the-licence/check-answers',
      isValid: licence.validate().isValid,
      isEnabled: true
    })

    const biosecurityGdsTask = buildGdsTaskItem({
      title: 'Biosecurity',
      initialLink: biosecurity.firstPage.urlPath,
      summaryLink: '/biosecurity/check-answers',
      isValid: biosecurity.validate().isValid,
      isEnabled: true
    })

    const gdsTasks = [
      originGdsTask,
      destinationGdsTask,
      licenceGdsTask,
      biosecurityGdsTask
    ]

    const allTasks = [origin, destination, licence, biosecurity]
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
