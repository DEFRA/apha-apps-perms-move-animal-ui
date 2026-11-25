import { translate } from '../../helpers/i18n/index.js'

/**
 * A GDS styled example task list page controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const taskListIncompleteGetController = {
  handler(req, h) {
    const pageTitle = translate(
      req,
      'common.taskListIncomplete.heading',
      'You need to complete all of the sections before you review and submit'
    )
    const heading = pageTitle
    const buttonText = translate(
      req,
      'common.taskListIncomplete.button',
      'Go to your application'
    )
    return h.view('common/controller/task-list-incomplete/index', {
      pageTitle,
      heading,
      buttonText
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
