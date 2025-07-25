import { YesNoRadioPage } from '../base-pages/yesNoRadioBase.js'

const pageId = 'equipmentShared'
const pageHeadingAndTitle =
  'Will the incoming animals share any equipment and machinery with the resident herd?'
const noInputError =
  'Select if the incoming animals will share any equipment and machinery with the resident herd'

class SharedEquimentPage extends YesNoRadioPage {
  constructor() {
    super({
      pageId,
      noInputError
    })
  }

  pagePath = 'biosecurity/equipment-any-shared'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new SharedEquimentPage()
