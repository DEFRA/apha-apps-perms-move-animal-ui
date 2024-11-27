import { calculateNextPage } from '../../common/helpers/next-page.js'
import { OnOffFarm } from '~/src/server/common/model/on-off-farm.js'

const pageTitle = 'Are you moving the cattle on or off your farm or premises?'
const pageHeading = 'Are you moving the cattle on or off your farm or premises?'
const indexView = 'origin/on-off-farm/index.njk'

/**
 * The first question to start the journey.
 * @satisfies {Partial<ServerRoute>}
 */
export const onOffFarmGetController = {
  handler(req, h) {
    const onOffFarm = OnOffFarm.fromState(req.yar.get('origin')?.onOffFarm)

    return h.view(indexView, {
      nextPage: req.query.redirect_uri,
      pageTitle,
      heading: pageHeading,
      onOffFarm
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
    const payload = /** @type {OnOffFarmPayload & NextPage} */ (req.payload)

    const onOffFarm = new OnOffFarm(payload)
    const { isValid, errors } = onOffFarm.validate()

    if (!isValid) {
      req.yar.set('origin', {
        ...req.yar.get('origin'),
        onOffFarm: undefined
      })

      return res.view(indexView, {
        nextPage: calculateNextPage(
          payload.nextPage,
          '/origin/to-or-from-own-premises'
        ),
        pageTitle: `Error: ${pageTitle}`,
        heading: pageHeading,
        errorMessage: errors.onOffFarm
      })
    }

    req.yar.set('origin', {
      ...req.yar.get('origin'),
      onOffFarm: onOffFarm.toState()
    })

    switch (payload.onOffFarm) {
      case 'off':
        return res.redirect(
          calculateNextPage(payload.nextPage, '/origin/cph-number')
        )
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
