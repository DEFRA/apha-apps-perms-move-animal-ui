import { getAuthOptions } from '../../helpers/auth/toggles-helper.js'
import { translate } from '../../helpers/i18n/index.js'

/** @import { StateManager } from '../../model/state/state-manager.js' */
/** @import { ApplicationModel } from '../../model/application/application.js' */
/** @import { ServerRoute } from '@hapi/hapi' */
/** @import { Request } from '@hapi/hapi' */
/** @import { TaskDetailsViewModel } from '../../model/section/section-model/section-model.js' */

export class TaskListController {
  /** @type {typeof ApplicationModel} */
  ApplicationModel

  /** @type {typeof StateManager} */
  StateManager

  /** @type {string} */
  pageTitleAndHeading

  /** @type {string | undefined} */
  titleAndHeadingI18nKey

  /** @type {string} */
  buttonText

  /** @type {string | undefined} */
  buttonTextI18nKey

  /** @type {string} */
  pageTitle

  /** @type {string} */
  urlPath

  /** @type {string} */
  submitUrlPath

  async taskListGetHandler(req, h) {
    const applicationState = new this.StateManager(req).toState()
    const application = await this.ApplicationModel.fromRequest(
      req,
      applicationState
    )
    const visibleSections = Object.values(application.tasks)

    const gdsTasks = await Promise.all(
      visibleSections.map(async (section) => {
        return buildGdsTaskItem(
          await section.taskDetailsViewModel(req, applicationState),
          req
        )
      })
    )

    const incompleteTasks =
      visibleSections.length -
      visibleSections.filter((section) => {
        return section.validate().isValid
      }).length

    const pageTitle = translate(
      req,
      this.titleAndHeadingI18nKey,
      this.pageTitleAndHeading
    )
    const buttonText = translate(req, this.buttonTextI18nKey, this.buttonText)

    return h.view('common/controller/task-list-controller/index.njk', {
      pageTitle,
      heading: pageTitle,
      gdsTasks,
      incompleteTasks,
      buttonText
    })
  }

  taskListPostHandler(_req, h) {
    return h.redirect(this.submitUrlPath)
  }

  plugin() {
    const options = {
      ...getAuthOptions()
    }

    /** @type {ServerRoute[]} */
    const routes = [
      {
        method: 'GET',
        path: this.urlPath,
        handler: this.taskListGetHandler.bind(this),
        options
      },
      {
        method: 'POST',
        path: this.urlPath,
        handler: this.taskListPostHandler.bind(this),
        options
      }
    ]

    return {
      plugin: {
        name: `task-list-${this.constructor.name}`,
        register(server) {
          server.route(routes)
        }
      }
    }
  }
}

/**
 * @param {TaskDetailsViewModel} params - The section details used to configure the GDS task item.
 * @param {Request} req
 * @returns {object} A GDS task item object ready to be used in a nunjucks template.
 */
function buildGdsTaskItem(
  { title, initialLink, summaryLink, isValid, isEnabled },
  req
) {
  let status, href
  if (!isEnabled) {
    status = {
      text: translate(
        req,
        'common.taskList.status.cannotStartYet',
        'Cannot start yet'
      ),
      classes: 'govuk-task-list__status--cannot-start-yet'
    }
  } else if (isValid) {
    status = {
      text: translate(req, 'common.taskList.status.completed', 'Completed'),
      classes: ''
    }
    href = summaryLink
  } else {
    status = {
      tag: {
        text: translate(req, 'common.taskList.status.incomplete', 'Incomplete'),
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
