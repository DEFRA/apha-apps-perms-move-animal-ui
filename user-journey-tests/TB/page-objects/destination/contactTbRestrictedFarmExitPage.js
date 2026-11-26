import { verifyStaticPageTranslations } from '../../../shared/static-page-translations.js'
import { Page } from '../page.js'

const pageHeadingAndTitle =
  'You need to contact the TB restricted farm the animals are moving onto'

class ContactTbRestrictedFarmExitPage extends Page {
  pagePath = 'destination/contact-the-tb-restricted-farm'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  async verifyWelshAndEnglishTranslations() {
    await verifyStaticPageTranslations(this, {
      title:
        "Mae angen i chi gysylltu â'r fferm gyfyngedig TB y mae'r anifeiliaid yn symud iddi",
      welsh: [
        'cyfrifoldeb y fferm honno yw gwneud cais am drwydded.',
        "Mae angen i ni wybod manylion am eu harferion bioddiogelwch er mwyn prosesu'r drwydded.",
        'Os na all y fferm gyrchfan wneud cais, llenwch a'
      ],
      english: [
        'responsibility of',
        'apply for a licence.',
        'We need details about their biosecurity practices to process the licence.',
        'If the destination farm cannot apply, complete and'
      ],
      links: [
        {
          selector: 'main a',
          href: 'https://www.gov.uk/government/publications/tb-movement-licence-moving-animals-between-restricted-premises-in-england',
          text: 'anfonwch y ffurflen gais hon i APHA (yn agor mewn tab newydd)'
        }
      ]
    })
  }
}

export default new ContactTbRestrictedFarmExitPage()
