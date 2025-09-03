import { TaskListController } from '~/src/server/common/controller/task-list-controller/task-list-controller.js'
import { FmdApplicationModel } from '../application.js'
import { FmdStateManager } from '../state-manager.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class FmdTaskListController extends TaskListController {
  ApplicationModel = FmdApplicationModel
  StateManager = FmdStateManager

  pageTitleAndHeading =
    'Your foot and mouth disease movement licence application'

  buttonText = 'Review and submit'
  urlPath = '/fmd/task-list'
  submitUrlPath = '/fmd/submit/check-answers'
}

/** @satisfies {ServerRegisterPluginObject<void>} */
export const fmdTaskList = new FmdTaskListController().plugin()
