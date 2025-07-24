import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Where will the visit take place?'

class WhereWillTheVisitTakePlacePage extends RadioButtonBasePage {
  pagePath = 'exotics/location-of-visit/visit'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'typeOfLocation',
      noInputError: 'Select where the visit will take place',
      valueArray: ['farm', 'corporate-holding', 'domestic-residence', 'other']
    })
  }
}

export default new WhereWillTheVisitTakePlacePage()
