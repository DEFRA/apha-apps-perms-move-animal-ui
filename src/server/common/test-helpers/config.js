import { config } from '~/src/config/config.js'

/* global jest */

/**
 * @param {string} key
 * @param {any} value
 */
export const spyOnConfig = (key, value) => {
  const configGet = config.get.bind(config)
  jest.spyOn(config, 'get').mockImplementation((name) => {
    if (name === key) {
      return value
    } else {
      return configGet(name)
    }
  })
  return config
}
