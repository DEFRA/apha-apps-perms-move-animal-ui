import { $ } from '@wdio/globals'
import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'
import * as page from '../../helpers/page.js'

const pageId = 'grazingFieldHowSeparated'
const pageHeadingAndTitle =
  'Which measures are being taken to reduce the spread of TB when the animals are grazing?'
const noInputError =
  'Select which measures are being taken to reduce the spread of TB when the animals are grazing'
const checkboxIds = [
  'separated-by-roads', // Roads
  'separated-by-three-meters', // 3 metres
  'other' // Other
]

class HowFieldSeparatedPage extends CheckboxBasePage {
  constructor() {
    super({ checkboxIds, pageId, noInputError })
  }

  pagePath = 'biosecurity/grazing-field-how-separated'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  get measuresHint() {
    return $(`#${pageId}-hint`)
  }

  get separationLabel() {
    return this['separated-by-three-meters'].parentElement().$('label')
  }

  get separationHint() {
    return this['separated-by-three-meters'].parentElement().$('.govuk-hint')
  }

  async verifyWelshAndEnglishTranslations() {
    await page.selectElement(this.getLanguageLink('cy'))
    await page.validateElementVisibleAndText(
      this.measuresHint,
      'Dewiswch yn unig y mesurau rydych yn eu cymryd. Nid oes angen i chi ddewis pob un ohonynt i gael eich trwydded.'
    )
    await page.validateElementVisibleAndText(
      this.separationLabel,
      "Bydd o leiaf 3 metr yn gwahanu'r anifeiliaid"
    )
    await page.validateElementVisibleAndText(
      this.separationHint,
      'Fel trwy wrychoedd, ffensio dwbl neu waliau'
    )
    await page.selectElement(this.separationLabel)
    await expect(this['separated-by-three-meters']).toBeSelected()

    await page.selectLinkAndVerifyTitle(
      this.getLanguageLink('en'),
      this.pageTitle
    )
    await page.validateElementVisibleAndText(
      this.measuresHint,
      'Only select the measures you are taking. You do not need to select them all to receive your licence.'
    )
    await page.validateElementVisibleAndText(
      this.separationLabel,
      'A minimum of 3 metres will separate the animals'
    )
    await page.validateElementVisibleAndText(
      this.separationHint,
      'Such as by hedges, doubling fencing or walls'
    )
  }
}

export default new HowFieldSeparatedPage()
