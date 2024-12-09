import merge from 'deepmerge'
import { config as wdioConf } from './wdio.conf.js'

//  These capabilities should run as an extended test after publishing
export const config = merge(wdioConf, {
  specs: ['./specs/**/*.js'],
  exclude: ['./specs/noJavascript/**/*.spec.js'],
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  maxInstances: 5,
  capabilities: [
    {
      browserName: 'Chrome',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10',
        sessionName: 'windows-chrome'
      }
    },
    {
      browserName: 'Firefox',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10',
        sessionName: 'windows-firefox'
      }
    },
    {
      browserName: 'Chrome',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'OS X',
        osVersion: 'Monterey',
        sessionName: 'osx-chrome'
      }
    },
    {
      browserName: 'Firefox',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'OS X',
        osVersion: 'Monterey',
        sessionName: 'osx-firefox'
      }
    },
    {
      browserName: 'Safari',
      'bstack:options': {
        os: 'iOS',
        osVersion: '15.6',
        deviceName: 'iPhone 13',
        realMobile: true,
        sessionName: 'ios-safari'
      }
    },
    {
      browserName: 'Chrome',
      'bstack:options': {
        os: 'iOS',
        osVersion: '15.6',
        deviceName: 'iPhone 13',
        realMobile: true,
        sessionName: 'ios-chrome'
      }
    }
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
