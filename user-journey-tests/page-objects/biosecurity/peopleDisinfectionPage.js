import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'peopleDisinfection'

const pageHeadingAndTitle =
  'What measures are you taking to minimise the risk of staff working with the incoming cattle spreading contamination onto resident or other cattle?'
const noInputError =
  'Enter what measures are you taking to minimise the risk of staff working with the incoming cattle spreading contamination onto resident or other cattle'

class PeopleDisinfectionPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/people-disinfection'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  async inputPeopleDisinfectionAndContinue(text, nextPage) {
    await super.inputTextAndContinue(text, nextPage)
  }

  async peopleDisinfectionErrorTest(text, errorMessage) {
    await super.singleInputErrorTest(text, errorMessage)
  }
}

export default new PeopleDisinfectionPage()
