import validator from './validator.js'

const pageTitle = 'Are you moving the cattle on or off your farm or premises?'
const pageHeading = 'Are you moving the cattle on or off your farm or premises?'
const indexView = 'on-off-farm/index.njk'

/**
 * The first question to start the journey.
 * @satisfies {Partial<ServerRoute>}
 */
export const onOffFarmGetController = {
  handler(req, h) {
    const onOffFarm = req.yar.get('onOffFarm')

    return h.view(indexView, {
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
    const { onOffFarm } = /** @type {OnOffFarmPayload} */ (req.payload)
    const { isValid, errors } = validator({ onOffFarm })

    if (!isValid) {
      return res.view(indexView, {
        pageTitle: `Error: ${pageTitle}`,
        heading: pageHeading,
        errorMessage: {
          text: errors.onOffFarm
        }
      })
    }

    req.yar.set('onOffFarm', onOffFarm)

    switch (onOffFarm) {
      case 'off':
        return res.redirect('/cph-number')
      case 'on':
        return res.redirect('/exit-page')
    }
  }
}

/**
 * @typedef {{ onOffFarm: 'on' | 'off' }} OnOffFarmPayload
 * @import { ServerRoute } from '@hapi/hapi'
 */
