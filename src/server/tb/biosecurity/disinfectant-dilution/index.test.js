import { config } from '~/src/config/config.js'
import { createServer } from '~/src/server/index.js'
import { DilutionRateAnswer } from '../../../common/model/answer/dilution-rate/dilution-rate.js'
import { spyOnConfig } from '../../../common/test-helpers/config.js'
import { withCsrfProtection } from '../../../common/test-helpers/csrf.js'
import { parseDocument } from '../../../common/test-helpers/dom.js'
import SessionTester from '../../../common/test-helpers/session-helper.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { equipmentAnySharedPage } from '../equipment-any-shared/index.js'
import { disinfectantPage } from '../disinfectant/index.js'
import { disinfectantDilutionPage, DisinfectantDilutionPage } from './index.js'

const sectionKey = 'biosecurity'
const question = 'Confirmation of the dilution rate'
const questionKey = 'dilutionRate'
const view = 'tb/biosecurity/disinfectant-dilution/index'
const pageUrl = '/biosecurity/disinfectant-dilution'

jest.mock('~/src/server/common/apis/index.js', () => ({
  fetchDisinfectants: jest.fn().mockResolvedValue([
    {
      name: 'Agrichlor',
      dilutionRate: '10',
      isLiquid: true,
      isUndiluted: false
    },
    {
      name: 'Interkokask',
      dilutionRate: '150',
      isLiquid: false,
      isUndiluted: false
    },
    {
      name: 'Undiluted Mock',
      dilutionRate: '0',
      isLiquid: false,
      isUndiluted: true
    },
    {
      name: 'Farm & <em>Co</em>',
      dilutionRate: '10',
      isLiquid: true,
      isUndiluted: false
    }
  ])
}))

describe('DisinfectantDilutionPage', () => {
  const page = new DisinfectantDilutionPage()

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

  it('should have the correct questionI18nKey', () => {
    expect(page.questionI18nKey).toBe('tb.biosecurity.dilutionRate.question')
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(DilutionRateAnswer)
  })

  it('nextPage should return equipment any shared page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(equipmentAnySharedPage)
  })

  it('should export page', () => {
    expect(disinfectantDilutionPage).toBeInstanceOf(DisinfectantDilutionPage)
  })

  describe('viewProps', () => {
    const request = {
      yar: {
        get: jest.fn()
      }
    }
    const stateSpy = jest.spyOn(request.yar, 'get')

    it('should return viewProps with disinfectant url when no disinfectant previously selected', async () => {
      expect(await page.viewProps(request)).toEqual({
        disinfectantUrl: disinfectantPage.urlPath
      })
    })

    describe('placeholder rendering', () => {
      /** @type {import('@hapi/hapi').Server} */
      let server
      /** @type {SessionTester} */
      let session

      beforeAll(async () => {
        server = await createServer()
        await server.initialize()
      })

      beforeEach(async () => {
        session = await SessionTester.create(server)
        await session.setSectionState('biosecurity', {
          disinfectant: 'Farm & <em>Co</em>'
        })
      })

      afterAll(async () => {
        await server.stop({ timeout: 0 })
      })

      it.each([
        ['en', 'The approved dilution rate for Farm & <em>Co</em> is 1:10.'],
        [
          'cy',
          'Y gyfradd gwanhau gymeradwy ar gyfer Farm & <em>Co</em> yw 1:10.'
        ]
      ])(
        'renders and escapes the disinfectant in %s',
        async (locale, expected) => {
          const { payload } = await server.inject(
            withCsrfProtection(
              { method: 'GET', url: `${pageUrl}?lang=${locale}` },
              { Cookie: session.sessionID }
            )
          )
          const paragraphs = [...parseDocument(payload).querySelectorAll('p')]
          const approved = paragraphs.find((paragraph) =>
            paragraph.textContent?.includes('Farm & <em>Co</em>')
          )

          expect(approved?.textContent?.trim()).toBe(expected)
          expect(approved?.querySelector('em')).toBeNull()
          const explanation = paragraphs.find((paragraph) =>
            ['10 litres', '10 litrau'].some((unit) =>
              paragraph.textContent?.includes(unit)
            )
          )
          expect(explanation?.textContent).toContain('Farm & <em>Co</em>')
          expect(explanation?.querySelector('em')).toBeNull()
        }
      )

      it('uses the English fallback when translations are disabled', async () => {
        spyOnConfig('featureFlags', {
          ...config.get('featureFlags'),
          translationEnabled: false
        })
        const fallbackServer = await createServer()

        try {
          await fallbackServer.initialize()
          const fallbackSession = await SessionTester.create(fallbackServer)
          await fallbackSession.setSectionState('biosecurity', {
            disinfectant: 'Agrichlor'
          })
          const { payload } = await fallbackServer.inject(
            withCsrfProtection(
              { method: 'GET', url: pageUrl },
              { Cookie: fallbackSession.sessionID }
            )
          )
          const text =
            parseDocument(payload).querySelector('#main-content')?.textContent

          expect(text).toContain(
            'The approved dilution rate for Agrichlor is 1:10.'
          )
          expect(text).toContain(
            'This means for every 1 litre of Agrichlor, you are using 10 litres of water.'
          )
          expect(text).toContain(
            'I confirm a dilution rate of 1:10 is used on the farm or premises'
          )
        } finally {
          await fallbackServer.stop({ timeout: 0 })
          jest.restoreAllMocks()
        }
      })
    })

    it('should return viewProps with disinfectant url when disinfectant cannot be found', async () => {
      stateSpy.mockReturnValueOnce({
        application: {
          biosecurity: {
            disinfectant: 'Unknown Disinfectant'
          }
        }
      })
      expect(await page.viewProps(request)).toEqual({
        disinfectantUrl: disinfectantPage.urlPath
      })
    })
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content',
    it: 'should render expected response and content when liquid disinfectant previously selected',
    pageUrl,
    state: {
      application: {
        biosecurity: {
          disinfectant: 'Agrichlor'
        }
      }
    }
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content',
    it: 'should render expected response and content when non liquid disinfectant previously selected',
    pageUrl,
    state: {
      application: {
        biosecurity: {
          disinfectant: 'Interkokask'
        }
      }
    }
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content',
    it: 'should render expected response and content when undiluted disinfectant previously selected',
    pageUrl,
    state: {
      application: {
        biosecurity: {
          disinfectant: 'Undiluted Mock'
        }
      }
    }
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content',
    it: 'should render expected response when disinfectant NOT previously selected',
    pageUrl
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content',
    it: 'should render expected response when disinfectant selected cant be found',
    pageUrl,
    state: {
      application: {
        biosecurity: {
          disinfectant: 'FAM 30'
        }
      }
    }
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content.welsh',
    it: 'should render Welsh content when a liquid disinfectant was selected',
    pageUrl: `${pageUrl}?lang=cy`,
    state: {
      application: { biosecurity: { disinfectant: 'Agrichlor' } }
    }
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content.welsh',
    it: 'should render Welsh content when a non-liquid disinfectant was selected',
    pageUrl: `${pageUrl}?lang=cy`,
    state: {
      application: { biosecurity: { disinfectant: 'Interkokask' } }
    }
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content.welsh',
    it: 'should render Welsh content when an undiluted disinfectant was selected',
    pageUrl: `${pageUrl}?lang=cy`,
    state: {
      application: { biosecurity: { disinfectant: 'Undiluted Mock' } }
    }
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content.welsh',
    it: 'should render Welsh content when no disinfectant was selected',
    pageUrl: `${pageUrl}?lang=cy`
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content.welsh',
    it: 'should render Welsh content when the selected disinfectant cannot be found',
    pageUrl: `${pageUrl}?lang=cy`,
    state: {
      application: { biosecurity: { disinfectant: 'FAM 30' } }
    }
  })
})
