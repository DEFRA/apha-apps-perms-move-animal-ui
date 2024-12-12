import { Origin } from '../../common/model/section/origin.js'

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

    const { isValid, firstInvalidPage } = origin.validate()
    if (!isValid) {
      return res.redirect(
        `${firstInvalidPage?.urlPath}?redirect_uri=/origin/summary`
      )
    }

    const items = origin.pages.map((visitedPage) => ({
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
