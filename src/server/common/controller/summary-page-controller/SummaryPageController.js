/** @import SummaryPage from '../../model/page/summary-page/SummaryPageModel.js' */
/** @import { Server, ServerRegisterPluginObject } from '@hapi/hapi' */

export class SummaryPageController {
  /** @type {string} */
  indexView = 'common/controller/summary-page-controller/index.njk'

  /** @type {string} */
  pageTitle

  /** @type {string} */
  heading

  /**
   * @param {SummaryPage} page
   */
  constructor(page) {
    this.page = page
  }

  get urlPath() {
    return `/${this.page.sectionKey}/check-answers`
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    return {
      plugin: {
        name: `${this.page.sectionKey}-check-answers`,

        /** @param {Server} server */
        register: (server) => {
          server.route([
            {
              method: 'GET',
              path: this.urlPath,
              handler: this.getHandler.bind(this)
            },
            {
              method: 'POST',
              path: this.urlPath,
              handler: this.postHandler.bind(this)
            }
          ])
        }
      }
    }
  }

  getHandler(req, res) {
    const section = this.page.sectionFactory(req.yar.get('origin'))

    const { isValid, firstInvalidPage } = section.validate()
    if (!isValid) {
      return res.redirect(
        `${firstInvalidPage?.urlPath}?redirect_uri=/${this.page.sectionKey}/check-answers`
      )
    }

    const items = section.pages.map((visitedPage) => ({
      key: visitedPage.question,
      value: section[visitedPage.questionKey].html,
      url: `${visitedPage.urlPath}?redirect_uri=/${this.page.sectionKey}/check-answers`,
      visuallyHiddenKey: visitedPage.question,
      attributes: {
        'data-testid': `${visitedPage.questionKey}-change-link`
      }
    }))

    return res.view(this.indexView, {
      pageTitle: this.page.pageTitle,
      heading: this.page.heading,
      originSummary: items
    })
  }

  postHandler(_req, res) {
    return res.redirect('/task-list')
  }
}
