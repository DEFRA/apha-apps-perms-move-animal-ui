import { exoticsConfirmationPage } from '../submit/confirmation/index.js'
import { exoticsSubmitSummaryPage } from './index.js'

describe('ExoticsSubmitSummaryPage', () => {
  it('should have the correct next page', () => {
    expect(exoticsSubmitSummaryPage.nextPage()).toBe(exoticsConfirmationPage)
  })

  it('should have the correct namespace', () => {
    expect(exoticsSubmitSummaryPage.namespace).toBe('exotics')
  })
})
