import { SingleInputBasePage } from '../../../base-pages/singleInputBasePage.js'

const pageHeadingAndTitle = 'What type of bird are you moving?'

class BirdTypeInputPage extends SingleInputBasePage {
  pagePath =
    'exotics/about-the-movement/what-is-moving/select-animals/birds/enter-bird-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfBirdOther',
      noInputError: 'Enter what type of bird you are moving'
    })
  }
}

export default new BirdTypeInputPage()
