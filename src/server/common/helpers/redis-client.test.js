import { Cluster, Redis } from 'ioredis'

import { config } from '~/src/config/config.js'
import { buildRedisClient } from '~/src/server/common/helpers/redis-client.js'

jest.mock('ioredis', () => ({
  ...jest.requireActual('ioredis'),
  Cluster: jest.fn().mockReturnValue({ on: () => ({}) }),
  Redis: jest.fn().mockReturnValue({ on: () => ({}) })
}))

describe('#buildRedisClient', () => {
  describe('When Redis Single InstanceCache is requested', () => {
    beforeEach(() => {
      buildRedisClient(config.get('redis'))
    })

    test('Should instantiate a single Redis client', () => {
      expect(Redis).toHaveBeenCalledWith({
        db: 0,
        host: '127.0.0.1',
        keyPrefix: 'apha-apps-perms-move-animal-ui:',
        port: 6379,
        enableReadyCheck: false
      })
    })
  })

  describe('When a Redis Cluster is requested', () => {
    beforeEach(() => {
      buildRedisClient({
        ...config.get('redis'),
        useSingleInstanceCache: false,
        useTLS: true,
        username: 'user',
        password: 'pass'
      })
    })

    test('Should instantiate a Redis Cluster client', () => {
      expect(Cluster).toHaveBeenCalledWith(
        [{ host: '127.0.0.1', port: 6379 }],
        {
          dnsLookup: expect.any(Function),
          keyPrefix: 'apha-apps-perms-move-animal-ui:',
          redisOptions: {
            db: 0,
            password: 'pass',
            tls: {},
            username: 'user',
            enableReadyCheck: false
          },
          slotsRefreshTimeout: 10000
        }
      )
    })
  })
})
