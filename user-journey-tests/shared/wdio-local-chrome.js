import merge from 'deepmerge'
import { config as wdioConf } from '../wdio.conf.js'

export const createLocalChromeConfig = ({
  specs = [],
  exclude = [],
  maxInstances = 7,
  disableJavascript = false
} = {}) =>
  merge(wdioConf, {
    specs,
    exclude,
    maxInstances,
    capabilities: [
      {
        browserName: 'chrome',
        browserVersion: 'stable',
        'goog:chromeOptions': {
          ...(disableJavascript
            ? {
                prefs: {
                  'profile.managed_default_content_settings.javascript': 2
                }
              }
            : {}),
          args: ['headless', 'disable-gpu']
        }
      }
    ]
  })
