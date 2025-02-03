import Wreck from '@hapi/wreck'
import { Page } from '../../common/model/page/page-model.js'
import { PageController } from '../../common/controller/page-controller/page-controller.js'

/**
 * @import {NextPage} from '../../common/helpers/next-page.js'
 * @import {ConfirmationPayload} from '../../common/model/answer/confirmation/confirmation.js'
 */

export class UploadProgressPage extends Page {
  question = 'Uploading the biosecurity map'
  sectionKey = 'biosecurity-map'
  questionKey = 'uploading'
  urlPath = `/${this.sectionKey}/${this.questionKey}`

  view = `biosecurity-map/upload-progress/index`

  nextPage() {
    return {
      urlPath: '/404'
    }
  }
}

export class UploadProgressController extends PageController {
  async handleGet(req, h) {
    const upload = req.yar.get('upload')
    const response = await Wreck.get(upload.statusUrl)

    const data = JSON.parse(response.payload.toString())

    if (data.uploadStatus === 'ready') {
      req.yar.set('upload', data)
      return h.redirect(this.page.nextPage(req).urlPath)
    }

    h.headers = {
      'Cache-Control': 'no-store, must-revalidate, max-age=0',
      Pragma: 'no-cache'
    }

    return super.handleGet(req, h, {
      upload: data
    })
  }
}

export const uploadProgressPage = new UploadProgressPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const uploadProgress = new UploadProgressController(
  uploadProgressPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
