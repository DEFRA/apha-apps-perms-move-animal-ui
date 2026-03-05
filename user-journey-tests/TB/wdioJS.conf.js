import { createLocalChromeConfig } from '../shared/wdio-local-chrome.js'

export const config = createLocalChromeConfig({
  specs: ['./specs/**/*.spec.js'],
  exclude: [
    './specs/noJavascript/**/*.spec.js',
    './specs/identification/identifiersAnswers.spec.js',
    './specs/destination/destinationAnswersOnFarm.spec.js',
    './specs/destination/destinationAddress.spec.js'
  ],
  maxInstances: 7
})
