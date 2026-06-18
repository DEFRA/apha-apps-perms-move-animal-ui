import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'originType'
const pageHeadingAndTitle = 'Which type of premises are the animals moving off?'
const noInputError = 'Select where the animals are moving from'
const valueArray = [
  'unrestricted-farm',
  'tb-restricted-farm',
  'afu',
  'after-import-location',
  'iso-unit',
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

  async selectUnrestrictedPremisesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectTbRestrictedFarm(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async selectApprovedFinishingAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[2], nextPage)
  }

  async selectAfterImportAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[3], nextPage)
  }

  async selectIsoUnitAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[4], nextPage)
  }

  async selectAnotherTypeOfPremisesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[5], nextPage)
  }

  async originTypeErrorTest(valueIndex) {
    super.radioErrorTest(valueIndex)
  }
}

export default new OriginTypePage()
