const mockCacheService = { getState: jest.fn() }
var mockFormsService
var mockPluginOptions

jest.mock(
  '@defra/forms-engine-plugin/engine/helpers.js',
  () => jest.requireActual('../../../../.jest/mocks/forms-engine-plugin.js')
)
jest.mock(
  '@defra/forms-engine-plugin/engine/components/helpers/components.js',
  () => jest.requireActual('../../../../.jest/mocks/forms-engine-plugin.js')
)
jest.mock(
  '@defra/forms-engine-plugin/engine/models/index.js',
  () => jest.requireActual('../../../../.jest/mocks/forms-engine-plugin.js')
)
jest.mock(
  '@defra/forms-engine-plugin/controllers/index.js',
  () => jest.requireActual('../../../../.jest/mocks/forms-engine-plugin.js')
)

jest.mock('~/src/server/common/plugins/defra-forms/index.js', () => {
  mockFormsService = {
    getFormMetadata: jest.fn(),
    getFormDefinition: jest.fn()
  }
  mockPluginOptions = {
    services: {
      formsService: mockFormsService
    },
    controllers: {
      SectionSummaryPageController: Symbol('SectionSummaryPageController')
    }
  }

  return {
    __esModule: true,
    pluginOptions: mockPluginOptions
  }
})
const { pluginOptions: loadedPluginOptions } = jest.requireMock(
  '~/src/server/common/plugins/defra-forms/index.js'
)
mockPluginOptions = loadedPluginOptions
const {
  getCacheService: mockGetCacheService,
  evaluateTemplate: mockEvaluateTemplate,
  getAnswer: mockGetAnswer,
  FormModel: mockFormModel,
  TerminalPageController: mockTerminalPageController
} = jest.requireMock('@defra/forms-engine-plugin/engine/helpers.js')

import {
  getFormContext,
  getFirstJourneyPage,
  getFormModel,
  mapFormContextToAnswers
} from '~/src/server/common/helpers/get-form-context.js'

describe('getFormContext helper', () => {
  const request = { yar: { set: jest.fn() }, server: { app: {} } }
  const journey = 'tb-origin'
  const cachedState = { answered: true }
  const returnedContext = { errors: [] }
  const metadata = {
    id: 'metadata-123',
    versions: [{ versionNumber: 9 }]
  }
  const definition = { pages: [] }
  let formModel

  beforeEach(() => {
    jest.clearAllMocks()
    mockEvaluateTemplate.mockImplementation((template) => template)
    mockGetAnswer.mockReturnValue('formatted answer')
    formModel = { getFormContext: jest.fn().mockResolvedValue(returnedContext) }
    mockFormModel.mockImplementation(() => formModel)
    mockFormsService.getFormMetadata.mockResolvedValue(metadata)
    mockFormsService.getFormDefinition.mockResolvedValue(definition)
    mockGetCacheService.mockReturnValue(mockCacheService)
    mockCacheService.getState.mockResolvedValue(cachedState)
  })

  test('builds a form context using cached state and configured services', async () => {
    const context = await getFormContext(request, journey)

    expect(mockFormsService.getFormMetadata).toHaveBeenCalledWith(journey)
    expect(mockFormsService.getFormDefinition).toHaveBeenCalledWith(
      metadata.id,
      'live'
    )

    expect(mockFormModel).toHaveBeenCalledWith(
      definition,
      { basePath: journey, versionNumber: metadata.versions[0].versionNumber },
      mockPluginOptions.services,
      mockPluginOptions.controllers
    )

    expect(mockGetCacheService).toHaveBeenCalledWith(request.server)
    expect(mockCacheService.getState).toHaveBeenCalledTimes(1)

    const summaryRequest = mockCacheService.getState.mock.calls[0][0]

    expect(summaryRequest).toEqual({
      yar: request.yar,
      method: 'get',
      params: { path: 'summary', slug: journey },
      query: {}
    })

    expect(formModel.getFormContext).toHaveBeenCalledWith(
      summaryRequest,
      { $$__referenceNumber: 'TODO', ...cachedState },
      []
    )

    expect(context).toBe(returnedContext)
  })

  test('passes through the requested journey state when resolving the form model', async () => {
    await getFormContext(request, journey, 'draft')

    expect(mockFormsService.getFormDefinition).toHaveBeenCalledWith(
      metadata.id,
      'draft'
    )
  })
})

describe('mapFormContextToAnswers helper', () => {
  const buildPage = (fields, path = '/page-path', withHref = true) => {
    const page = {
      path,
      collection: { fields }
    }

    if (withHref) {
      page.getHref = jest.fn((target) => `/journey${target}`)
    }

    return page
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockEvaluateTemplate.mockImplementation((template) => `rendered:${template}`)
    mockGetAnswer.mockReturnValue('display text')
  })

  test('returns an empty array when no context is provided', () => {
    expect(mapFormContextToAnswers()).toEqual([])
  })

  test('omits unanswered components', () => {
    const emptyField = {
      name: 'empty',
      title: 'Empty question',
      type: 'TextField',
      getFormValueFromState: jest.fn().mockReturnValue('   ')
    }
    const answeredField = {
      name: 'filled',
      title: 'Filled question',
      type: 'TextField',
      getFormValueFromState: jest.fn().mockReturnValue('value')
    }

    const context = {
      relevantPages: [buildPage([emptyField, answeredField])],
      state: { some: 'state' }
    }

    expect(mapFormContextToAnswers(context)).toEqual([
      {
        slug: '/journey/page-path',
        changeHref: '/journey/page-path?returnUrl=%2Fjourney%2Fsummary',
        question: 'rendered:Filled question',
        questionKey: 'filled',
        answer: {
          type: 'text',
          value: 'value',
          displayText: 'display text'
        }
      }
    ])
  })

  test('maps known component types to the expected answer shape', () => {
    const addressValue = {
      addressLine1: '10 Downing Street',
      addressLine2: 'Apartment 1',
      town: 'London',
      county: 'Greater London',
      postcode: 'SW1A 2AA'
    }

    const field = {
      name: 'addressField',
      title: 'Address question',
      type: 'UkAddressField',
      getFormValueFromState: jest.fn().mockReturnValue(addressValue)
    }

    const context = {
      relevantPages: [buildPage([field], '/address')],
      state: { addressField__addressLine1: '10 Downing Street' }
    }

    mockGetAnswer.mockReturnValue('10 Downing Street<br />London<br />SW1A 2AA')

    expect(mapFormContextToAnswers(context)).toEqual([
      {
        slug: '/journey/address',
        changeHref: '/journey/address?returnUrl=%2Fjourney%2Fsummary',
        question: 'rendered:Address question',
        questionKey: 'addressField',
        answer: {
          type: 'address',
          value: {
            addressLine1: '10 Downing Street',
            addressLine2: 'Apartment 1',
            addressTown: 'London',
            addressCounty: 'Greater London',
            addressPostcode: 'SW1A 2AA'
          },
          displayText: '10 Downing Street<br />London<br />SW1A 2AA'
        }
      }
    ])
  })

  test('falls back to the raw template when evaluation fails', () => {
    mockEvaluateTemplate.mockImplementation(() => {
      throw new Error('boom')
    })

    const field = {
      name: 'failingQuestion',
      title: 'Question with template',
      type: 'TextField',
      getFormValueFromState: jest.fn().mockReturnValue('Some value')
    }

    const context = {
      relevantPages: [buildPage([field])],
      state: {}
    }

    expect(mapFormContextToAnswers(context)).toEqual([
      {
        slug: '/journey/page-path',
        changeHref: '/journey/page-path?returnUrl=%2Fjourney%2Fsummary',
        question: 'Question with template',
        questionKey: 'failingQuestion',
        answer: {
          type: 'text',
          value: 'Some value',
          displayText: 'display text'
        }
      }
    ])
  })

  test('maps checkbox answers and preserves array values', () => {
    const checkboxValue = ['option-a', 'option-b']

    const field = {
      name: 'reasons',
      title: 'Why are you moving animals?',
      type: 'CheckboxesField',
      getFormValueFromState: jest.fn().mockReturnValue(checkboxValue)
    }

    mockGetAnswer.mockReturnValue('Reason A<br />Reason B')

    const context = {
      relevantPages: [buildPage([field], '/checkbox')],
      state: { reasons: checkboxValue }
    }

    expect(mapFormContextToAnswers(context)).toEqual([
      {
        slug: '/journey/checkbox',
        changeHref: '/journey/checkbox?returnUrl=%2Fjourney%2Fsummary',
        question: 'rendered:Why are you moving animals?',
        questionKey: 'reasons',
        answer: {
          type: 'checkbox',
          value: checkboxValue,
          displayText: 'Reason A<br />Reason B'
        }
      }
    ])
  })

  test('skips object answers when every nested value is empty', () => {
    const emptyAddress = {
      addressLine1: '   ',
      addressLine2: '',
      addressTown: '\n',
      addressCounty: undefined,
      addressPostcode: ''
    }

    const field = {
      name: 'originAddress',
      title: 'Origin address',
      type: 'UkAddressField',
      getFormValueFromState: jest.fn().mockReturnValue(emptyAddress)
    }

    const context = {
      relevantPages: [buildPage([field])],
      state: {}
    }

    expect(mapFormContextToAnswers(context)).toEqual([])
  })

  test('maps file upload answers and marks them as file type', () => {
    const files = [
      {
        filename: 'movement-plan.pdf',
        status: { form: { file: { filename: 'movement-plan.pdf' } } }
      }
    ]

    const field = {
      name: 'biosecurityPlan',
      title: 'Upload your biosecurity plan',
      type: 'FileUploadField',
      getFormValueFromState: jest.fn().mockReturnValue(files)
    }

    mockGetAnswer.mockReturnValue('movement-plan.pdf')

    const context = {
      relevantPages: [buildPage([field], '/files')],
      state: { biosecurityPlan: files }
    }

    expect(mapFormContextToAnswers(context)).toEqual([
      {
        slug: '/journey/files',
        changeHref: '/journey/files?returnUrl=%2Fjourney%2Fsummary',
        question: 'rendered:Upload your biosecurity plan',
        questionKey: 'biosecurityPlan',
        answer: {
          type: 'file',
          value: files,
          displayText: 'movement-plan.pdf'
        }
      }
    ])
  })

  test('falls back to page path when getHref is unavailable', () => {
    const field = {
      name: 'noHref',
      title: 'Some question',
      type: 'TextField',
      getFormValueFromState: jest.fn().mockReturnValue('value')
    }

    const context = {
      relevantPages: [buildPage([field], '/no-href', false)],
      state: {}
    }

    expect(mapFormContextToAnswers(context)).toEqual([
      {
        slug: '/no-href',
        changeHref: '/no-href',
        question: 'rendered:Some question',
        questionKey: 'noHref',
        answer: {
          type: 'text',
          value: 'value',
          displayText: 'display text'
        }
      }
    ])
  })

  test('allows overriding the return path used for change links', () => {
    const field = {
      name: 'customReturn',
      title: 'Some question',
      type: 'TextField',
      getFormValueFromState: jest.fn().mockReturnValue('value')
    }

    const context = {
      relevantPages: [buildPage([field], '/custom-path')],
      state: {}
    }

    expect(
      mapFormContextToAnswers(context, { returnPath: '/custom-summary' })
    ).toEqual([
      {
        slug: '/journey/custom-path',
        changeHref:
          '/journey/custom-path?returnUrl=%2Fjourney%2Fcustom-summary',
        question: 'rendered:Some question',
        questionKey: 'customReturn',
        answer: {
          type: 'text',
          value: 'value',
          displayText: 'display text'
        }
      }
    ])
  })
})

describe('getFormModel helper', () => {
  const slug = 'tb-origin'
  const state = 'preview'
  const controllers = { CustomController: Symbol('CustomController') }
  const metadata = {
    id: 'form-meta-123',
    versions: [{ versionNumber: 17 }]
  }
  const definition = { pages: [{ path: '/start' }] }
  let formsService
  let services
  let formModelInstance

  beforeEach(() => {
    jest.clearAllMocks()
    formModelInstance = { id: 'form-model-instance' }
    mockFormModel.mockImplementation(() => formModelInstance)
    formsService = {
      getFormMetadata: jest.fn().mockResolvedValue(metadata),
      getFormDefinition: jest.fn().mockResolvedValue(definition)
    }
    services = { formsService, anotherService: Symbol('another-service') }
  })

  test('constructs a FormModel using fetched metadata and definition', async () => {
    const model = await getFormModel(slug, state, { services, controllers })

    expect(formsService.getFormMetadata).toHaveBeenCalledWith(slug)
    expect(formsService.getFormDefinition).toHaveBeenCalledWith(
      metadata.id,
      state
    )
    expect(mockFormModel).toHaveBeenCalledWith(
      definition,
      { basePath: slug, versionNumber: metadata.versions[0].versionNumber },
      services,
      controllers
    )
    expect(model).toBe(formModelInstance)
  })

  test('throws when no form metadata is available', async () => {
    formsService.getFormMetadata.mockResolvedValue(undefined)

    await expect(
      getFormModel(slug, state, { services, controllers })
    ).rejects.toThrow(`No metadata found for slug ${slug}`)

    expect(formsService.getFormDefinition).not.toHaveBeenCalled()
    expect(mockFormModel).not.toHaveBeenCalled()
  })

  test('throws when no form definition is available', async () => {
    formsService.getFormDefinition.mockResolvedValue(undefined)

    await expect(
      getFormModel(slug, state, { services, controllers })
    ).rejects.toThrow(
      `No definition found for form metadata ${metadata.id} (${slug}) ${state}`
    )

    expect(mockFormModel).not.toHaveBeenCalled()
  })
})

describe('getFirstJourneyPage helper', () => {
  const buildPage = (path, keys = []) => ({ path, keys })

  test('returns undefined when no context or relevant target path is available', () => {
    expect(getFirstJourneyPage()).toBeUndefined()
    expect(
      getFirstJourneyPage({
        paths: [],
        pageMap: new Map(),
        relevantPages: []
      })
    ).toBeUndefined()
  })

  test('returns the page matching the last recorded path', () => {
    const startPage = buildPage('/start')
    const nextPage = buildPage('/animals')

    const context = {
      paths: ['/start', '/animals'],
      pageMap: new Map([
        ['/start', startPage],
        ['/animals', nextPage]
      ]),
      relevantPages: [startPage, nextPage]
    }

    expect(getFirstJourneyPage(context)).toBe(nextPage)
  })

  test('prioritises the first relevant page that contains an errored answer key', () => {
    const animalsPage = buildPage('/animals', ['animal-count'])
    const speciesPage = buildPage('/species', ['species-name'])

    const context = {
      errors: [{ name: 'species-name' }],
      paths: ['/start', '/animals'],
      pageMap: new Map([
        ['/animals', animalsPage],
        ['/species', speciesPage]
      ]),
      relevantPages: [animalsPage, speciesPage]
    }

    expect(getFirstJourneyPage(context)).toBe(speciesPage)
  })

  test('considers array based error path segments when matching pages', () => {
    const visitPage = buildPage('/visit', ['bio-1'])
    const checkPage = buildPage('/check', ['bio-2'])

    const context = {
      errors: [{ path: ['bio-2', 'answer'] }],
      paths: ['/visit'],
      relevantPages: [visitPage, checkPage]
    }

    expect(getFirstJourneyPage(context)).toBe(checkPage)
  })

  test('falls back to the first relevant page when no paths have been recorded', () => {
    const startPage = buildPage('/start')

    const context = {
      paths: [],
      pageMap: new Map(),
      relevantPages: [startPage]
    }

    expect(getFirstJourneyPage(context)).toBe(startPage)
  })

  test('falls back to relevant pages when the page map does not contain the path', () => {
    const nextPage = buildPage('/animals')

    const context = {
      paths: ['/animals'],
      pageMap: new Map(),
      relevantPages: [nextPage]
    }

    expect(getFirstJourneyPage(context)).toBe(nextPage)
  })

  test('steps back from terminal pages to the previous relevant page', () => {
    const startPage = buildPage('/start')
    const exitPage = new mockTerminalPageController()
    exitPage.path = '/stop'

    const context = {
      paths: ['/start', '/stop'],
      pageMap: new Map([
        ['/start', startPage],
        ['/stop', exitPage]
      ]),
      relevantPages: [startPage, exitPage]
    }

    expect(getFirstJourneyPage(context)).toBe(startPage)
  })

  test('returns the terminal page when it is the only relevant page available', () => {
    const exitPage = new mockTerminalPageController()
    exitPage.path = '/stop'

    const context = {
      paths: ['/stop'],
      pageMap: new Map([['/stop', exitPage]]),
      relevantPages: [exitPage]
    }

    expect(getFirstJourneyPage(context)).toBe(exitPage)
  })
})

/**
 * @import { Request } from '@hapi/hapi'
 */
