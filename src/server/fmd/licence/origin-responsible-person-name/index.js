import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { emailAddressPage } from '../email-address/index.js'

// TEMPLATE-TODO: import next page

/** @import { FullNameConfig } from '~/src/server/common/model/answer/full-name/full-name.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'originResponsiblePersonName'

export class Answer extends FullNameAnswer {
  /** @type { FullNameConfig } */
  static config = {
    validation: {
      firstName: {
        empty: {
          message:
            'Enter the first name of the person responsible for the origin premises'
        }
      },
      lastName: {
        empty: {
          message:
            'Enter the last name of the person responsible for the origin premises'
        }
      }
    }
  }
}

export class OriginResponsiblePersonNamePage extends QuestionPage {
  urlPath = '/fmd/receiving-the-licence/name-of-person-responsible-at-origin'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'Who is responsible for the origin premises?'

  Answer = Answer

  nextPage() {
    return emailAddressPage
  }
}

export const originResponsiblePersonNamePage =
  new OriginResponsiblePersonNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const originResponsiblePersonName = new FmdQuestionPageController(
  originResponsiblePersonNamePage
).plugin()
