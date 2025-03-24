import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { uploadProgressPage } from '../upload-progress/index.js'
import { BiosecurityMapAnswer } from '../../common/model/answer/biosecurity-map/biosecurity-map.js'
import { uploadConfig } from '../upload-config.js'
import { StateManager } from '../../common/model/state/state-manager.js'
import { initiateFileUpload } from '../../common/connectors/file-upload/cdp-uploader.js'

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
    const applicationState = new StateManager(req).toState()
    const sectionState = applicationState[this.page.sectionKey]

    const existingAnswer = /** @type {BiosecurityMapAnswer} */ (
      this.page.Answer.fromState(
        sectionState?.[this.page.questionKey],
        applicationState
      )
    )

    // save this seperately to see if we've already tried to upload a bio-sec-map already
    const initialState = sectionState?.[this.page.questionKey]
    const { isValid, errors } = existingAnswer.validateProcessing()

    const response = await initiateFileUpload(this.page.nextPage(req).urlPath)

    const data = JSON.parse(response.payload.toString())

    const answer = new this.page.Answer({
      metadata: data
    })

    const state = new StateManager(req)
    state.set(this.page, answer)

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
        upload: answer.value,
        errorMessages: this.page.Answer.errorMessages(validationErrors),
        errors: validationErrors,
        pageTitle: `Error: ${this.page.title}`
      })
    }

    return super.handleGet(req, h, {
      upload: answer.value
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
