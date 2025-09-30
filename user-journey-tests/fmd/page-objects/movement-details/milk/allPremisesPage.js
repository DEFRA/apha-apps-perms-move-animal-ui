import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'List the premises the vehicle will visit on the collection day'

class AllPremisesPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'collectionPremises',
      noInputError:
        'Enter the premises names the vehicle will visit on collection day'
    })
  }

  pagePath = 'fmd/movement-details/premises-names'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AllPremisesPage()
