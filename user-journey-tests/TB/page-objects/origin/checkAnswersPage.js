import { NewAnswersBasePage } from '../base-pages/newAnswersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class OriginCheckAnswersPage extends NewAnswersBasePage {
  pagePath = 'tb-origin/summary'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      onOffFarm:
        '[href^="/tb-origin/are-you-moving-the-animals-on-or-off-your-farm-or-premises"]',
      originType:
        '[href^="/tb-origin/which-type-of-premises-are-the-animals-moving-off"]',
      parishNumber:
        '[href^="/tb-origin/what-is-the-county-parish-holding-cph-number-of-where-the-animals-are-moving-off"]',
      address:
        '[href^="/tb-origin/what-is-the-address-where-the-animals-are-moving-off"]'
    })
  }
}

export default new OriginCheckAnswersPage()
