import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { emailPage } from '../email/index.js'
import { selectPostCanNotUseThisServicePage } from '../select-post-can-not-use-this-service/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'emailOrPost'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      email: { label: 'Email' },
      post: { label: 'Post' }
    },
    validation: {
      empty: 'Select how you would like this licence sent to you'
    }
  }
}

export class EmailOrPostPage extends QuestionPage {
  urlPath = '/exotics/receiving-the-licence/email-or-post'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'How would you like this licence sent to you?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'email') {
      return emailPage
    }

    return selectPostCanNotUseThisServicePage
  }
}

export const emailOrPostPage = new EmailOrPostPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const emailOrPost = new ExoticsQuestionPageController(
  emailOrPostPage
).plugin()
