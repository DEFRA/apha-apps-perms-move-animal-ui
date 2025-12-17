import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'originType'
const pageHeadingAndTitle = 'Which type of premises are the animals moving off?'
const noInputError = 'Select type of premises the animals are moving off'
const valueArray = [
  'unrestricted-farm',
  'tb-restricted-farm',
  'afu',
  'after-import-location',
  'iso-unit',
  'other',
  'unrestricted-farms-or-markets'
]

class OriginTypePage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'tb-origin/which-type-of-premises-are-the-animals-moving-off'
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

  async selectUnrestrictedFarmOrMarketAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[6], nextPage)
  }

  async originTypeErrorTest(valueIndex) {
    super.radioErrorTest(valueIndex)
  }
}

export default new OriginTypePage()
