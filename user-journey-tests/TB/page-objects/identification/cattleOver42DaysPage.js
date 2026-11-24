/* eslint-disable lines-between-class-members */
import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'
import * as page from '../../helpers/page.js'

const pageId = 'animals42DaysOldOrOlder'
const pageHeadingAndTitle =
  'Are you also moving any animals 42 days old or older?'
const noInputError =
  'Select if you are also moving any animals 42 days old or older'

class CattleOver42DaysPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'identification/any-cattle-over-42-days'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get yesLabel() {
    return this.yesRadio.parentElement().$('label')
  }

  get noLabel() {
    return this.noRadio.parentElement().$('label')
  }

  async verifyWelshAndEnglishTranslations() {
    await page.selectElement(this.getLanguageLink('cy'))
    await page.validateElementVisibleAndText(this.yesLabel, 'Iawn')
    await page.validateElementVisibleAndText(this.noLabel, 'Na')
    await page.selectElement(this.yesLabel)
    await expect(this.yesRadio).toBeSelected()

    await page.selectLinkAndVerifyTitle(
      this.getLanguageLink('en'),
      this.pageTitle
    )
    await page.validateElementVisibleAndText(this.yesLabel, 'Yes')
    await page.validateElementVisibleAndText(this.noLabel, 'No')
  }
}

export default new CattleOver42DaysPage()
