import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What other cloven-hooved animals are kept on the premises?'

class OtherClovenHoovedPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'clovenHooved',
      noInputError:
        'Enter what other cloven-hooved animals are kept on the premises'
    })
  }

  pagePath = 'fmd/movement-origin/cloven-hooved-animals'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new OtherClovenHoovedPage()
