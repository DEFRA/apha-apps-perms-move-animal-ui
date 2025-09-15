import { CheckboxBasePage } from '../../../base-pages/checkboxBasePage.js'

const pageId = 'whatAnimals'
const pageHeadingAndTitle = 'What animals are kept on the premises?'
const noInputError = 'Select what animals are kept on the premises'

const checkboxIds = [
  'whatAnimals', //cattle
  'whatAnimals-2', //sheep
  'whatAnimals-3', //goats
  'whatAnimals-4', //pigs
  'whatAnimals-5', //camelids
  'whatAnimals-6', //other-hooved
  'whatAnimals-8' //none
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
