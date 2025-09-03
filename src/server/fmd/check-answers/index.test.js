import { fmdConfirmationPage } from '../submit/confirmation/index.js'
import { fmdSubmitSummaryPage } from './index.js'

describe('FmdSubmitSummaryPage', () => {
  it('should have the correct next page', () => {
    expect(fmdSubmitSummaryPage.nextPage()).toBe(fmdConfirmationPage)
  })

  it('should have the correct namespace', () => {
    expect(fmdSubmitSummaryPage.namespace).toBe('fmd')
  })
})
