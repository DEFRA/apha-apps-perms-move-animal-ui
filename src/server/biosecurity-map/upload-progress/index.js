import Wreck from '@hapi/wreck'
import { BiosecurityAnswer } from '../../common/model/answer/biosecurity-map/biosecurity-map.js'
import { config } from '~/src/config/config.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { Page } from '../../common/model/page/page-model.js'
import { uploadConfig } from '../upload-config.js'

class BioSecuritySummary extends Page {
  urlPath = '/biosecurity/check-answers'
  sectionKey = 'biosecurity-map'
  question = ''
  questionKey = 'upload-plan'
}

export class UploadProgressPage extends QuestionPage {
  pageTitle = 'Uploading the biosecurity map'
  sectionKey = uploadConfig.sectionKey
  questionKey = uploadConfig.questionKey
  urlPath = `/${this.sectionKey}/uploading`

  view = `biosecurity-map/upload-progress/index`

  Answer = BiosecurityAnswer

  nextPage() {
    return new BioSecuritySummary()
  }
}

export class UploadProgressController extends QuestionPageController {
  pluginName = 'biosecurity-map-uploading'

  async handleGet(req, h) {
    /** @type {BiosecurityAnswer} */
    const upload = /** @type {BiosecurityAnswer} */ (
      this.page.Answer.fromState(req.yar.get(this.page.questionKey))
    )

    const { uploaderUrl } = config.get('fileUpload')
    const response = await Wreck.get(
      `${uploaderUrl}/status/${upload.value.metadata.uploadId}`
    )

    const status = JSON.parse(response.payload.toString())

    const answer = new this.page.Answer({
      ...upload.value,
      status
    })

    req.yar.set(this.page.questionKey, answer.toState())

    if (status.uploadStatus === 'ready') {
      return h.redirect(this.page.nextPage(req).urlPath)
    }

    h.headers = {
      'Cache-Control': 'no-store, must-revalidate, max-age=0',
      Pragma: 'no-cache'
    }

    return super.handleGet(req, h, {
      upload: status
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
