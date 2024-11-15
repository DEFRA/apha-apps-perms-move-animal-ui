/**
 * The first question to start the journey.
 * @satisfies {Partial<ServerRoute>}
 */
export const onOffFarmGetController = {
  handler(req, h) {
    const onOffFarm = req.yar.get('onOffFarm')

    return h.view('on-off-farm/index', {
      pageTitle: 'Are you moving the cattle on or off your farm?',
      heading: 'Are you moving the cattle on or off your farm?',
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
    const { onOffFarm } = /** @type {OnOffFarmPayload} */ (req.payload)

    if (!onOffFarm) {
      return res.view('on-off-farm/index', {
        pageTitle: 'Error: Are you moving the cattle on or off your farm?',
        heading: 'Are you moving the cattle on or off your farm?',
        errorMessage: {
          text: 'Select if you are moving cattle on or off your farm'
        }
      })
    }

    req.yar.set('onOffFarm', onOffFarm)

    if (onOffFarm === 'off') {
      return res.redirect('/cph-number')
    }

    return res.view('on-off-farm/index', {
      pageTitle: 'Are you moving the cattle on or off your farm?',
      heading: 'Are you moving the cattle on or off your farm?',
      onOffFarm: {
        value: onOffFarm
      }
    })
  }
}

/**
 * @typedef {{ onOffFarm: 'on' | 'off' }} OnOffFarmPayload
 * @import { ServerRoute, Request } from '@hapi/hapi'
 */
