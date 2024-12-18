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
    return `/${this.page.urlKey ?? this.page.sectionKey}/check-answers`
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
    const section = this.page.sectionFactory(req.yar.get(this.page.sectionKey))

    const { isValid, firstInvalidPage } = section.validate()
    if (!isValid) {
      return res.redirect(
        `${firstInvalidPage?.urlPath}?redirect_uri=/${this.page.urlKey ?? this.page.sectionKey}/check-answers`
      )
    }

    const items = section.questionPageAnswers.map(({ page, answer }) => ({
      key: page.question,
      value: answer.html,
      url: `${page.urlPath}?redirect_uri=/${this.page.urlKey ?? this.page.sectionKey}/check-answers`,
      visuallyHiddenKey: page.question,
      attributes: {
        'data-testid': `${page.questionKey}-change-link`
      }
    }))

    return res.view(this.indexView, {
      pageTitle: this.page.pageTitle,
      heading: this.page.heading,
      summary: items
    })
  }

  postHandler(_req, res) {
    return res.redirect('/task-list')
  }
}
