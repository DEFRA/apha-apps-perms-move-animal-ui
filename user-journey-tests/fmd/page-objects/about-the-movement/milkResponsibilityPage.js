import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Who is moving the milk?'

class AnimalTypeSlaughterPage extends RadioButtonBasePage {
  pagePath = 'fmd/about-the-movement-or-activity/producer'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'milkWhoIsMoving',
      noInputError: 'Select who is moving the milk',
      valueArray: ['producer', 'dairy']
    })
  }
}

export default new AnimalTypeSlaughterPage()
