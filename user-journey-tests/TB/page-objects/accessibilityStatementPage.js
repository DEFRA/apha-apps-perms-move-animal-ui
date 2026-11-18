import { Page } from './page.js'

const pageHeadingAndTitle = 'Accessibility statement'

class AccessibilityStatementPage extends Page {
  pagePath = '/accessibility-statement'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async verifyWelshAndEnglishTranslations() {
    await super.verifyPolicyTranslations(
      () => this.getAccessibilityFooterLink(),
      'Datganiad hygyrchedd',
      'Datganiad hygyrchedd ar gyfer Cael caniatâd i symud anifeiliaid',
      'Accessibility statement for Get permission to move animals under disease control.'
    )
  }
}

export default new AccessibilityStatementPage()
