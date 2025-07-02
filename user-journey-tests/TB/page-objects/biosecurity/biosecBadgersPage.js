import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'

const pageHeadingAndTitle =
  'Which measures are you taking to reduce the risk of infection from wildlife?'

const checkboxIds = [
  'badgerProofFencing',
  'aluminiumFeedBins',
  'limitAccessToBadgerHabitat',
  'troughsAbove90cm',
  'securedFeedStores',
  'licksOutOfReach',
  'other'
]

class WildlifeMeasuresPage extends CheckboxBasePage {
  pagePath = 'biosecurity/badgers'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  constructor() {
    super({
      checkboxIds
    })
  }
}

export default new WildlifeMeasuresPage()
