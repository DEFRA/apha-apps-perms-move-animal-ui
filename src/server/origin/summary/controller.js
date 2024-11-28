import { Address } from '~/src/server/common/model/origin/address.js'
import { CphNumber } from '~/src/server/common/model/origin/cph-number.js'
import { OnOffFarm } from '~/src/server/common/model/origin/on-off-farm.js'

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

    const onOffFarm = OnOffFarm.fromState(origin?.onOffFarm).validate()
    if (!onOffFarm.isValid) {
      return h.redirect(
        '/origin/to-or-from-own-premises?redirect_uri=/origin/summary'
      )
    }

    const cphNumber = CphNumber.fromState(origin.cphNumber)
    if (!cphNumber.validate().isValid) {
      return h.redirect('/origin/cph-number?redirect_uri=/origin/summary')
    }

    const address = Address.fromState(origin?.address)
    if (!address.validate().isValid) {
      return h.redirect('/origin/address?redirect_uri=/origin/summary')
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
 * @satisfies {Partial<ServerRoute>}
 */
export const originSummaryPostController = {
  handler(req, h) {
    return h.redirect('/task-list')
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 * @import { AddressData } from '~/src/server/common/model/origin/address.js'
 * @typedef {{
 *   onOffFarm: string;
 *   cphNumber: string;
 *   address: AddressData;
 * }} Origin
 */
