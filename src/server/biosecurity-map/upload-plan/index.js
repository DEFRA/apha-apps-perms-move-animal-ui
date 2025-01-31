import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { ConfirmationAnswer } from '../../common/model/answer/confirmation/confirmation.js'
import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'
import { assert } from 'console'

/**
 * @import {NextPage} from '../../common/helpers/next-page.js'
 * @import {ConfirmationPayload} from '../../common/model/answer/confirmation/confirmation.js'
 */

export class UploadPlanPage extends QuestionPage {
  question = 'Upload a biosecurity map'
  sectionKey = 'biosecurity-map'
  questionKey = 'upload-plan'
  urlPath = `/${this.sectionKey}/${this.questionKey}`

  view = `biosecurity-map/upload-plan/index`

  Answer = ConfirmationAnswer
}

export class UploadPlanController extends QuestionPageController {
  constructor(page) {
    super(page)

    const { bucket, uploaderUrl } = config.get('fileUpload')

    assert(bucket, 'fileUpload.bucket is required')
    assert(uploaderUrl, 'fileUpload.uploaderUrl is required')
  }

  async handleGet(req, h) {
    const { bucket, uploaderUrl } = config.get('fileUpload')
    const response = await Wreck.post(`${uploaderUrl}/initiate`, {
      payload: JSON.stringify({
        redirect: 'http://localhost/nextPage',
        callback: 'http://localhost/callback',
        s3Bucket: bucket,
        s3Path: 'scanned'
      })
    })

    const data = JSON.parse(response.payload.toString())

    req.yar.set('upload', data)

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
