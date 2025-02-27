/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'grazingFieldHowSeparated'
const pageHeadingAndTitle =
  'How is this grazing field separated from the resident herd?'
const noInputError =
  'Enter information about how this grazing field is separated from the resident herd'

class HowFieldSeparatedPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/grazing-field-how-separated'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  async inputSeparatedGrazingAndContinue(text, nextPage) {
    await super.inputTextAndContinue(text, nextPage)
  }

  async fieldSeparatedErrorTest(textInput, errorMessage) {
    await super.singleInputErrorTest(textInput, errorMessage)
  }
}

export default new HowFieldSeparatedPage()
