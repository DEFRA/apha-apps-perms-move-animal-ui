import { EarTagsAnswer } from '../../../common/model/answer/ear-tags/ear-tags.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { identificationSummaryPage } from '../summary/index.js'
import { earTagsPage, EarTagsPage } from './index.js'
import { createServer } from '~/src/server/index.js'
import { parseDocument } from '../../../common/test-helpers/dom.js'
import { statusCodes } from '../../../common/constants/status-codes.js'

const sectionKey = 'identification'
const question = 'Enter the ear tag numbers'
const questionKey = 'earTags'
const view = 'tb/identification/ear-tags/index'
const pageUrl = '/identification/enter-ear-tags'
const customHeading = 'Official ear tag numbers for animals being moved'

describe('EarTagsPage', () => {
  const page = new EarTagsPage()

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
    expect(page.questionI18nKey).toBe('tb.identification.earTags.question')
  })

  it('should have the correct heading', () => {
    expect(page.heading).toBe(customHeading)
  })

  it('should have the correct title', () => {
    expect(page.title).toBe(question)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(EarTagsAnswer)
  })

  it('nextPage should return identification summary page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(identificationSummaryPage)
  })

  it('should export page', () => {
    expect(earTagsPage).toBeInstanceOf(EarTagsPage)
  })

  it('should render the hint in Welsh', async () => {
    const server = await createServer()
    try {
      await server.initialize()
      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: `${pageUrl}?lang=cy`
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(
        parseDocument(payload).querySelector('#earTags-hint')?.textContent
      ).toContain('Mae angen i chi nodi pob rhif clust-dag ar linell ar wahân')
    } finally {
      await server.stop({ timeout: 0 })
    }
  })

  describePageSnapshot({
    describes: 'EarTagsPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
