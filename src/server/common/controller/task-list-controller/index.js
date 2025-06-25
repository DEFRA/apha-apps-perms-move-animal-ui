import { getAuthOptions } from '../../helpers/auth/toggles-helper.js'
/** @import { ApplicationModel } from '../../model/application/application.js' */
/** @import { StateManager } from '../../model/state/state-manager.js' */

export class TaskListController {
  /** @type {string} */
  pageTitle

  /** @type {string} */
  heading

  /** @type {string} */
  buttonText

  /** @type {string} */
  path

  /** @type {string} */
  submitApplicationPath

  /**
   * @param {typeof StateManager} StateManager
   * @param {typeof ApplicationModel} ApplicationModel
   */
  constructor(StateManager, ApplicationModel) {
    this.StateManager = StateManager
    this.ApplicationModel = ApplicationModel
  }

  taskListGetHandler(req, h) {
    const visibleSections = Object.values(
      this.ApplicationModel.fromState(new this.StateManager(req).toState())
        .tasks
    )

    const gdsTasks = visibleSections.map((section) => {
      return buildGdsTaskItem(section.buildGdsTaskDetails(req))
    })

    const incompleteTasks =
      visibleSections.length -
      visibleSections.filter((section) => {
        return section.validate().isValid
      }).length

    return h.view('common/controller/task-list-controller/index', {
      pageTitle: this.pageTitle,
      heading: this.heading,
      gdsTasks,
      incompleteTasks,
      buttonText: this.buttonText
    })
  }

  /**
   * A GDS styled example task list page controller.
   * @satisfies {Partial<ServerRoute>}
   */
  taskListPostHandler(_req, h) {
    return h.redirect(this.submitApplicationPath)
  }

  taskListIncompleteGetHandler(_req, h) {
    const pageTitle =
      'You need to complete all of the sections before you review and submit'
    const heading = pageTitle
    const buttonText = 'Go to your application'
    const taskListUrl = this.path

    return h.view(
      'common/controller/task-list-controller/task-list-incomplete',
      {
        pageTitle,
        heading,
        buttonText,
        taskListUrl
      }
    )
  }

  plugin() {
    const path = this.path
    const taskListGetHandler = this.taskListGetHandler.bind(this)
    const taskListPostHandler = this.taskListPostHandler.bind(this)
    const taskListIncompleteGetHandler =
      this.taskListIncompleteGetHandler.bind(this)

    return {
      plugin: {
        name: `task-list-${this.constructor.name}`,

        register(server) {
          const options = {
            ...getAuthOptions(false)
          }

          server.route([
            {
              method: 'GET',
              path,
              handler: taskListGetHandler,
              options
            },
            {
              method: 'POST',
              path,
              handler: taskListPostHandler,
              options
            },

            {
              method: 'GET',
              path: `${path}/incomplete`,
              options,
              handler: taskListIncompleteGetHandler
            }
          ])
        }
      }
    }
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
