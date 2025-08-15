import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, disinfectantPage } from './index.js'
import { DisinfectantDilutionPage } from '../disinfectant-dilution/index.js'
import { AutocompleteAnswer } from '~/src/server/common/model/answer/autocomplete/autocomplete.js'
import Wreck from '@hapi/wreck'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'

const sectionKey = 'biosecurity'
const questionKey = 'disinfectant'
const pageUrl = '/biosecurity/disinfectant'
const page = disinfectantPage
const question = 'What disinfectant are you using?'

const payload = {
  [questionKey]: 'Virkon'
}

jest.mock('ioredis', () => ({
  ...jest.requireActual('ioredis'),
  Cluster: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    get: jest.fn(),
    setex: jest.fn()
  })),
  Redis: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    get: jest.fn(),
    setex: jest.fn()
  }))
}))

describe('Answer', () => {
  let wreckMock

  beforeEach(() => {
    wreckMock = jest.spyOn(Wreck, 'get')
  })

  afterAll(jest.resetAllMocks)

  it('should be a Text input', () => {
    expect(new Answer(payload)).toBeInstanceOf(AutocompleteAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have validation config', () => {
    expect(Answer.config.validation).toBeDefined()
    expect(typeof Answer.config.validation).toBe('object')
  })

  it('should have isPageHeading set to false', () => {
    expect(Answer.config.isPageHeading).toBe(false)
  })

  it('should have items array with disinfectant options', async () => {
    const items = await Answer.config.items()
    expect(items).toBeDefined()
    expect(Array.isArray(items)).toBe(true)
    expect(items.length).toBeGreaterThan(0)
  })

  it('should have correctly formatted items with text and value properties', async () => {
    const items = await Answer.config.items()

    items.forEach((item) => {
      expect(item).toHaveProperty('text')
      expect(item).toHaveProperty('value')
      expect(typeof item.text).toBe('string')
      expect(typeof item.value).toBe('string')
      expect(item.text).toBe(item.value) // text and value should be the same for this autocomplete
    })
  })

  it('should include expected disinfectant options', async () => {
    wreckMock.mockResolvedValue(
      /** @type {any} */ ({
        payload: JSON.stringify({
          filteredDisinfectants: [
            {
              Disinfectant_name: 'Virkon® LSP',
              Approved_dilution_rate: '9 * '
            },
            {
              Disinfectant_name: 'Agrichlor',
              Approved_dilution_rate: '10 * '
            },
            {
              Disinfectant_name: 'Biocid 30',
              Approved_dilution_rate: '8 * '
            }
          ]
        }),
        res: { statusCode: statusCodes.ok }
      })
    )

    const items = await Answer.config.items()

    const itemValues = items.map((item) => item.value)
    expect(itemValues).toContain('Virkon® LSP')
    expect(itemValues).toContain('Agrichlor')
    expect(itemValues).toContain('Biocid 30')
  })
})

describe('DisinfectantPage', () => {
  let wreckMock

  beforeEach(() => {
    wreckMock = jest.spyOn(Wreck, 'get')
    wreckMock.mockResolvedValue(
      /** @type {any} */ ({
        payload: JSON.stringify({
          filteredDisinfectants: [
            {
              Disinfectant_name: 'Virkon® LSP',
              Approved_dilution_rate: '9 * '
            },
            {
              Disinfectant_name: 'Agrichlor',
              Approved_dilution_rate: '10 * '
            },
            {
              Disinfectant_name: 'Biocid 30',
              Approved_dilution_rate: '8 * '
            }
          ]
        }),
        res: { statusCode: statusCodes.ok }
      })
    )
  })

  afterAll(jest.resetAllMocks)

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(Answer)
  })

  describe('nextPage', () => {
    it('should return DisinfectantDilutionPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(DisinfectantDilutionPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
