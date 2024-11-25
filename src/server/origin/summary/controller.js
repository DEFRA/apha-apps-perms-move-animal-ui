const indexView = 'origin/summary/index.njk'
export const pageTitle =
  'Check your answers before you continue your application'
export const pageHeading =
  'Check your answers before you continue your application'

/**
 * @satisfies {Partial<ServerRoute>}
 */
export const originSummaryGetController = {
  handler(req, h) {
    const origin = req.yar.get('origin') ?? {}

    return h.view(indexView, {
      pageTitle,
      heading: pageHeading,
      origin: {
        cphNumber: origin?.cphNumber,
        address: Object.values(origin?.address ?? {}).join('<br />'),
        onOffFarm:
          origin?.onOffFarm === 'on'
            ? 'On to the farm or premises'
            : 'Off the farm or premises'
      }
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 * @import { OriginAddress } from '../address/validator.js'
 * @typedef {{
 *   onOffFarm: string;
 *   cphNumber: string;
 *   address: OriginAddress;
 * }} Origin
 */
