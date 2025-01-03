import { Page } from '../common/model/page/page-model.js'
import { PageController } from '../common/controller/page-controller/page-controller.js'
import { ApplicationModel } from '../common/model/application/application.js'
import { OriginSection } from '../common/model/section/origin/origin.js'
import { DestinationSection } from '../common/model/section/destination/destination.js'
import { LicenceSection } from '../common/model/section/licence/licence.js'

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

export class SubmitSummaryPage extends Page {
  pageTitle = 'Check your answers before sending your application'
  pageHeading = 'Check your answers before sending your application'
  sectionKey = 'submit-2'
  urlPath = `/${this.sectionKey}/check-answers`

  urlKey = 'use-general-licence'
  view = `task-list/index`

  viewProps(req) {
    const application = {
      origin: OriginSection.fromState(req.yar.get('origin')),
      destination: DestinationSection.fromState(req.yar.get('destination')),
      licence: LicenceSection.fromState(req.yar.get('licence'))
    }

    const originValidity = application.origin.validate()
    const destinationValidity = application.destination.validate()

    const isOriginValid = originValidity.isValid

    const originGdsTask = buildGdsTaskItem({
      title: 'Movement origin',
      initialLink:
        originValidity.firstInvalidPage?.urlPath ??
        application.origin.firstPage.urlPath,
      summaryLink: 'origin/check-answers',
      isValid: isOriginValid,
      isEnabled: true
    })

    const destinationGdsTask = buildGdsTaskItem({
      title: 'Movement destination',
      initialLink:
        destinationValidity.firstInvalidPage?.urlPath ??
        application.destination.firstPage.urlPath,
      summaryLink: '/destination/check-answers',
      isValid: destinationValidity.isValid,
      isEnabled: isOriginValid
    })

    const licenceGdsTask = buildGdsTaskItem({
      title: 'Receiving the licence',
      initialLink: '/receiving-the-licence/licence-enter-email-address',
      summaryLink: '/receiving-the-licence/check-answers',
      isValid: application.licence.validate().isValid,
      isEnabled: true
    })

    const gdsTasks = [originGdsTask, destinationGdsTask, licenceGdsTask]

    const allTasks = [
      application.origin,
      application.destination,
      application.licence
    ]

    const incompleteTasks =
      allTasks.length -
      allTasks.filter((task) => {
        return task.validate().isValid
      }).length

    return {
      gdsTasks,
      incompleteTasks,
      buttonText: 'Review and submit'
    }
  }
}

export const submitSummaryPage = new SubmitSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submitSummary = new PageController(
  new SubmitSummaryPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
