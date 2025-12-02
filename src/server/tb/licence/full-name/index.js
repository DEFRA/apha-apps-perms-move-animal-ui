import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'

import { OwnerFullNameAnswer } from '../../../common/model/answer/owner-full-name/owner-full-name.js'
import { emailAddressPage } from '../email-address/index.js'
import { OriginTypeAnswer } from '~/src/server/common/model/answer/origin-type/origin-type.js'
import { yourNamePage } from '../your-name/index.js'
import { DestinationTypeAnswer } from '~/src/server/common/model/answer/destination-type/destination-type.js'

/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

export class FullNamePage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-name'
  sectionKey = 'licence'

  question =
    'What is the name of the person registered as the keeper of the animals?'

  questionKey = 'fullName'

  Answer = OwnerFullNameAnswer

  /**
   * @param {OwnerFullNameAnswer} _answer
   * @param {RawApplicationState} [context]
   */
  nextPage(_answer, context) {
    if (
      OriginTypeAnswer.isTbRestricted(context?.origin?.originType) &&
      DestinationTypeAnswer.isTbRestricted(
        context?.destination?.destinationType
      )
    ) {
      return yourNamePage
    }
    return emailAddressPage
  }
}
export const fullNamePage = new FullNamePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const fullName = new TbQuestionPageController(fullNamePage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
