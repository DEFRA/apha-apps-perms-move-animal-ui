// Globally mock redis
jest.mock('ioredis', () => {
  return {
    Redis: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      setex: jest.fn(),
      del: jest.fn(),
      exists: jest.fn(),
      expire: jest.fn(),
      ttl: jest.fn(),
      quit: jest.fn(),
      disconnect: jest.fn()
    })),
    Cluster: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      setex: jest.fn(),
      del: jest.fn(),
      exists: jest.fn(),
      expire: jest.fn(),
      ttl: jest.fn(),
      quit: jest.fn(),
      disconnect: jest.fn()
    }))
  }
})

process.env.DEFRA_ID_ENABLED = 'false'
