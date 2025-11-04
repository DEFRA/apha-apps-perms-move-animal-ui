import { SummaryPageController } from '@defra/forms-engine-plugin/controllers/SummaryPageController.js'

const SAVE_AND_EXIT_ACTION = 'save-and-exit'

/**
 * Custom summary controller that keeps form state and returns users to the TB task list.
 */
export class BiosecuritySummaryPageController extends SummaryPageController {
  async hasMissingNotificationEmail() {
    return false
  }

  async handleFormSubmit(request, context, h) {
    const action = request.payload.action

    if (action === SAVE_AND_EXIT_ACTION) {
      return super.handleFormSubmit(request, context, h)
    }

    const fallback = '/tb/task-list'
    const redirectTo =
      typeof request.query?.returnUrl === 'string'
        ? request.query.returnUrl
        : fallback

    return this.proceed(request, h, redirectTo)
  }
}
