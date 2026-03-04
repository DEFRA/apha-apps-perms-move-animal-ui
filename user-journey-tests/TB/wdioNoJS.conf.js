import { createLocalChromeConfig } from '../shared/wdio-local-chrome.js'

export const config = createLocalChromeConfig({
  specs: ['./specs/noJavascript/**/*.spec.js'],
  maxInstances: 3,
  disableJavascript: true
})
