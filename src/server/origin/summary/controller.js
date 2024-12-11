import { Origin } from '../../common/model/section/origin.js'
import { OnOffFarmPage } from '../on-off-farm/index.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'

const indexView = 'origin/summary/index.njk'
export const pageTitle =
  'Check your answers before you continue your application'
export const heading = pageTitle

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const originSummaryGetController = {
  handler(req, res) {
    const origin = Origin.fromState(req.yar.get('origin'))

    /** @type {QuestionPage[]} */
    const pages = []

    /** @type {Page} */
    let page = new OnOffFarmPage()

    while (page instanceof QuestionPage) {
      const currPage = origin[page.questionKey]
      pages.push(page)
      if (currPage.validate().isValid) {
        page = page.nextPage(currPage)
      } else {
        return res.redirect(`${page.urlPath}?redirect_uri=/origin/summary`)
      }
    }

    const items = pages.map((visitedPage) => ({
      key: visitedPage.question,
      value: origin[visitedPage.questionKey].html,
      url: `${visitedPage.urlPath}?redirect_uri=/origin/summary`,
      visuallyHiddenKey: visitedPage.question,
      attributes: {
        'data-testid': `${visitedPage.questionKey}-change-link`
      }
    }))

    return res.view(indexView, {
      pageTitle,
      heading,
      originSummary: items
    })
  }
}

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const originSummaryPostController = {
  handler(_req, h) {
    return h.redirect('/task-list')
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 * @import { Page } from '../../common/model/page/page-model.js'
 */
