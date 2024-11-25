import addressValidator from '../address/validator.js'
import cphNumberValidator from '../cph-number/validator.js'
import onOffValidator from '../on-off-farm/validator.js'

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

    const originOnOffFarm = origin?.onOffFarm
    let enteredOnOffFarm

    if (originOnOffFarm === 'on') {
      enteredOnOffFarm = 'On to the farm or premises'
    } else if (originOnOffFarm === 'off') {
      enteredOnOffFarm = 'Off the farm or premises'
    } else {
      enteredOnOffFarm = ''
    }

    const onOffFarm = onOffValidator(origin?.onOffFarm ?? '')
    if (!onOffFarm.isValid) {
      return h.redirect('/origin/on-off-farm')
    }

    const cphNumber = cphNumberValidator(origin?.cphNumber ?? '')
    if (!cphNumber.isValid) {
      return h.redirect('/origin/cph-number')
    }

    const address = addressValidator(origin?.address ?? {})
    if (!address.isValid) {
      return h.redirect('/origin/address')
    }

    return h.view(indexView, {
      pageTitle,
      heading: pageHeading,
      origin: {
        cphNumber: origin?.cphNumber,
        address: Object.values(origin?.address ?? {}).join('<br />'),
        onOffFarm: enteredOnOffFarm
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
