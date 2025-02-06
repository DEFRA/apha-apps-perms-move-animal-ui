import merge from 'deepmerge'
import { config as wdioConf } from './wdio.conf.js'

export const config = merge(wdioConf, {
  specs: ['./specs/biosecurity/biosecurityAnswers.spec.js'],
  exclude: ['./specs/noJavascript/**/*.js'],
  maxInstances: 3,
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
