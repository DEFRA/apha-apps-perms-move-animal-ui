import { createServer } from '~/src/server/index.js'
import { submitSummaryPage } from './index.js'

describe('#checkAnswers', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  it('should return the correct urlPath for SubmitSummaryPage', () => {
    expect(submitSummaryPage.urlPath).toBe('/submit/check-answers')
  })

  it('should return the correct view for SubmitSummaryPage', () => {
    expect(submitSummaryPage.view).toBe('check-answers/index')
  })

  it('should return the correct nextPage for SubmitSummaryPage', () => {
    const nextPage = submitSummaryPage.nextPage()
    expect(nextPage.urlPath).toBe('/submit/confirmation')
  })
})
