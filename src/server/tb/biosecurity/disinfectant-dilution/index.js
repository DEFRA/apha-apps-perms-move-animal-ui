import { TbQuestionPageController } from '../../question-page-controller.js'
import { DilutionRateAnswer } from '../../../common/model/answer/dilution-rate/dilution-rate.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { buildingsAnySharedPage } from '../buildings-any-shared/index.js'
import { TbStateManager } from '../../state-manager.js'
import { fetchDisinfectants } from '~/src/server/common/apis/index.js'

const customHeading = 'Disinfectant dilution rate'

export class DisinfectantDilutionPage extends QuestionPage {
  view = `tb/biosecurity/disinfectant-dilution/index`

  get heading() {
    return customHeading
  }

  urlPath = '/biosecurity/disinfectant-dilution'
  sectionKey = 'biosecurity'
  question = 'Confirmation of the dilution rate'
  questionKey = 'dilutionRate'

  Answer = DilutionRateAnswer

  nextPage() {
    return buildingsAnySharedPage
  }

  async viewProps(req) {
    const applicationState = new TbStateManager(req).toState()
    const selectedDisinfectant = applicationState?.biosecurity?.disinfectant
    const disinfectants = await fetchDisinfectants('tbo')
    const disinfectantDetails = disinfectants.find(
      (disinfectant) => disinfectant.name === selectedDisinfectant
    )

    if (!selectedDisinfectant || !disinfectantDetails) {
      return Promise.resolve({})
    }
    return Promise.resolve({
      isUndiluted: disinfectantDetails.isUndiluted,
      disinfectant: disinfectantDetails.name,
      dilutionRate: disinfectantDetails.isUndiluted
        ? 'undiluted'
        : `${disinfectantDetails.dilutionRate}`,
      dilutantUnit: disinfectantDetails.isLiquid ? 'litres' : 'millilitres',
      disinfectantUnit: disinfectantDetails.isLiquid ? 'litre' : 'gram'
    })
  }
}

export const disinfectantDilutionPage = new DisinfectantDilutionPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const disinfectantDilution = new TbQuestionPageController(
  disinfectantDilutionPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
