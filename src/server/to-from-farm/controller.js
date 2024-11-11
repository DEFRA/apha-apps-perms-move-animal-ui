/**
 * The first question to start the journey.

 * @satisfies {Partial<ServerRoute>}
 */
export const toFromFarmGetController = {
  handler(req, h) {
    req.yar.set('animal', 'cow')
    const toFromFarm = req.yar.get('toFromFarm')

    return h.view('to-from-farm/index', {
      pageTitle: 'Are you moving the cattle on or off your farm?',
      heading: 'Are you moving the cattle on or off your farm?',
      toFromFarm: {
        value: toFromFarm
      }
    })
  }
}

export const toFromFarmPostController = {
  handler(req, res) {
    const { toFromFarm } = req.payload

    if (!toFromFarm) {
      return res.view('to-from-farm/index', {
        pageTitle: 'Are you moving the cattle on or off your farm?',
        heading: 'Are you moving the cattle on or off your farm?',
        errorMessage: {
          text: 'Select whether you are moving cattle on or off your farm'
        }
      })
    }

    req.yar.set('toFromFarm', toFromFarm)

    return res.view('to-from-farm/index', {
      pageTitle: 'Are you moving the cattle on or off your farm?',
      heading: 'Are you moving the cattle on or off your farm?',
      toFromFarm: {
        value: toFromFarm
      }
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
