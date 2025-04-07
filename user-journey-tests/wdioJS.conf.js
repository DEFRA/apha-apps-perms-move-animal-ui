import merge from 'deepmerge'
import { config as wdioConf } from './wdio.conf.js'

export const config = merge(wdioConf, {
  specs: ['./specs/identification/identificationAnswers.spec.js'],
  exclude: [
    './specs/noJavascript/**/*.js',
    './specs/identification/identifiersAnswers.spec.js'
  ],
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
