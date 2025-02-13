import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { config } from '~/src/config/config.js'
import Wreck from '@hapi/wreck'
import { uploadProgressPage } from '../upload-progress/index.js'
import { BiosecurityMapAnswer } from '../../common/model/answer/biosecurity-map/biosecurity-map.js'
import { uploadConfig } from '../upload-config.js'
import { StateManager } from '../../common/model/state/state-manager.js'

/**
 * @import { BiosecurityMapData } from '../../common/model/answer/biosecurity-map/biosecurity-map.js'
 * @import { AnswerModel } from '../../common/model/answer/answer-model.js'
 */

export class UploadPlanPage extends QuestionPage {
  question = 'Upload a biosecurity map'
  sectionKey = uploadConfig.sectionKey
  questionKey = uploadConfig.questionKey
  urlPath = `/${this.sectionKey}/${this.questionKey}`

  view = `biosecurity-map/upload-plan/index`

  Answer = BiosecurityMapAnswer

  nextPage() {
    return uploadProgressPage
  }
}

export class UploadPlanController extends QuestionPageController {
  async handleGet(req, h) {
    const { bucket, uploaderUrl, path } = config.get('fileUpload')

    const applicationState = new StateManager(req).toState()
    const sectionState = req.yar.get(this.page.sectionKey)

    const existingAnswer = /** @type {BiosecurityMapAnswer} */ (
      this.page.Answer.fromState(
        sectionState?.[this.page.questionKey],
        applicationState
      )
    )

    // save this seperately to see if we've already tried to upload a bio-sec-map already
    const initialState = sectionState[this.page.questionKey]
    const { isValid, errors } = existingAnswer.validate()

    const response = await Wreck.post(`${uploaderUrl}/initiate`, {
      payload: JSON.stringify({
        redirect: this.page.nextPage(req).urlPath,
        s3Bucket: bucket,
        s3Path: path,
        mimeTypes: [
          'image/bmp',
          'image/gif',
          'image/jpeg',
          'image/svg+xml',
          'image/tiff',
          'image/webp',
          'image/apng',
          'image/avif',
          'application/pdf'
        ]
      })
    })

    const data = JSON.parse(response.payload.toString())

    const answer = new this.page.Answer({
      metadata: data
    })

    req.yar.set(this.page.sectionKey, {
      ...req.yar.get(this.page.sectionKey),
      [this.page.questionKey]: answer.toState()
    })

    h.headers = {
      'Cache-Control': 'no-store, must-revalidate, max-age=0',
      Pragma: 'no-cache'
    }

    // if we dont have an initialState then its the first time we've visited here
    if (initialState && !isValid) {
      let validationErrors = errors
      if (
        existingAnswer.value?.status?.form.file &&
        existingAnswer.value?.status?.numberOfRejectedFiles > 0
      ) {
        validationErrors = {
          'status.form.file': {
            text: existingAnswer.value.status.form.file.errorMessage
          }
        }
      }

      return super.handleGet(req, h, {
        upload: answer.value?.metadata,
        errorMessages: this.page.Answer.errorMessages(validationErrors),
        errors: validationErrors
      })
    }

    return super.handleGet(req, h, {
      upload: answer.value?.metadata
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
