import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'

const pageId = 'manureAndSlurryDetails'
const pageHeadingAndTitle = 'How will you manage slurry and manure?'
const noInputError = 'Enter how you will manage slurry and manure'
const checkboxIds = [
  'not-purchased',
  'stored',
  'three-weeks',
  'six-months',
  'other'
]

class ManureDetailsPage extends CheckboxBasePage {
  constructor() {
    super({ checkboxIds, pageId, noInputError })
  }

  pagePath = 'biosecurity/manure-and-slurry-details'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new ManureDetailsPage()
