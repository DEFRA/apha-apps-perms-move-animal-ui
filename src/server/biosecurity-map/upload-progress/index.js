import { BiosecurityMapAnswer } from '../../common/model/answer/biosecurity-map/biosecurity-map.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { uploadConfig } from '../upload-config.js'
import { UploadPlanPage } from '../upload-plan/index.js'
import { biosecurityPlanSummaryPage } from '../check-answers/index.js'
import { StateManager } from '../../common/model/state/state-manager.js'
import { checkStatus } from '../../common/connectors/file-upload/cdp-uploader.js'

export class UploadProgressPage extends QuestionPage {
  pageTitle = 'Uploading the biosecurity map'
  sectionKey = uploadConfig.sectionKey
  questionKey = uploadConfig.questionKey
  urlPath = `/${this.sectionKey}/uploading`
  isInterstitial = true

  view = `biosecurity-map/upload-progress/index`

  Answer = BiosecurityMapAnswer

  nextPage() {
    return biosecurityPlanSummaryPage
  }
}

export class UploadProgressController extends QuestionPageController {
  pluginName = 'biosecurity-map-uploading'

  async handleGet(req, h) {
    const applicationState = new StateManager(req).toState()
    const sectionState = applicationState[this.page.sectionKey]

    const answer = /** @type {BiosecurityMapAnswer} */ (
      this.page.Answer.fromState(
        sectionState?.[this.page.questionKey],
        applicationState
      )
    )

    const response = await checkStatus(answer.value?.metadata?.uploadId)

    let status = JSON.parse(response.payload.toString())

    // checks
    // 1. did user submit any rejected files?
    // 2. dis the submit a file at all?
    // 2. is the new upload (if any) finished?

    if (
      !(status.form.file && status.numberOfRejectedFiles > 0) &&
      answer.value?.status?.form.file &&
      status.uploadStatus !== 'pending'
    ) {
      status = {
        ...answer.value.status,
        uploadStatus: status.uploadStatus
      }
    }

    const newAnswer = new this.page.Answer({
      ...answer.value,
      status
    })

    const state = new StateManager(req)
    state.set(this.page, newAnswer)

    const { isValid } = newAnswer.validate()
    if (!isValid) {
      return h.redirect(new UploadPlanPage().urlPath)
    }

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
