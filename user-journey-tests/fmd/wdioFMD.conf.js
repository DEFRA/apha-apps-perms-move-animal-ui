import { createLocalChromeConfig } from '../shared/wdio-local-chrome.js'

export const config = createLocalChromeConfig({
  specs: ['./specs/**/*.spec.js'],
  exclude: [],
  maxInstances: 7
})
