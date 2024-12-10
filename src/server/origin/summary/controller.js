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
  handler(req, h) {
    const origin = Origin.fromState(req.yar.get('origin'))
    const { isValid, result } = origin.validate()

    /** @type {QuestionPage[]} */
    const pages = []

    /** @type {Page} */
    let page = new OnOffFarmPage()

    while (page instanceof QuestionPage) {
      pages.push(page)
      page = page.nextPage(origin[page.questionKey])
    }

    if (!isValid) {
      if (!result.onOffFarm.isValid) {
        return h.redirect(
          '/origin/to-or-from-own-premises?redirect_uri=/origin/summary'
        )
      }
      if (!result.cphNumber.isValid) {
        return h.redirect('/origin/cph-number?redirect_uri=/origin/summary')
      }
      if (!result.address.isValid) {
        return h.redirect('/origin/address?redirect_uri=/origin/summary')
      }
    }

    const items = pages.map((page) => ({
      key: {
        text: page.question,
        classes: 'govuk-!-width-one-half govuk-!-font-weight-regular'
      },
      value: {
        html: origin[page.questionKey].html
      },
      actions: {
        items: [
          {
            href: `${page.urlPath}?redirect_uri=/origin/summary`,
            text: 'Change',
            visuallyHiddenText: page.question,
            attributes: {
              'data-testid': `${page.questionKey}-change-link`
            }
          }
        ]
      }
    }))

    return h.view(indexView, {
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
