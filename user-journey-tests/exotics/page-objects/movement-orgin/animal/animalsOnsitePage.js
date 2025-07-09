import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What animals are on the premises?'

class FieldParcelNumberPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'animalsOnPremises',
      noInputError: 'Enter what animals are on the premises'
    })
  }

  pagePath = 'exotics/movement-origin/animals-onsite'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new FieldParcelNumberPage()
