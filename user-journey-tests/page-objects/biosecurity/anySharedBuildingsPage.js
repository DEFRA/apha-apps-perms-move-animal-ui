/* eslint-disable lines-between-class-members */
import { RadioButtonBasePage } from '../base-pages/radioButtonBasePage.js'

const pageId = 'buildingsAnyShared'
const pageHeadingAndTitle =
  'Will the cattle share any buildings and equipment with the resident herd?'
const noInputError =
  'Select if the cattle will share any buildings with the resident herd'
const valueArray = ['yes', 'no']

class AnySharedBuildingsPage extends RadioButtonBasePage {
  constructor() {
    super({
      pageId,
      noInputError,
      valueArray
    })
  }

  pagePath = 'biosecurity/buildings-any-shared'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  async selectYesAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[0], nextPage)
  }

  async selectNoAndContinue(nextPage) {
    await super.selectRadioAndContinue(valueArray[1], nextPage)
  }

  async sharedBuildingsErrorTest() {
    super.radioErrorTest()
  }
}

export default new AnySharedBuildingsPage()
