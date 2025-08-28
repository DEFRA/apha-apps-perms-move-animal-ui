import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'

const pageId = 'dilutionRate'
const pageHeadingAndTitle = 'Confirmation of the dilution rate'
const noInputError = 'You need to tick the confirmation box'

const checkboxIds = ['dilutionRateConfirmed']
class DisinfectantDilutionPage extends CheckboxBasePage {
  pagePath = 'biosecurity/disinfectant-dilution'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  constructor() {
    super({
      checkboxIds,
      pageId,
      noInputError
    })
  }
}

export default new DisinfectantDilutionPage()
