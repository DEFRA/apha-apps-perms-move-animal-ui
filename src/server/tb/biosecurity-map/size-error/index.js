import { ExitPage } from '../../../common/model/page/exit-page-model.js'
import { SizeErrorPageController } from './size-error-page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class SizeErrorPage extends ExitPage {
  urlPath = '/biosecurity-map/size-error'

  pageTitle = 'There was a problem uploading your biosecurity map'
  view = `tb/biosecurity-map/size-error/index`
  key = 'size-error'
  sectionKey = 'biosecurity-map'
}
export const sizeErrorPage = new SizeErrorPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const sizeError = new SizeErrorPageController(sizeErrorPage, {
  methods: ['GET', 'POST']
}).plugin()
