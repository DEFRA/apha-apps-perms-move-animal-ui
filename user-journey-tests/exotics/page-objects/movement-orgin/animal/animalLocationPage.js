// pageobjects/TypeOfAnimalLocationPage.js
import { RadioButtonBasePage } from '../../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Where are the animals kept?'

class TypeOfAnimalLocationPage extends RadioButtonBasePage {
  pagePath = 'exotics/movement-origin/animal-location'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfAnimalLocation',
      noInputError: 'Select where the animals are kept',
      valueArray: ['farm', 'corporate-holding', 'domestic-residence', 'other']
    })
  }
}

export default new TypeOfAnimalLocationPage()
