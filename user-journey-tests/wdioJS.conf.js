import merge from 'deepmerge'
import { config as wdioConf } from './wdio.conf.js'

export const config = merge(wdioConf, {
  specs: ['./specs/**/*.spec.js'],
  exclude: [
    './specs/noJavascript/**/*.js',
    './specs/identification/identifiersAnswers.spec.js',

    // Add back in
    './specs/biosecurity/biosecDynamicAnswers.spec.js',
    './specs/biosecurity/biosecurityAnswers.spec.js',
    './specs/finalAnswers.onFarm.spec.js',
    './specs/taskList.spec.js'
  ],
  maxInstances: 3,
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'stable',
      'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
      }
    }
  ]
})
