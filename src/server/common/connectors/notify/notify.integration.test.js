import { sendNotification } from './notify.js'
import { config } from '~/src/config/config.js'

describe('sendNotification (integration)', () => {
  it('should abort if the configured timeout is hit', async () => {
    const notifyConfig = config.get('notify')
    config.set('notify', {
      ...notifyConfig,
      timeout: 0
    })
    const testData = { content: 'test' }

    const result = sendNotification(testData)

    await expect(result).rejects.toThrow(
      'Request to GOV.uk notify timed out after 0ms'
    )
  })
})
