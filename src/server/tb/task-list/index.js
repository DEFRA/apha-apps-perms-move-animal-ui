import { TaskListController } from '../../common/controller/task-list-controller/task-list-controller.js'
import { TbApplicationModel } from '../application.js'
import { TbStateManager } from '../state-manager.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class TbTaskListController extends TaskListController {
  ApplicationModel = TbApplicationModel
  StateManager = TbStateManager

  pageTitleAndHeading =
    'Your Bovine Tuberculosis (TB) movement licence application'

  buttonText = 'Review and submit'
  urlPath = '/task-list'
  submitUrlPath = '/tb/submit/check-answers'
}

/** @satisfies {ServerRegisterPluginObject<void>} */
export const taskList = new TbTaskListController().plugin()
