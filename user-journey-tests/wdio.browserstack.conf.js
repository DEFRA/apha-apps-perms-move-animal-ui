import merge from 'deepmerge'
import { config as wdioConf } from './wdio.conf.js'

// These capabilites should run as part of the publish yaml as an initial check before publishing
export const config = merge(wdioConf, {
  specs: ['./specs/**/*.js'],
  exclude: ['./specs/noJavascript/**/*.spec.js'],
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  maxInstances: 7,
  capabilities: [
    {
      browserName: 'Edge',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10',
        sessionName: 'windows-edge'
      }
    },
    {
      browserName: 'Safari',
      'bstack:options': {
        browserVersion: '15.6',
        os: 'OS X',
        osVersion: 'Monterey',
        sessionName: 'osx-safari'
      }
    }
  ],
  services: [
    [
      'browserstack',
      {
        testObservability: true,
        testObservabilityOptions: {
          projectName: 'apha-apps-perms-move-animal-ui',
          buildName: 'apha-test-run'
        },
        acceptInsecureCerts: true,
        forceLocal: true,
        browserstackLocal: true
      }
    ]
  ]
})
