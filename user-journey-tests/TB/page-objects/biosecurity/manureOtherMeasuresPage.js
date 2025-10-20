/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'SlurryManureOther'
const pageHeadingAndTitle =
  'What other measures are being taken to manage slurry and manure?'
const noInputError =
  'Enter details on the other measures being taken to manage slurry and manure'

class ManureOtherMeasuresPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/manure-and-slurry-details-other'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new ManureOtherMeasuresPage()
