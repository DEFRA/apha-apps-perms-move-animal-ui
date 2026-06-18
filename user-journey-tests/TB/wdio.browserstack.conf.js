import merge from 'deepmerge'
import { config as wdioConf } from '../wdio.conf.js'

// These capabilites should run as part of the publish yaml as an initial check before publishing
export const config = merge(wdioConf, {
  specs: ['./specs/**/*.spec.js'],
  exclude: [
    './specs/noJavascript/**/*.spec.js',
    './specs/biosecurity-map/biosecurityMapUpload.spec.js',
    './specs/identification/identifiersAnswers.spec.js',
    './specs/origin/pages/originCountry.spec.js'
  ],
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  maxInstances: 5,
  maxInstancesPerCapability: 2,
  connectionRetryTimeout: 240000,
  specFileRetries: 1,
  capabilities: [
    {
      browserName: 'Edge',
      acceptInsecureCerts: true,
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10',
        sessionName: 'windows-edge'
      }
    },
    {
      browserName: 'Chrome',
      acceptInsecureCerts: true,
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10',
        sessionName: 'windows-chrome'
      }
    },
    {
      browserName: 'Chrome',
      acceptInsecureCerts: true,
      'bstack:options': {
        browserVersion: 'latest',
        os: 'OS X',
        osVersion: 'Monterey',
        sessionName: 'osx-chrome'
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
        browserstackLocal: true,
        opts: {
          forceLocal: true
        }
      }
    ]
  ]
})
