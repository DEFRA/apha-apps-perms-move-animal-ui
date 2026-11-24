import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { CheckboxAnswer } from '~/src/server/common/model/answer/checkbox/checkbox.js'
import { disinfectantPage } from '../disinfectant/index.js'
import { slurryManureOtherPage } from '../slurry-manure-other/index.js'

/** @import { CheckboxConfig } from '~/src/server/common/model/answer/checkbox/checkbox.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'manureAndSlurryDetails'

export class Answer extends CheckboxAnswer {
  /** @type { CheckboxConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'Only select the measures you are taking. You do not need to select them all to receive your licence.',
    hintI18nKey: 'tb.biosecurity.manureAndSlurryDetails.hint',
    options: {
      'not-purchased': {
        label: 'Manure is not purchased from other farms',
        labelI18nKey:
          'tb.biosecurity.manureAndSlurryDetails.options.not-purchased.label'
      },
      stored: {
        label:
          "Manure and slurry is securely stored so domestic and wild animals can't access it",
        labelI18nKey:
          'tb.biosecurity.manureAndSlurryDetails.options.stored.label'
      },
      'three-weeks': {
        label:
          'Manure is stored for at least 3 weeks before spreading on pasture',
        labelI18nKey:
          'tb.biosecurity.manureAndSlurryDetails.options.three-weeks.label'
      },
      'six-months': {
        label:
          'Slurry is stored for at least 6 months before spreading on pasture',
        labelI18nKey:
          'tb.biosecurity.manureAndSlurryDetails.options.six-months.label'
      },
      other: {
        label: 'Other measures',
        labelI18nKey:
          'tb.biosecurity.manureAndSlurryDetails.options.other.label'
      }
    },
    validation: {
      empty: {
        message: 'Enter how you will manage manure and slurry'
      }
    }
  }
}

export class ManureAndSlurryDetailsPage extends QuestionPage {
  urlPath = '/biosecurity/manure-and-slurry-details'

  questionKey = questionKey
  sectionKey = 'biosecurity'
  question = 'How will you manage slurry and manure?'
  questionI18nKey = 'tb.biosecurity.manureAndSlurryDetails.question'

  Answer = Answer

  nextPage(answer) {
    if (answer.value.includes('other')) {
      return slurryManureOtherPage
    }
    return disinfectantPage
  }
}

export const manureAndSlurryDetailsPage = new ManureAndSlurryDetailsPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const manureAndSlurryDetails = new TbQuestionPageController(
  manureAndSlurryDetailsPage
).plugin()
