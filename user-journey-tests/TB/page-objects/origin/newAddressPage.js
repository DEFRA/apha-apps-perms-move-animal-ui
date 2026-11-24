import { $ } from '@wdio/globals'
import { AddressBasePage } from '../base-pages/addressBasePage.js'
import * as page from '../../helpers/page.js'

const pageHeadingAndTitle =
  'What is the address of your farm or premises where the animals are moving off?'

class NewAddressPage extends AddressBasePage {
  pagePath = 'origin/address'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get lineOneLabel() {
    return $('label[for="addressLine1"]')
  }

  get lineTwoLabel() {
    return $('label[for="addressLine2"]')
  }

  async verifyWelshAndEnglishTranslations() {
    await page.selectElement(this.getLanguageLink('cy'))
    await page.validateElementVisibleAndText(
      this.lineOneLabel,
      'Nodwch linell gyfeiriad 1'
    )
    await page.validateElementVisibleAndText(
      this.lineTwoLabel,
      'Nodwch linell gyfeiriad 2 (dewisol)'
    )

    await page.selectLinkAndVerifyTitle(
      this.getLanguageLink('en'),
      this.pageTitle
    )
    await page.validateElementVisibleAndText(
      this.lineOneLabel,
      'Address line 1'
    )
    await page.validateElementVisibleAndText(
      this.lineTwoLabel,
      'Address line 2 (optional)'
    )
  }
}

export default new NewAddressPage()
