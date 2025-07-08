import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What type of species you are moving?'

class TypeOfSpeciesPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'typeOfAnimalOther',
      noInputError: 'Enter the species type you are moving'
    })
  }

  pagePath = 'exotics/about-the-movement/what-is-moving/select-animals/other'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new TypeOfSpeciesPage()
