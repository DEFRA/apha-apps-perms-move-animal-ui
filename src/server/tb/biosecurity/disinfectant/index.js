import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { disinfectantDilutionPage } from '../disinfectant-dilution/index.js'
import { AutocompleteAnswer } from '~/src/server/common/model/answer/autocomplete/autocomplete.js'

/** @import { AutocompleteConfig } from '~/src/server/common/model/answer/autocomplete/autocomplete.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'disinfectant'
const customHeading = 'Disinfectant'

export class Answer extends AutocompleteAnswer {
  /** @type { AutocompleteConfig } */
  static config = {
    payloadKey: questionKey,
    validation: {},
    isPageHeading: false,
    items: [
      {
        text: 'Agrichlor',
        value: 'Agrichlor'
      },
      {
        text: 'Anigene NaDCC',
        value: 'Anigene NaDCC'
      },
      {
        text: 'Anigene Professional Chlorine Tablets',
        value: 'Anigene Professional Chlorine Tablets'
      },
      {
        text: 'Aquatabs 8.68g',
        value: 'Aquatabs 8.68g'
      },
      {
        text: 'Bi-OO-Cyst',
        value: 'Bi-OO-Cyst'
      },
      {
        text: 'Bimodex',
        value: 'Bimodex'
      },
      {
        text: 'BioChlor 200',
        value: 'BioChlor 200'
      },
      {
        text: 'BioChlor 500',
        value: 'BioChlor 500'
      },
      {
        text: 'Biocid 30',
        value: 'Biocid 30'
      },
      {
        text: 'BioPhen Xtra',
        value: 'BioPhen Xtra'
      },
      {
        text: 'BIOSPOT',
        value: 'BIOSPOT'
      },
      {
        text: 'Coxicur',
        value: 'Coxicur'
      },
      {
        text: 'Credence 1000',
        value: 'Credence 1000'
      },
      {
        text: 'Dis-In-Fect',
        value: 'Dis-In-Fect'
      },
      {
        text: 'FAM 30',
        value: 'FAM 30'
      },
      {
        text: 'High Power Sanitising Tablets 3.25g',
        value: 'High Power Sanitising Tablets 3.25g'
      },
      {
        text: 'Interkokask',
        value: 'Interkokask'
      },
      {
        text: 'Interkokask Concentrate',
        value: 'Interkokask Concentrate'
      },
      {
        text: 'Iodo-Pharm',
        value: 'Iodo-Pharm'
      },
      {
        text: 'Mida CHRIOX F2',
        value: 'Mida CHRIOX F2'
      },
      {
        text: 'Mira 30',
        value: 'Mira 30'
      },
      {
        text: 'MS MEGADES OXY D',
        value: 'MS MEGADES OXY D'
      },
      {
        text: 'NEOGEN Farm Fluid MAX',
        value: 'NEOGEN Farm Fluid MAX'
      },
      {
        text: 'Novagen F.P.',
        value: 'Novagen F.P.'
      },
      {
        text: 'OmniChlor Plus',
        value: 'OmniChlor Plus'
      },
      {
        text: 'Prophyl S',
        value: 'Prophyl S'
      },
      {
        text: 'Rapicid',
        value: 'Rapicid'
      },
      {
        text: 'Septrivet 17',
        value: 'Septrivet 17'
      },
      {
        text: 'Septrivet 87 8.68g',
        value: 'Septrivet 87 8.68g'
      },
      {
        text: 'Stable Safe Strength 4.72g Tablets',
        value: 'Stable Safe Strength 4.72g Tablets'
      },
      {
        text: 'Tibicur',
        value: 'Tibicur'
      },
      {
        text: 'Total Farm Disinfectant',
        value: 'Total Farm Disinfectant'
      },
      {
        text: 'V18',
        value: 'V18'
      },
      {
        text: 'Virkon® LSP',
        value: 'Virkon® LSP'
      },
      {
        text: 'Virochlor 500',
        value: 'Virochlor 500'
      },
      {
        text: 'Virophor 2.8%',
        value: 'Virophor 2.8%'
      },
      {
        text: 'Virudine Plus',
        value: 'Virudine Plus'
      }
    ]
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

  nextPage() {
    return disinfectantDilutionPage
  }
}

export const disinfectantPage = new DisinfectantPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const disinfectant = new TbQuestionPageController(
  disinfectantPage
).plugin()
