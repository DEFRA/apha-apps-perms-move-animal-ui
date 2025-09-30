import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the name of the dairy collecting the milk?'

class DairyNamePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'dairyName',
      noInputError: 'Enter the name of the dairy'
    })
  }

  pagePath = 'fmd/movement-details/dairy-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new DairyNamePage()
