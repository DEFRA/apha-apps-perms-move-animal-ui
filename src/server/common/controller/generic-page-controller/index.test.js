import { Page } from '../../model/page/page-model.js'
import GenericPageController from './index.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'

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

describe('#GenericPageController', () => {
  let controller

  beforeEach(() => {
    const page = new TestPage()
    controller = new TestGenericController(page)

    jest.resetAllMocks()
  })

  it('should throw not implemented error', () => {
    const defaultController = new GenericPageController(new Page())
    expect(() => defaultController.handleGet()).toThrow(NotImplementedError)
    expect(() => defaultController.handlePost()).toThrow(NotImplementedError)
  })

  it('should output error on getHandler', () => {
    jest.spyOn(controller, 'handleGet').mockImplementation(() => {
      throw new Error('test error')
    })

    expect(() => controller.getHandler()).toThrow()
  })

  it('should output error on postHandler', () => {
    jest.spyOn(controller, 'handlePost').mockImplementation(() => {
      throw new Error('test error')
    })

    expect(() => controller.postHandler()).toThrow()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
