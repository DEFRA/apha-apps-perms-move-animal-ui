/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'
import { Page } from '~/src/server/common/model/page/page-model.js'

const pageHeadingAndTitle =
  'You need to complete all of the sections before you review and submit'

export class TaskListIncompletePage extends Page {
  key = 'taskListIncomplete'
  sectionKey = 'exotics'
  view = 'exotics/task-list-incomplete/index.njk'
  urlPath = '/exotics/task-list-incomplete'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export const taskListIncompletePage = new TaskListIncompletePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const taskListIncomplete = new PageController(taskListIncompletePage, {
  methods: ['GET']
}).plugin()
