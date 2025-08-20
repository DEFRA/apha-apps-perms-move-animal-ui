import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { disinfectantDilutionPage } from '../disinfectant-dilution/index.js'
import { AutocompleteAnswer } from '~/src/server/common/model/answer/autocomplete/autocomplete.js'
import { fetchDisinfectants } from '~/src/server/common/apis/index.js'

/** @import { AutocompleteConfig } from '~/src/server/common/model/answer/autocomplete/autocomplete.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'disinfectant'
const customHeading = 'Disinfectant'

export class Answer extends AutocompleteAnswer {
  /** @type { AutocompleteConfig } */
  static config = {
    payloadKey: questionKey,
    validation: {
      empty: {
        message: 'Enter the first 2 letters of the disinfectant you are using'
      }
    },
    isPageHeading: false,
    items: async () => {
      const disinfectants = await fetchDisinfectants('tbo')

      return disinfectants.map((item) => ({
        text: item.Disinfectant_name,
        value: item.Disinfectant_name
      }))
    }
  }
}

export class DisinfectantPage extends QuestionPage {
  urlPath = '/biosecurity/disinfectant'
  view = `tb/biosecurity/disinfectant/index`

  questionKey = questionKey
  sectionKey = 'biosecurity'
  question = 'What disinfectant are you using?'

  Answer = Answer

  get heading() {
    return customHeading
  }

  async viewProps() {
    const disinfectants = await fetchDisinfectants('tbo')

    return {
      list: `<ul class="govuk-body govuk-list--bullet"><li>${disinfectants.map((item) => item.Disinfectant_name).join('</li><li>')}</li></ul>`
    }
  }

  nextPage() {
    return disinfectantDilutionPage
  }
}

export const disinfectantPage = new DisinfectantPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const disinfectant = new TbQuestionPageController(
  disinfectantPage
).plugin()
