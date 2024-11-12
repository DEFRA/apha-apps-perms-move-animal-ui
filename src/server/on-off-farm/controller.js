/**
 * The first question to start the journey.
 * @satisfies {Partial<ServerRoute>}
 */
export const onOffFarmGetController = {
  handler(req, h) {
    req.yar.set('animal', 'cow')
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

export const onOffFarmPostController = {
  handler(req, res) {
    const { onOffFarm } = req.payload

    if (!onOffFarm) {
      return res.view('on-off-farm/index', {
        pageTitle: 'Are you moving the cattle on or off your farm?',
        heading: 'Are you moving the cattle on or off your farm?',
        errorMessage: {
          text: 'Select whether you are moving cattle on or off your farm'
        }
      })
    }

    req.yar.set('onOffFarm', onOffFarm)

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
 * @import { ServerRoute } from '@hapi/hapi'
 */
