import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'onOffFarm'
const pageHeadingAndTitle =
  'Are you moving the animals on or off your farm or premises?'
const noInputError = 'Select where the animals are moving'
const valueArray = ['on', 'off']

class ToFromFarmPage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath =
    'tb-origin/are-you-moving-the-animals-on-or-off-your-farm-or-premises'

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async selectOnFarmAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectOffFarmAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }
}

export default new ToFromFarmPage()
