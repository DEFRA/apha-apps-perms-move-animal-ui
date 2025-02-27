import * as page from '../../helpers/page.js'
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'dilutionRate'
const pageHeadingAndTitle =
  'What dilution rate are you using for your disinfectant?'
const noInputError = 'Enter the dilution rate'
const invalidFormatError = 'Enter a number'

class DisinfectantDilutionPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError, invalidFormatError })
  }

  pagePath = 'biosecurity/disinfectant-dilution'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  get dilutionGovLink() {
    return $('a*=disinfectants approved for use in England')
  }

  async verifyDilutionGovLink() {
    await page.validateHrefOfElement(
      this.dilutionGovLink,
      'http://disinfectants.defra.gov.uk/DisinfectantsExternal/Default.aspx?Module=ApprovalsList_SI'
    )
  }
}

export default new DisinfectantDilutionPage()
