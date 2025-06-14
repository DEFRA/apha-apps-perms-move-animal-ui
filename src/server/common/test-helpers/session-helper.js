import { createLogger } from '../helpers/logging/logger.js'
import { withCsrfProtection } from './csrf.js'

export const addSessionHelper = (server) => {
  server.route([
    {
      method: 'GET',
      path: '/start-state',
      handler: (req, res) => {
        req.yar.set('foo', 'bar') // need to set something or no session created
        return res.response('session started').code(200)
      }
    },
    {
      method: 'POST',
      path: '/set-state',
      handler: (req, res) => {
        const { key, value } = req.payload
        req.yar.set(key, value)

        return res.response(req.payload).code(200)
      }
    },
    {
      method: 'POST',
      path: '/get-state',
      handler: (req, res) => {
        const { key } = req.payload

        return res.response(req.yar.get(key)).code(200)
      }
    }
  ])
}

export const startSession = async (server) => {
  const createSession = await server.inject(
    withCsrfProtection({
      method: 'GET',
      url: '/start-state'
    })
  )

  const header = createSession.headers['set-cookie']
  // eslint-disable-next-line no-control-regex
  const cookie = header?.at(0)?.match(/(session=[^\x00-\x20",;\\\x7F]*)/) // line from `yar` library

  return cookie?.at(1)
}

export const setSession = async (server, sessionCookie, key, session) => {
  const { payload } = await server.inject(
    withCsrfProtection(
      {
        method: 'POST',
        url: '/set-state',
        payload: {
          key,
          value: session
        }
      },
      {
        Cookie: sessionCookie
      }
    )
  )

  return JSON.parse(payload)
}

export const getSession = async (server, sessionCookie, key, json = true) => {
  const { payload } = await server.inject(
    withCsrfProtection(
      {
        method: 'POST',
        url: '/get-state',
        payload: {
          key
        }
      },
      {
        Cookie: sessionCookie
      }
    )
  )

  if (!payload) {
    return
  }

  return json ? JSON.parse(payload) : payload
}

class SessionTester {
  _logger = createLogger()
  _server
  _cookie

  constructor(server) {
    this._server = server

    const routes = server
      .table()
      .map((route) => `${route.method}::${route.path}`)

    if (!routes.includes('get::/start-state')) {
      addSessionHelper(server)
    }
  }

  static async create(server) {
    const sessionTester = new SessionTester(server)
    await sessionTester._startSession()

    return sessionTester
  }

  /**
   * @returns {Promise<string>}
   */
  async _startSession() {
    this._logger.info('Starting session')
    this._cookie = await startSession(this._server)
    this._logger.info('Session started')

    return this._cookie
  }

  /**
   * @param {string} key
   * @param {{[key: string]: any}} state
   */
  async setSectionState(key, state) {
    this._logger.info(
      `Setting section state ${key} to ${JSON.stringify(state)}`
    )
    const applicationState = (await this.getState('application')) || {}
    applicationState[key] = state
    return this.setState('application', applicationState)
  }

  /**
   * @param {string} key
   * @param {{[key: string]: any}} state
   */
  async setState(key, state) {
    this._logger.info(`Setting state ${key} to ${JSON.stringify(state)}`)
    return setSession(this._server, this._cookie, key, state)
  }

  /**
   * @param {string} key
   * @returns {Promise<{[key: string]: any}>}
   */
  async getSectionState(key) {
    this._logger.info(`Getting state ${key}`)
    const applicationState = await this.getState('application')
    return applicationState?.[key]
  }

  /**
   * @param {string} key
   * @returns {Promise<{[key: string]: any}>}
   */
  async getState(key) {
    this._logger.info(`Getting state ${key}`)
    return getSession(this._server, this._cookie, key)
  }

  /**
   * @param {string} key
   * @returns {Promise<unknown>}
   */
  async getRawState(key) {
    this._logger.info(`Getting raw state ${key}`)
    return getSession(this._server, this._cookie, key, false)
  }

  /**
   * @param {string} key
   */
  async getStateKey(key) {
    this._logger.info(`Getting state for ${key}`)
    return getSession(this._server, this._cookie, key)
  }

  get sessionID() {
    return this._cookie
  }
}

export default SessionTester
