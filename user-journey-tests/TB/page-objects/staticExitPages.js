import { Page } from './page.js'
import { verifyStaticPageTranslations } from '../../shared/static-page-translations.js'

class StaticExitPage extends Page {
  pagePath = ''
  pageTitle = ''
  pageHeading = ''

  constructor(pagePath, pageTitle, translation) {
    super()
    this.pagePath = pagePath
    this.pageTitle = pageTitle
    this.pageHeading = pageTitle
    this.translation = translation
  }

  async verifyWelshAndEnglishTranslations() {
    await verifyStaticPageTranslations(this, this.translation)
  }
}

const unavailableTitle = 'This service is not available for your movement type'
const welshUnavailableTitle =
  "Nid yw'r gwasanaeth hwn ar gael ar gyfer eich math o symudiad"

export const staticExitPages = [
  new StaticExitPage(
    'destination/can-not-use-service-afu-only-off',
    unavailableTitle,
    {
      title: welshUnavailableTitle,
      welsh: [
        "Mae'r gwasanaeth hwn yn caniatáu symudiadau oddi ar uned bwrcasu gymeradwy (AFU) yn unig i:",
        'lladd-dy',
        'unedau bwrcasu cymeradwy (AFU)'
      ],
      english: [
        'This service only allows movements off an approved finishing unit (AFU) to:',
        'slaughter',
        'approved finishing units (AFU)'
      ]
    }
  ),
  new StaticExitPage(
    'destination/can-not-use-service-afu-only-on',
    unavailableTitle,
    {
      title: welshUnavailableTitle,
      welsh: [
        "Nid yw'r gwasanaeth hwn yn caniatáu symudiadau i'ch safle o uned bwrcasu gymeradwy (AFU) oni bai bod eich safle yn AFU."
      ],
      english: [
        'This service does not allow movements onto your premises from approved finishing unit (AFU) unless your premises is an AFU.'
      ]
    }
  ),
  new StaticExitPage(
    'tb/biosecurity-map/size-error',
    'There was a problem uploading your biosecurity map',
    {
      title: "Problem wrth lwytho'r map bioddiogelwch",
      welsh: [
        'Rhaid i chi e-bostio eich map bioddiogelwch i csc.tblicensing@apha.gov.uk',
        'Yn eich e-bost cynhwyswch eich rhif daliad plwyf sirol (CPH).',
        'Ni ellir prosesu eich cais nes i ni dderbyn eich map bioddiogelwch.',
        'Parhau'
      ],
      english: [
        'You must email your biosecurity map to csc.tblicensing@apha.gov.uk',
        'In your email include your county parish holding (CPH) number.',
        'Your application cannot be processed until we receive your biosecurity map.',
        'Continue'
      ]
    }
  )
]
