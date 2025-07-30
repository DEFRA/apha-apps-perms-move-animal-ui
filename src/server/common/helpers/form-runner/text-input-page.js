import { TextAnswer } from '../../model/answer/text/text.js'
import { Page } from '../../model/page/page-model.js'
import { QuestionPage } from '../../model/page/question-page-model.js'
import { NotImplementedError } from '../not-implemented-error.js'

/** @import { TextConfig } from '../../model/answer/text/text.js' */
/** @import {ComponentType, TextFieldComponent, Link} from '@defra/forms-model' */

const questionKey = 'typeOfBirdOther'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 20,
    validation: {
      empty: {
        message: 'Enter what type of bird you are moving'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }

  /** @returns {Partial<TextFieldComponent>} */
  static defraFormsOptions() {
    const { validation } = this.config

    return {
      type: /** @type {ComponentType.TextField} */ ('TextField'),
      options: {
        autocomplete: this.config.autocomplete,
        customValidationMessages: {
          'any.required': validation.empty?.message ?? '',
          'string.empty': validation.empty?.message ?? '',
          'string.max': validation.maxLength?.message ?? '',
          'string.pattern.base': validation.pattern?.message ?? ''
        }
      },
      schema: {
        max: this.config.validation.maxLength?.value,
        regex: this.config.validation.pattern?.regex.toString()
      }
    }
  }
}

export class TextInputPage extends QuestionPage {
  urlPath = '/enter-bird-type'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What type of bird are you moving?'

  Answer = Answer

  /** @returns {Link[]} */
  defraFormsNextPage() {
    return [
      {
        path: '/full-name'
      }
    ]
  }
}
