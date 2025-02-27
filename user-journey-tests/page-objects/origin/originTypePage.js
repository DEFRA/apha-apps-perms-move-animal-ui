import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'originType'
const pageHeadingAndTitle = 'What type of premises are the animals moving off?'
const noInputError = 'Select where the animals are moving from'
const valueArray = [
  'market',
  'unrestricted-farm',
  'tb-restricted-farm',
  'afu',
  'zoo',
  'lab',
  'after-import-location',
  'other'
]

class OriginTypePage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'origin/type-of-origin'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async selectMarketAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectUnrestrictedPremisesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async selectTBRestrictedFarmAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[2], nextPage)
  }

  async selectApprovedFinishingUnitAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[3], nextPage)
  }

  async selectZooAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[4], nextPage)
  }

  async selectLabAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[5], nextPage)
  }

  async selectAfterImportAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[6], nextPage)
  }

  async selectAnotherTypeOfPremisesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[7], nextPage)
  }

  async originTypeErrorTest(valueIndex) {
    super.radioErrorTest(valueIndex)
  }
}

export default new OriginTypePage()
