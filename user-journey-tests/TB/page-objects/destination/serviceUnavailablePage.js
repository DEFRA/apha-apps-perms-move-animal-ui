import { verifyStaticPageTranslations } from '../../../shared/static-page-translations.js'
import { Page } from '../page.js'

const pageHeadingAndTitle =
  'This service is not available for your movement type'

class ServiceUnavailablePage extends Page {
  pagePath = 'destination/check-existing-licence'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get govUkMailLink() {
    return $('a[href*="mailto:CSCTBUnits@apha.gov.uk"]')
  }

  async verifyWelshAndEnglishTranslations(afu) {
    await verifyStaticPageTranslations(this, {
      title: "Nid yw'r gwasanaeth hwn ar gael ar gyfer eich math o symudiad",
      welsh: [
        afu
          ? "Os yw'r AFU eisoes wedi'i sefydlu"
          : "Os yw'r uned ynysu TB eisoes wedi'i sefydlu",
        "gwiriwch a allwch symud anifeiliaid gyda'r drwydded a gyhoeddwyd gyda'r cymeradwyaeth.",
        "os nad yw eich symudiad yn bodloni telerau'r drwydded bresennol."
      ],
      english: [
        afu
          ? 'If the approved finishing unit (AFU) has already been set up'
          : 'If the TB isolation unit has already been set up and approved',
        'check if you can move animals with the licence that was issued with the approval.',
        'if your movement does not meet the terms of the existing licence.'
      ],
      links: [
        {
          selector: 'main a',
          href: 'mailto:CSCTBUnits@apha.gov.uk',
          text: 'CSCTBUnits@apha.gov.uk'
        }
      ]
    })
  }
}

export default new ServiceUnavailablePage()
