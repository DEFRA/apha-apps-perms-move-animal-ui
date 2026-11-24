/* eslint-disable lines-between-class-members */
import { $ } from '@wdio/globals'
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'
import * as page from '../../helpers/page.js'

const pageId = 'earTags'
const pageHeadingAndTitle = 'Enter the ear tag numbers for these animals'
const noInputError =
  'Enter the ear tag numbers of the animals you are planning to move'

class EarTagsOver42DaysOldPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  pagePath = 'identification/enter-ear-tags-over-42-days'

  get earTagsLabel() {
    return $('label[for="earTags"]')
  }

  get earTagsHint() {
    return $('#earTags-hint')
  }

  async verifyWelshAndEnglishTranslations() {
    await page.selectElement(this.getLanguageLink('cy'))
    await page.validateElementVisibleAndText(
      this.earTagsLabel,
      'Nodwch y rhifau clust-dag ar gyfer yr anifeiliaid hyn'
    )
    await page.validateElementVisibleAndText(
      this.earTagsHint,
      'Mae angen i chi nodi pob rhif clust-dag ar linell ar wahân'
    )

    await page.selectLinkAndVerifyTitle(
      this.getLanguageLink('en'),
      this.pageTitle
    )
    await page.validateElementVisibleAndText(this.earTagsLabel, this.pageTitle)
    await page.validateElementVisibleAndText(
      this.earTagsHint,
      'You need to enter each ear tag number on a separate line'
    )
  }
}

export default new EarTagsOver42DaysOldPage()
