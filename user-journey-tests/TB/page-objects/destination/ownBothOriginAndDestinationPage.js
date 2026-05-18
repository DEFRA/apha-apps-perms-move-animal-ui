import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'ownBothOriginAndDestination'
const pageHeadingAndTitle =
  'Are you responsible for the TB restricted farm where the animals are going to?'
const noInputError =
  'Select if you are responsible for the TB restricted farm where the animals are going to'
const valueArray = ['yes', 'no']

class OwnBothOriginAndDestinationPage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'destination/who-is-responsible'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async selectYesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectNoAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async responsibilityErrorTest() {
    await super.radioErrorTest()
  }
}

export default new OwnBothOriginAndDestinationPage()
