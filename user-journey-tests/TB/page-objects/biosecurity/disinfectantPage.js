/* eslint-disable lines-between-class-members */
import * as page from '../../helpers/page.js'
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'disinfectant'
const pageHeadingAndTitle = 'What disinfectant are you using?'
const noInputError = 'Enter the first 2 letters of the disinfectant you are using'

class DisinfectantPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/disinfectant'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  get disinfectantGovLink() {
    return $('a*=disinfectant approved for Tuberculosis')
  }

  async verifyDisinfectantGovLink() {
    await page.validateHrefOfElement(
      this.disinfectantGovLink,
      'http://disinfectants.defra.gov.uk/DisinfectantsExternal/Default.aspx?Module=ApprovalsList_SI'
    )
  }
}

export default new DisinfectantPage()
