import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'How frequent is the movement?'

class MovementFrequencyPage extends RadioButtonBasePage {
  pagePath = 'exotics/movement-details/frequency'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'frequency',
      noInputError: 'Select the frequency of the movement',
      valueArray: ['regular', 'one-off']
    })
  }
}

export default new MovementFrequencyPage()
