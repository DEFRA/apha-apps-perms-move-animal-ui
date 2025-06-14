import { config } from '~/src/config/config.js'

/* global jest */

const configGet = config.get.bind(config)
/**
 * @param {string} key
 * @param {any} value
 */
export const spyOnConfig = (key, value) => {
  jest.spyOn(config, 'get').mockImplementation((name) => {
    if (name === key) {
      return value
    } else {
      return configGet(name)
    }
  })
  return config
}

export const spyOnConfigMany = (mockConfig) => {
  jest.spyOn(config, 'get').mockImplementation((name) => {
    if (name)
      return mockConfig[name] !== undefined ? mockConfig[name] : configGet(name)
  })

  return config
}
