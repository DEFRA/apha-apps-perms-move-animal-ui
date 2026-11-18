import { Page } from '../page-objects/page.js'

const pageHeadingAndTitle = 'Cookies'

class CookiesPage extends Page {
  pagePath = '/cookies'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async verifyWelshAndEnglishTranslations() {
    await super.verifyPolicyTranslations(
      () => this.getCookiesFooterLink(),
      'Cwcis',
      "Mae cwcis yn ffeiliau bach sy'n cael eu cadw",
      'Cookies are small files saved on your phone'
    )
  }
}

export default new CookiesPage()
