import { config as browserstackBaseConfig } from './wdio.browserstack.conf.js'

//  These capabilities should run as an extended test after publishing
export const config = {
  ...browserstackBaseConfig,
  exclude: [
    './specs/noJavascript/**/*.spec.js',
    './specs/finalAnswers.spec.js',
    './specs/submissionConfirmation.spec.js',
    './specs/origin/checkAnswers.spec.js',
    './specs/receiving-the-licence/licenceAnswers.spec.js'
  ],
  maxInstances: 3,
  capabilities: [
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
  ]
}
