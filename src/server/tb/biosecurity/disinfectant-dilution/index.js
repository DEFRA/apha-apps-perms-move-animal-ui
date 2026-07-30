import { TbQuestionPageController } from '../../question-page-controller.js'
import { DilutionRateAnswer } from '../../../common/model/answer/dilution-rate/dilution-rate.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { equipmentAnySharedPage } from '../equipment-any-shared/index.js'
import { TbStateManager } from '../../state-manager.js'
import { fetchDisinfectants } from '~/src/server/common/apis/index.js'
import { translate } from '~/src/server/common/helpers/i18n/index.js'

const customHeading = 'Disinfectant dilution rate'

export class DisinfectantDilutionPage extends QuestionPage {
  view = `tb/biosecurity/disinfectant-dilution/index`

  titleI18nKey = 'tb.biosecurity.dilutionRate.heading'
  headingI18nKey = 'tb.biosecurity.dilutionRate.heading'
  questionI18nKey = 'tb.biosecurity.dilutionRate.question'

  get heading() {
    return customHeading
  }

  urlPath = '/biosecurity/disinfectant-dilution'
  sectionKey = 'biosecurity'
  question = 'Confirmation of the dilution rate'
  questionKey = 'dilutionRate'

  Answer = DilutionRateAnswer

  nextPage() {
    return equipmentAnySharedPage
  }

  async viewProps(req) {
    const applicationState = new TbStateManager(req).toState()
    const selectedDisinfectant = applicationState?.biosecurity?.disinfectant
    const disinfectants = await fetchDisinfectants('tbo')
    const disinfectantDetails = disinfectants.find(
      (disinfectant) => disinfectant.name === selectedDisinfectant
    )

    if (!selectedDisinfectant || !disinfectantDetails) {
      return Promise.resolve({
        disinfectantUrl: '/biosecurity/disinfectant'
      })
    }
    return Promise.resolve({
      isUndiluted: disinfectantDetails.isUndiluted,
      disinfectant: disinfectantDetails.name,
      dilutionRate: disinfectantDetails.isUndiluted
        ? translate(
            req,
            'tb.biosecurity.dilutionRate.page.undiluted',
            'undiluted'
          )
        : `${disinfectantDetails.dilutionRate}`,
      dilutantUnit: disinfectantDetails.isLiquid
        ? translate(
            req,
            'tb.biosecurity.dilutionRate.page.units.litres',
            'litres'
          )
        : translate(
            req,
            'tb.biosecurity.dilutionRate.page.units.millilitres',
            'millilitres'
          ),
      disinfectantUnit: disinfectantDetails.isLiquid
        ? translate(
            req,
            'tb.biosecurity.dilutionRate.page.units.litre',
            'litre'
          )
        : translate(req, 'tb.biosecurity.dilutionRate.page.units.gram', 'gram')
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
