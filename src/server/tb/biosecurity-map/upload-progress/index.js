import { BiosecurityMapAnswer } from '../../../common/model/answer/biosecurity-map/biosecurity-map.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'
import { uploadConfig } from '../upload-config.js'
import { UploadPlanPage } from '../upload-plan/index.js'
import { biosecurityPlanSummaryPage } from '../check-answers/index.js'
import { StateManager } from '../../../common/model/state/state-manager.js'
import { checkStatus } from '../../../common/connectors/file-upload/cdp-uploader.js'

export class UploadProgressPage extends QuestionPage {
  pageTitle = 'Uploading the biosecurity map'
  sectionKey = uploadConfig.sectionKey
  questionKey = uploadConfig.questionKey
  urlPath = `/${this.sectionKey}/uploading`
  isInterstitial = true

  view = `tb/biosecurity-map/upload-progress/index`

  Answer = BiosecurityMapAnswer

  nextPage() {
    return biosecurityPlanSummaryPage
  }
}

export class UploadProgressController extends TbQuestionPageController {
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

    const status = JSON.parse(response.payload.toString())

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
