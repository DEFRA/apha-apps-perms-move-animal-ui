import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'
import * as page from '../../helpers/page.js'

const pageId = 'originType'
const pageHeadingAndTitle = 'Which type of premises are the animals moving off?'
const noInputError = 'Select where the animals are moving from'
const valueArray = [
  'unrestricted-farm',
  'tb-restricted-farm',
  'afu',
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

  get afuLabel() {
    return this.afuRadio.parentElement().$('label')
  }

  get afuHint() {
    return this.afuRadio.parentElement().$('.govuk-hint')
  }

  async verifyWelshAndEnglishTranslations() {
    await page.selectElement(this.getLanguageLink('cy'))
    await page.validateElementVisibleAndText(
      this.afuLabel,
      'Uned bwrcasu gymeradwy (AFU)'
    )
    await page.validateElementVisibleAndText(
      this.afuHint,
      "Gan gynnwys wedi'i wella â phori (AFUE)"
    )
    await page.selectElement(this.afuLabel)
    await expect(this.afuRadio).toBeSelected()

    await page.selectLinkAndVerifyTitle(
      this.getLanguageLink('en'),
      this.pageTitle
    )
    await page.validateElementVisibleAndText(
      this.afuLabel,
      'Approved finishing unit (AFU)'
    )
    await page.validateElementVisibleAndText(
      this.afuHint,
      'Including enhanced with grazing (AFUE)'
    )
  }

  async selectUnrestrictedPremisesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectTbRestrictedFarm(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async selectApprovedFinishingAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[2], nextPage)
  }

  async selectIsoUnitAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[3], nextPage)
  }

  async selectAnotherTypeOfPremisesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[4], nextPage)
  }

  async originTypeErrorTest(valueIndex) {
    await super.radioErrorTest(valueIndex)
  }
}

export default new OriginTypePage()
