import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What type of premises are the animals kept at?'

class AnimalPremisesTypePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'typeOfAnimalLocationOther',
      noInputError: 'Enter the location of where the animals are kept'
    })
  }

  pagePath = 'exotics/movement-origin/animal-location/enter-premises-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AnimalPremisesTypePage()
