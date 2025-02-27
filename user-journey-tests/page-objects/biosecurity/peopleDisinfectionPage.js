import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'peopleDisinfection'

const noInputError =
  'Enter what measures are you taking to minimise the risk of staff working with the incoming cattle spreading contamination onto resident or other cattle'

class PeopleDisinfectionPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/people-disinfection'
  pageTitle =
    'What measures are staff taking to reduce the risk of spreading TB from the resident cattle?'

  pageHeading = 'Cleaning and disinfection measures taken by staff'

  async inputPeopleDisinfectionAndContinue(text, nextPage) {
    await super.inputTextAndContinue(text, nextPage)
  }

  async peopleDisinfectionErrorTest(text, errorMessage) {
    await super.singleInputErrorTest(text, errorMessage)
  }
}

export default new PeopleDisinfectionPage()
