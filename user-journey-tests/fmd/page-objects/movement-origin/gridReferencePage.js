import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the grid reference of the location?'

class GridReferencePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'gridRef',
      noInputError: 'Enter the grid reference for the origin premises'
    })
  }

  pagePath = 'fmd/movement-origin/grid-reference'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new GridReferencePage()
