import { $ } from '@wdio/globals'
import { Page } from '../page-objects/page.js'

const pageHeadingAndTitle = 'Privacy Policy'

class PrivacyPage extends Page {
  pagePath = 'privacy-policy'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  // Links
  get individualNoticesLink() {
    return $('a=individual privacy notices')
  }

  get aphaNotices1() {
    return $$('a=individual APHA privacy notices')[0]
  }

  get aphaNotices2() {
    return $$('a=individual APHA privacy notices')[1]
  }

  get aphaGovLink() {
    return $('[href="http://www.gov.uk/apha"]')
  }

  get googleTermsLink() {
    return $('[href="https://policies.google.com/"]')
  }

  get protectionRightsLink() {
    return $('a=your rights under data protection law')
  }

  get comissionersOfficeLink() {
    return $('[href="https://ico.org.uk/make-a-complaint/"]')
  }

  get personalCharterLink() {
    return $("a=APHA's personal information charter")
  }

  // Emails
  get dataProtectionEmail() {
    return $('[href="mailto:data.protection@defra.gov.uk"]')
  }

  get defraGroupEmail() {
    return $('[href="mailto:defragroupdataprotectionofficer@defra.gov.uk"]')
  }

  get enquiriesEmail() {
    return $('[href="mailto:enquiries@apha.gov.uk"]')
  }
}

export default new PrivacyPage()
