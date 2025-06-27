const pageTitle =
  'You need to complete all of the sections before you review and submit'
const heading = pageTitle
const buttonText = 'Go to your application'

/**
 * A GDS styled example task list page controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const taskListIncompleteGetController = {
  handler(_req, h) {
    return h.view('tb/task-list-incomplete/index', {
      pageTitle,
      heading,
      buttonText
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
