const pageTitle =
  'You need to complete all of the sections before you review and submit'
const heading =
  'You need to complete all of the sections before you review and submit'
const buttonText = 'Go to your application'

/**
 * A GDS styled example task list page controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const taskListIncompleteGetController = {
  handler(req, h) {
    return h.view('task-list-incomplete/index', {
      pageTitle,
      heading,
      buttonText
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
