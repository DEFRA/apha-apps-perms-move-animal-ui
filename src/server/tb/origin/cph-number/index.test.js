import { cphNumberPage, CphNumberPage } from './index.js'
import { CphNumberAnswer } from '../../../common/model/answer/cph-number/cph-number.js'
import { originAddressPage } from '../address/index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { createServer } from '~/src/server/index.js'
import { config } from '~/src/config/config.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { spyOnConfig } from '~/src/server/common/test-helpers/config.js'
import SessionTester from '~/src/server/common/test-helpers/session-helper.js'

/** @import { Server } from '@hapi/hapi' */

const mockFindMatchingCphs = jest.fn()

jest.mock('~/src/server/common/apis/integration-bridge/index.js', () => ({
  findMatchingCphs: (...args) => mockFindMatchingCphs(...args)
}))

const sectionKey = 'origin'
const question =
  'What is the county parish holding (CPH) number of your farm or premises where the animals are moving off?'
const questionKey = 'cphNumber'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/origin/cph-number'

describe('CphNumberPage', () => {
  let page

  beforeEach(() => {
    page = new CphNumberPage()
  })

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(CphNumberAnswer)
  })

  it('nextPage should return address page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(originAddressPage)
  })

  it('should export page', () => {
    expect(cphNumberPage).toBeInstanceOf(CphNumberPage)
  })

  describePageSnapshot({
    describes: 'cphNumberPage.content',
    it: 'should render expected response and content',
    pageUrl
  })

  describe('matching the CPH with SAM on continue', () => {
    /** @type {Server} */
    let server
    /** @type {SessionTester} */
    let session

    const cph = '12/345/6789'
    const unmatchedCphError =
      'The CPH number you entered cannot be found. Check the number and try again'

    /** @param {string} value */
    const postCph = (value) =>
      server.inject(
        withCsrfProtection(
          { method: 'POST', url: pageUrl, payload: { [questionKey]: value } },
          { Cookie: session.sessionID }
        )
      )

    const getPage = () =>
      server.inject(
        withCsrfProtection(
          { method: 'GET', url: pageUrl },
          { Cookie: session.sessionID }
        )
      )

    beforeAll(async () => {
      server = await createServer()
      await server.initialize()
    })

    beforeEach(async () => {
      session = await SessionTester.create(server)
    })

    afterEach(() => {
      jest.restoreAllMocks()
      mockFindMatchingCphs.mockReset()
    })

    afterAll(async () => {
      await server.stop({ timeout: 0 })
    })

    it('should let the user progress when SAM matches the CPH', async () => {
      mockFindMatchingCphs.mockResolvedValue(new Set([cph]))

      const { statusCode, headers } = await postCph(cph)

      expect(mockFindMatchingCphs).toHaveBeenCalledWith([cph])
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(originAddressPage.urlPath)
      expect((await session.getSectionState(sectionKey))[questionKey]).toBe(cph)
    })

    it('should block the user and show an error when SAM does not match the CPH', async () => {
      const otherHolding = '98/765/4321'
      mockFindMatchingCphs.mockResolvedValue(new Set([otherHolding]))

      const { statusCode, headers } = await postCph(cph)

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(pageUrl)
      expect(
        (await session.getSectionState(sectionKey))?.[questionKey]
      ).toBeUndefined()

      const { payload } = await getPage()

      expect(payload).toContain('There is a problem')
      expect(payload).toContain(unmatchedCphError)
      expect(payload).not.toContain(otherHolding)
    })

    it('should retry once and then let the user progress when SAM is unavailable', async () => {
      mockFindMatchingCphs.mockRejectedValue(new Error('SAM is down'))

      const { statusCode, headers } = await postCph(cph)

      expect(mockFindMatchingCphs).toHaveBeenCalledTimes(2)
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(originAddressPage.urlPath)
      expect((await session.getSectionState(sectionKey))[questionKey]).toBe(cph)
    })

    it('should not match the CPH with SAM when CPH validation is turned off', async () => {
      spyOnConfig('featureFlags', {
        ...config.get('featureFlags'),
        cphValidation: false
      })

      const { statusCode, headers } = await postCph(cph)

      expect(mockFindMatchingCphs).not.toHaveBeenCalled()
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(originAddressPage.urlPath)
    })

    it('should not match the CPH with SAM when it is not well formed', async () => {
      await postCph('12345')

      expect(mockFindMatchingCphs).not.toHaveBeenCalled()
    })
  })
})
