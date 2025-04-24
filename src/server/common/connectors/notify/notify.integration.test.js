import { createServer } from '~/src/server/index.js'
import { sendNotification } from './notify.js'
import { config } from '~/src/config/config.js'

jest.mock(
  '~/src/server/common/connectors/notify/notify-token-utils.js',
  () => ({
    createToken: jest.fn().mockReturnValue('mocked-jwt-token')
  })
)

describe('sendNotification (integration)', () => {
  it('should abort if the configured timeout is hit', async () => {
    const server = await createServer()
    server.route([
      {
        method: 'POST',
        path: '/mock-notify',
        handler: (req, res) => {
          console.log('IN HANDLER')

          return res.response(req.payload).code(200)
        }
      }
    ])
    await server.initialize()

    const sleep = (m) => new Promise((r) => setTimeout(r, m))
    await sleep(100_000)
    // console.log(server.table().map((route) => `${route.method}::${route.path}`))

    const configGet = config.get.bind(config)
    const notifyConfig = {
      ...config.get('notify'),
      timeout: 10000,
      url: 'http://localhost:3000/mock-notify'
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
      'Request to GOV.uk notify timed out after 1ms'
    )
  })
})
