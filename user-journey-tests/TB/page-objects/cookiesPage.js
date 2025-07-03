import { Page } from '../page-objects/page.js'

const pageHeadingAndTitle = 'Cookies'

class CookiesPage extends Page {
  pagePath = '/cookies'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new CookiesPage()
