import { calculateNextPage } from '../../common/helpers/next-page.js'

const pageTitle = 'Are you moving the cattle on or off your farm or premises?'
const pageHeading = 'Are you moving the cattle on or off your farm or premises?'
const indexView = 'origin/on-off-farm/index.njk'

/**
 * The first question to start the journey.
 * @satisfies {Partial<ServerRoute>}
 */
export const onOffFarmGetController = {
  handler(req, h) {
    const { onOffFarm } = req.yar.get('origin') ?? {}

    return h.view(indexView, {
      nextPage: req.query.redirect_uri,
      pageTitle,
      heading: pageHeading,
      onOffFarm: {
        value: onOffFarm
      }
    })
  }
}

/**
 * Respond to the first question.
 * @satisfies {Partial<ServerRoute>}
 * @param req
 */
export const onOffFarmPostController = {
  handler(req, res) {
    const { onOffFarm, nextPage } = /** @type {OnOffFarmPayload & NextPage} */ (
      req.payload
    )

    if (!onOffFarm) {
      return res.view(indexView, {
        pageTitle: `Error: ${pageTitle}`,
        heading: pageHeading,
        errorMessage: {
          text: 'Select if you are moving cattle on or off your farm or premises'
        }
      })
    }

    req.yar.set('origin', {
      ...req.yar.get('origin'),
      onOffFarm
    })

    switch (onOffFarm) {
      case 'off':
        return res.redirect(calculateNextPage(nextPage, '/origin/cph-number'))
      case 'on':
        return res.redirect('/exit-page')
      default:
        return res.view(indexView, {
          pageTitle: `Error: ${pageTitle}`,
          heading: pageHeading,
          errorMessage: {
            text: 'Select if you are moving cattle on or off your farm or premises'
          }
        })
    }
  }
}

/**
 * @typedef {{ onOffFarm: 'on' | 'off' }} OnOffFarmPayload
 * @import { ServerRoute } from '@hapi/hapi'
 * @import {NextPage} from '../../common/helpers/next-page.js'
 */
