import { CheckboxBasePage } from '../../../base-pages/checkboxBasePage.js'

const pageId = 'whatAnimals'
const pageHeadingAndTitle = 'What animals are kept on the premises?'
const noInputError = 'Select what animals are kept on the premises'

const checkboxIds = [
  'cattle',
  'sheep',
  'goats',
  'pigs',
  'camelids',
  'other',
  'noneabove'
]

class WhatAnimalsKeptPage extends CheckboxBasePage {
  pagePath = 'fmd/movement-origin/animals-kept-on-premises'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      checkboxIds,
      pageId,
      noInputError
    })
  }
}

export default new WhatAnimalsKeptPage()
