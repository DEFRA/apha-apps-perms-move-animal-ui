/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'buildingsHowMinimiseContamination'
const pageHeadingAndTitle =
  'How will you reduce building and equipment contamination?'
const noInputError =
  'Enter information about how you will reduce building contamination'

class MinimiseContaminationPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/buildings-how-minimise-contamination'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  async inputMinimiseContaminationAndContinue(text, nextPage) {
    await super.inputTextAndContinue(text, nextPage)
  }

  async minimiseContaminationErrorTest(textInput, errorMessage) {
    await super.singleInputErrorTest(textInput, errorMessage)
  }
}

export default new MinimiseContaminationPage()
