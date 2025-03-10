import { config as browserstackBaseConfig } from './wdio.browserstack.conf.js'

//  These capabilities should run as an extended test after publishing
export const config = {
  ...browserstackBaseConfig,
  maxInstances: 8,
  exclude: [
    './specs/noJavascript/**/*.spec.js',
    './specs/finalAnswers.spec.js',
    './specs/submissionConfirmation.spec.js',
    './specs/origin/checkAnswers.spec.js',
    './specs/receiving-the-licence/licenceAnswers.spec.js',
    './specs/origin/fiftyPercentWarning.spec.js',
    './specs/biosecurity-map/**/*.js',
    './specs/biosecurity/biosecurityAnswers.spec.js',
    './specs/biosecurity/biosecDynamicAnswers.spec.js',
    './specs/finalAnswers.onFarm.spec.js',
    './specs/finalAnswersDeclarations.spec.js',
    './specs/identification/identifiersAnswers.spec.js',
    './specs/biosecurity/biosecDynamicAnswers.spec.js'
  ],
  capabilities: [
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
        browserVersion: '15.6',
        os: 'OS X',
        osVersion: 'Monterey',
        sessionName: 'osx-safari'
      }
    }
  ]
}
