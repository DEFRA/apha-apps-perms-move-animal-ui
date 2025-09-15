import { YesNoRadioPage } from '../../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Do you know the address of the destination premises?'

class AddressYesNoPage extends YesNoRadioPage {
  pagePath = 'fmd/movement-destination/business-address-yes-no'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'destinationAddressKnown',
      noInputError:
        'Select if you know the address for the destination business'
    })
  }
}

export default new AddressYesNoPage()
