import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'
import { uploadProgressPage } from '../upload-progress/index.js'
import { BiosecurityAnswer } from '../../common/model/answer/biosecurity-map/biosecurity-map.js'
import { uploadConfig } from '../upload-config.js'

/**
 * @import { Page } from '../../common/model/page/page-model.js'
 */

export class UploadPlanPage extends QuestionPage {
  question = 'Upload a biosecurity map'
  sectionKey = uploadConfig.sectionKey
  questionKey = uploadConfig.questionKey
  urlPath = `/${this.sectionKey}/${this.questionKey}`

  view = `biosecurity-map/upload-plan/index`

  Answer = BiosecurityAnswer

  nextPage() {
    return uploadProgressPage
  }
}

export class UploadPlanController extends QuestionPageController {
  async handleGet(req, h) {
    const { bucket, uploaderUrl, path } = config.get('fileUpload')

    const response = await Wreck.post(`${uploaderUrl}/initiate`, {
      payload: JSON.stringify({
        redirect: this.page.nextPage(req).urlPath,
        s3Bucket: bucket,
        s3Path: path
      })
    })

    const data = JSON.parse(response.payload.toString())

    const answer = new this.page.Answer({
      metadata: data
    })

    req.yar.set(this.page.questionKey, answer.toState())

    h.headers = {
      'Cache-Control': 'no-store, must-revalidate, max-age=0',
      Pragma: 'no-cache'
    }

    return super.handleGet(req, h, {
      upload: data
    })
  }
}

export const uploadPlanPage = new UploadPlanPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const uploadPlan = new UploadPlanController(uploadPlanPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
