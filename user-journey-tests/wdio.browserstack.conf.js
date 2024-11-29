import merge from 'deepmerge'
import { config as wdioConf } from './wdio.conf.js'

export const config = merge(wdioConf, {
  specs: ['./specs/**/*.js'],
  exclude: ['./specs/noJavascript/**/*.js'],
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  maxInstances: 10,
  capabilities: [
    {
      browserName: 'Chrome',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10'
      }
    },
    {
      browserName: 'Edge',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10'
      }
    },
    {
      browserName: 'Firefox',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10'
      }
    },
    {
      browserName: 'Safari',
      'bstack:options': {
        browserVersion: '15.6',
        os: 'OS X',
        osVersion: 'Monterey'
      }
    },
    {
      browserName: 'Chrome',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'OS X',
        osVersion: 'Monterey'
      }
    },
    {
      browserName: 'Firefox',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'OS X',
        osVersion: 'Monterey'
      }
    }
    // {
    //   browserName: 'Safari',
    //   'bstack:options': {
    //     os: 'iOS',
    //     osVersion: '15.6',
    //     deviceName: 'iPhone 13',
    //     realMobile: true
    //   }
    // }
    // {
    //   browserName: 'Chrome',
    //   'bstack:options': {
    //     os: 'iOS',
    //     osVersion: '15.6',
    //     deviceName: 'iPhone 13',
    //     realMobile: true
    //   }
    // },
    // {
    //   browserName: 'Chrome',
    //   'bstack:options': {
    //     os: 'Android',
    //     osVersion: '12.0',
    //     deviceName: 'Samsung Galaxy S21',
    //     realMobile: true
    //   }
    // },
    // {
    //   browserName: 'Samsung Internet',
    //   'bstack:options': {
    //     os: 'Android',
    //     osVersion: '12.0',
    //     deviceName: 'Samsung Galaxy S21',
    //     realMobile: true
    //   }
    // }
  ],
  services: [
    [
      'browserstack',
      {
        testObservability: true, // Disable if you do not want to use the browserstack test observer functionality
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
