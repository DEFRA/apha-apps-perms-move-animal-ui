import { TaskListController } from '../../common/controller/task-list-controller/index.js'
import { ExoticsApplicationModel } from '../application.js'
import { ExoticStateManager } from '../state-manager.js'

const pageTitleAndHeading =
  'Your foot and mouth disease movement licence application'

class ExoticTaskList extends TaskListController {
  pageTitle = pageTitleAndHeading
  heading = pageTitleAndHeading
  buttonText = 'Review and submit'
  path = '/exotic/task-list'
  submitApplicationPath = '/exotic/submit/check-answers'
}

export const exoticTaskList = new ExoticTaskList(
  ExoticStateManager,
  ExoticsApplicationModel
).plugin()
