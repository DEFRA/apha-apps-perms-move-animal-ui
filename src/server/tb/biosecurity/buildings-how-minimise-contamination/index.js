import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { CheckboxAnswer } from '~/src/server/common/model/answer/checkbox/checkbox.js'
import { housingOtherPage } from '../housing-other/index.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'

/** @import { CheckboxConfig } from '~/src/server/common/model/answer/checkbox/checkbox.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'buildingsHowMinimiseContamination'

export class Answer extends CheckboxAnswer {
  /** @type { CheckboxConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'Only select the measures you are taking. You do not need to select them all to receive your licence.',
    options: {
      cleaning: {
        label:
          'Cleaning and disinfecting of shared buildings before the animals arrive'
      },
      isolation: {
        label:
          'Isolation of incoming animals in a separate building, shed or pen on arrival'
      },
      incoming: {
        label: 'Incoming animals will be permanently housed'
      },
      disinfection: {
        label: 'Disinfection points located at the housing entrances and exits'
      },
      other: {
        label: 'Other measures'
      }
    },
    validation: {
      empty: {
        message:
          'Enter how you will reduce the risk of spreading TB from the resident herd to the incoming animals during housing'
      }
    }
  }
}

export class BuildingsHowMinimiseContaminationPage extends QuestionPage {
  urlPath = '/biosecurity/buildings-how-minimise-contamination'

  questionKey = questionKey
  sectionKey = 'biosecurity'
  question =
    'Which measures are being taken to reduce the spread of TB during housing?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value.includes('other')) {
      return housingOtherPage
    }

    return peopleDisinfectionPage
  }
}

export const buildingsHowMinimiseContaminationPage =
  new BuildingsHowMinimiseContaminationPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const buildingsHowMinimiseContamination = new TbQuestionPageController(
  buildingsHowMinimiseContaminationPage
).plugin()
