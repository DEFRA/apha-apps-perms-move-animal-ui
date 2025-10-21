import { CheckboxBasePage } from '../../../base-pages/checkboxBasePage.js'

const checkboxIds = [
  'not-purchased',
  'stored',
  'three-weeks',
  'six-months',
  'other'
]

const pageId = 'manureAndSlurryDetails'
const pageHeadingAndTitle = 'How will you manage slurry and manure?'
const noInputError = 'Enter how you will manage manure and slurry'

class ManureDetailsPage extends CheckboxBasePage {
  pagePath = 'biosecurity/manure-and-slurry-details'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  constructor() {
    super({ checkboxIds, pageId, noInputError })
  }
}

export default new ManureDetailsPage()
