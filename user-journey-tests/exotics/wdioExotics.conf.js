import merge from 'deepmerge'
import { config as wdioConf } from '../wdio.conf.js'

export const config = merge(wdioConf, {
  specs: ['./specs/movement-details/movementDetails.spec.js'],
  exclude: [],
  maxInstances: 7,
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'stable',
      'goog:chromeOptions': {
        args: ['disable-gpu']
      }
    }
  ]
})
