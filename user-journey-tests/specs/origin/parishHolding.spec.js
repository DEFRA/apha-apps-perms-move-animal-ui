import { browser } from '@wdio/globals'

import { loadPageAndVerifyTitle } from '../../helpers/page.js'
import ParishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'

describe('Paris holding page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      ParishHoldingNumberPage.pagePath,
      ParishHoldingNumberPage.pageTitle
    )
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '',
      ParishHoldingNumberPage.noInputError
    )
  })

  it('Should verify that page errors when not enough is entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12/345/678',
      ParishHoldingNumberPage.invalidFormatError
    )
  })

  it('Should verify that page errors when too much is entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12/345/67891',
      ParishHoldingNumberPage.invalidFormatError
    )
  })

  it('Should verify that page errors when letters are entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      'te/tes/test',
      ParishHoldingNumberPage.invalidFormatError
    )
  })

  it('Should verify that input automatically trims whitespace', async () => {
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      ' 12 / 345 / 6789 '
    )
    await expect(
      ParishHoldingNumberPage.cphInputFieldError()
    ).not.toBeDisplayed()
    await ParishHoldingNumberPage.selectBackLink()
    await browser.refresh()
    await expect(ParishHoldingNumberPage.cphNumberInput()).toHaveValue(
      '12/345/6789'
    )
  })

  it('Should verify that page errors when letters and spaces and numbers are included', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12 / tes / 67dh',
      ParishHoldingNumberPage.invalidFormatError
    )
  })

  it('Should input correct number format and continue without producing an error', async () => {
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      '12/345/6789'
    )
    await expect(
      ParishHoldingNumberPage.cphInputFieldError()
    ).not.toBeDisplayed()
    await expect(ParishHoldingNumberPage.errorSummary).not.toBeDisplayed()
  })

  it('Should choose an option and check its maintained', async () => {
    const validInput = '54/321/1234'
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      validInput
    )
    await expect(
      ParishHoldingNumberPage.cphInputFieldError()
    ).not.toBeDisplayed()
    await ParishHoldingNumberPage.selectBackLink()
    await expect(ParishHoldingNumberPage.cphNumberInput()).toHaveValue(
      validInput
    )
  })
})
