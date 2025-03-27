// Globally mock redis
jest.mock('ioredis')

process.env.DEFRA_ID_ENABLED = 'false'
