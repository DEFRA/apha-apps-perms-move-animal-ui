import { sendNotification } from './notify.js'
import { config } from '~/src/config/config.js'

describe('sendNotification (integration)', () => {
  it('should abort if the configured timeout is hit', async () => {
    const configGet = config.get.bind(config)
    const notifyConfig = {
      ...config.get('notify'),
      timeout: 0
    }
    jest.spyOn(config, 'get').mockImplementation((name) => {
      if (name === 'notify') {
        return notifyConfig
      } else {
        return configGet(name)
      }
    })

    const testData = { content: 'test' }

    const result = sendNotification(testData)

    await expect(result).rejects.toThrow(
      'Request to GOV.uk notify timed out after 0ms'
    )
  })
})
