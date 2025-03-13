import Wreck from '@hapi/wreck'
import { BiosecurityMapAnswer } from '../../common/model/answer/biosecurity-map/biosecurity-map.js'
import { config } from '~/src/config/config.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { uploadConfig } from '../upload-config.js'
import { UploadPlanPage } from '../upload-plan/index.js'
import { biosecurityPlanSummaryPage } from '../check-answers/index.js'
import { StateManager } from '../../common/model/state/state-manager.js'

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
    const sectionState = req.yar.get(this.page.sectionKey)

    const answer = /** @type {BiosecurityMapAnswer} */ (
      this.page.Answer.fromState(
        sectionState?.[this.page.questionKey],
        applicationState
      )
    )

    const { uploaderUrl } = config.get('fileUpload')
    const response = await Wreck.get(
      `${uploaderUrl}/status/${answer.value?.metadata?.uploadId}`
    )

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
