import { TaskListController } from '../../common/controller/task-list-controller/task-list-controller.js'
import { TbApplicationModel } from '../application.js'
import { TbStateManager } from '../state-manager.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class TbTaskListController extends TaskListController {
  ApplicationModel = TbApplicationModel
  StateManager = TbStateManager

  pageTitleAndHeading =
    'Your Bovine Tuberculosis (TB) movement licence application'
  pageTitleAndHeadingI18nKey = 'tb.taskList.title'

  buttonText = 'Review and submit'
  buttonTextI18nKey = 'tb.taskList.buttonText'
  urlPath = '/task-list'
  submitUrlPath = '/tb/submit/check-answers'
}

/** @satisfies {ServerRegisterPluginObject<void>} */
export const tbTaskList = new TbTaskListController().plugin()
