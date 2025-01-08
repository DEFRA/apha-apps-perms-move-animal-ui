import { ExitPage } from '../../common/model/page/exit-page-model.js'
import { PageController } from '../../common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class ExitPagePost extends ExitPage {
  urlPath = '/licence/post'
  pageTitle = 'This service does not currently send licences by post'
  view = `licence/postExitPage/index`
  // sectionKey = 'licence'
  // key = 'post'
}
export const exitPagePost = new ExitPagePost()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const postExitPage = new PageController(exitPagePost, {
  methods: ['GET']
}).plugin()
