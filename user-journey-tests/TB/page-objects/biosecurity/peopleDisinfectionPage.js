import { CheckboxBasePage } from '../base-pages/checkboxBasePage.js'

const checkboxIds = [
  'ppe',
  'disinfectingBoots',
  'disinfectingOnArrivalAndDeparture',
  'dedicatedStaff',
  'other'
]

const pageId = 'peopleDisinfection'
const pageHeadingAndTitle =
  'Which measures are staff taking to reduce the risk of spreading TB?'

class PeopleDisinfectionPage extends CheckboxBasePage {
  pagePath = 'biosecurity/people-disinfection'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  constructor() {
    super({
      checkboxIds,
      pageId
    })
  }
}

export default new PeopleDisinfectionPage()
