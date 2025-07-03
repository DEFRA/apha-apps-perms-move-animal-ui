import { TaskListController } from '~/src/server/common/controller/task-list-controller/task-list-controller.js'
import { ExoticsApplicationModel } from '../application.js'
import { ExoticsStateManager } from '../state-manager.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class ExoticsTaskListController extends TaskListController {
  ApplicationModel = ExoticsApplicationModel
  StateManager = ExoticsStateManager

  pageTitleAndHeading =
    'Your foot and mouth disease movement licence application'

  buttonText = 'Review and submit'
  urlPath = '/exotics/task-list'
  submitUrlPath = '/exotics/submit/check-answers'
}

/** @satisfies {ServerRegisterPluginObject<void>} */
export const exoticsTaskList = new ExoticsTaskListController().plugin()
