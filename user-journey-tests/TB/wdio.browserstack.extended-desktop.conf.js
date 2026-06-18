import { config as browserstackBaseConfig } from './wdio.browserstack.conf.js'

//  These capabilities should run as an extended test after publishing
export const config = {
  ...browserstackBaseConfig,
  exclude: [
    './specs/noJavascript/**/*.spec.js',
    './specs/finalAnswers.spec.js',
    './specs/submissionConfirmation.spec.js',
    './specs/origin/pages/checkAnswers.spec.js',
    './specs/origin/pages/originCountry.spec.js',
    './specs/receiving-the-licence/licenceAnswers.spec.js',
    './specs/origin/pages/fiftyPercentWarning.spec.js',
    './specs/biosecurity-map/**/*.js',
    './specs/biosecurity/biosecurityAnswers.spec.js',
    './specs/biosecurity/biosecDynamicAnswers.spec.js',
    './specs/finalAnswers.onFarm.spec.js',
    './specs/finalAnswersDeclarations.spec.js',
    './specs/identification/identifiersAnswers.spec.js'
  ],
  capabilities: [
    {
      browserName: 'Firefox',
      acceptInsecureCerts: true,
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '10',
        sessionName: 'windows-firefox'
      }
    },
    {
      browserName: 'Firefox',
      acceptInsecureCerts: true,
      'bstack:options': {
        browserVersion: 'latest',
        os: 'OS X',
        osVersion: 'Monterey',
        sessionName: 'osx-firefox'
      }
    },
    {
      browserName: 'Safari',
      acceptInsecureCerts: true,
      'bstack:options': {
        browserVersion: '15.6',
        os: 'OS X',
        osVersion: 'Monterey',
        sessionName: 'osx-safari'
      }
    }
  ]
}
