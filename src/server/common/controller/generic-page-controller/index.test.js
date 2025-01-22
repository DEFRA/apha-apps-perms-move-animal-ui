import { config } from '~/src/config/config.js'
import { Page } from '../../model/page/page-model.js'
import GenericPageController from './index.js'

class TestPage extends Page {
  reportMetrics = {
    get: {
      request: false,
      response: true
    },
    post: {
      request: false,
      response: true
    }
  }
}

class TestGenericController extends GenericPageController {
  handleGet() {
    return 'get'
  }

  handlePost() {
    return 'post'
  }
}

describe('#GenricPageController', () => {
  let controller

  beforeEach(() => {
    config.set('isProduction', true)
  })

  beforeEach(() => {
    const page = new TestPage()
    controller = new TestGenericController(page)
  })

  it('should output error on getHandler', () => {
    jest.spyOn(controller, 'handleGet').mockImplementation(() => {
      throw new Error('test error')
    })

    jest.spyOn(controller.logger, 'error').mockImplementation(() => {
      throw new Error('test error')
    })
    expect(() => controller.getHandler()).toThrow()
  })

  it('should output error on postHandler', () => {
    jest.spyOn(controller, 'handlePost').mockImplementation(() => {
      throw new Error('test error')
    })

    jest.spyOn(controller.logger, 'error').mockImplementation(() => {
      throw new Error('test error')
    })
    expect(() => controller.postHandler()).toThrow()
  })

  it('should send metric on getHandler', () => {
    jest.spyOn(controller, 'sendMetric')
    jest.spyOn(controller, 'handleGet').mockImplementation(() => {
      return 'get success'
    })
    const metricSpy = jest.spyOn(controller.metrics, 'putMetric')
    controller.getHandler()
    expect(controller.sendMetric).toHaveBeenCalledWith('get', 'response')
    expect(metricSpy).toHaveBeenCalledTimes(1)
  })

  it('should send metric on postHandler', () => {
    jest.spyOn(controller, 'sendMetric')
    jest.spyOn(controller, 'handlePost').mockImplementation(() => {
      return 'get success'
    })
    const metricSpy = jest.spyOn(controller.metrics, 'putMetric')
    controller.postHandler()
    expect(controller.sendMetric).toHaveBeenCalledWith('post', 'response')
    expect(metricSpy).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.clearAllMocks()
    config.set('isProduction', false)
  })
})
