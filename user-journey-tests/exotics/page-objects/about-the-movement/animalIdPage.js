import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What are the ID numbers for the animals you are moving?'

class AnimalIdPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'animalsId',
      noInputError: 'Enter the ID numbers for the animals you are moving'
    })
  }

  pagePath = 'exotics/about-the-movement/what-is-moving/id-numbers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AnimalIdPage()
