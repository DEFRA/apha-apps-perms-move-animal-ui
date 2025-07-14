import { tbConfirmationPage } from '../submit/confirmation/index.js'
import { tbSubmitSummaryPage } from './index.js'

describe('ExoticsSubmitSummaryPage', () => {
  it('should have the correct next page', () => {
    expect(tbSubmitSummaryPage.nextPage()).toBe(tbConfirmationPage)
  })

  it('should have the correct namespace', () => {
    expect(tbConfirmationPage.namespace).toBe('tb')
  })
})
