import { browser } from '@wdio/globals'

export const waitForExpectedRedirectUri = async (pagePath) => {
  const expectedQueryString = `redirect_uri=/${pagePath}`
  await browser.waitUntil(
    async () => {
      const currentUrl = await browser.getUrl()
      const currentQueryString = currentUrl.split('?')[1]

      return expectedQueryString === currentQueryString
    },
    {
      timeoutMessage: `Failed to verify page redirect_uri.  Expected: "${pagePath}", but found ${await browser.getUrl()}`
    }
  )
}

export const waitForPagePath = async (path) => {
  const normalizePath = (path) => path.replace(/^\/+|\/+$/g, '') // Remove leading and trailing slashes

  await browser.waitUntil(
    async () => {
      const currentUrl = await browser.getUrl()
      const currentPath = new URL(currentUrl).pathname
      const normalizedCurrentPath = normalizePath(currentPath)

      const expectedPath = `/${normalizePath(path)}`

      return normalizedCurrentPath === normalizePath(expectedPath)
    },
    {
      timeoutMsg: `Failed to verify page path. Expected: "/${path}", but found: "${await browser.getUrl()}"`
    }
  )
}

export const waitForFullPageUrl = async (url) => {
  await browser.waitUntil(
    async () => {
      const currentUrl = await browser.getUrl()
      return url === currentUrl
    },
    {
      timeoutMsg: `Failed to verify page url. Expected: "${url}", but found: "${await browser.getUrl()}"`
    }
  )
}

export const waitForElement = async (
  element,
  options = { timeout: 10000, visible: true }
) => {
  await element.waitForExist({ timeout: options.timeout })
  if (options.visible) {
    await element.waitForDisplayed({ timeout: options.timeout })
  }
}

export const waitForEnabled = async (
  element,
  options = { timeout: 10000, timeoutMsg: 'Element was not enabled in time' }
) => {
  await browser.waitUntil(async () => await element.isEnabled(), {
    timeout: options.timeout,
    timeoutMsg: options.timeoutMsg
  })
}

export const selectElement = async (element, hidden = false) => {
  try {
    await waitForElement(element, { visible: !hidden })
    await element.isEnabled()
    await element.isClickable()
    await element.click()
  } catch (error) {
    throw new Error(
      `Failed to click element - ${await element.selector}: ${error}`
    )
  }
}

export const verifyPageTitle = async (pageTitle) => {
  const titleMatches = async () => {
    const title = await browser.getTitle()
    return title === pageTitle || title === `Error: ${pageTitle}`
  }

  await browser.waitUntil(titleMatches, {
    timeoutMsg: `Expected page title to be "${pageTitle}" or "Error: ${pageTitle}"\nReceived:\t"${await browser.getTitle()}"`
  })
}

export const loadPageAndVerifyTitle = async (path, pageTitle) => {
  await browser.url(path)
  await verifyPageTitle(pageTitle)
  await expect($('[href="/privacy-policy"]')).toBeDisplayed()
}

export const selectLinkAndVerifyTitle = async (linkElement, pageTitle) => {
  await selectElement(linkElement)
  await verifyPageTitle(pageTitle)
}

export const selectLinkAndVerifyTitleInNewTab = async (
  linkElement,
  pageTitle
) => {
  await selectElement(linkElement)
  await switchToNewTab()
  await verifyPageTitle(pageTitle)
}

export const validateElementVisibleAndText = async (element, text) => {
  try {
    await waitForElement(element, { visible: true })
    await expect(element).toHaveTextContaining(text)
  } catch (error) {
    throw new Error(
      `Failed to validate text for element - ${await element.selector}: ${error}`
    )
  }
}

export const validateHrefOfElement = async (element, href) => {
  const hrefValue = await element.getAttribute('href')
  expect(hrefValue).toContain(href)
}

export const typeIntoElement = async (
  element,
  text,
  isAutocomplete = false
) => {
  try {
    await waitForElement(element)
    await element.setValue(text)
    if (isAutocomplete) {
      await $('[id*="__listbox"] > li:first-child').click()
    }
    await browser.execute((el) => el.blur(), await element)
  } catch (error) {
    throw new Error(
      `Failed type command on element - ${await element.selector}: ${error}`
    )
  }
}

export const clearElement = async (element) => {
  try {
    await waitForElement(element)
    await element.clearValue()
  } catch (error) {
    throw new Error(
      `Failed clear command on element - ${await element.selector}: ${error}`
    )
  }
}

export const checkForSecurityPopUpAndResolve = async () => {
  const contexts = await browser.getContexts()
  if (contexts.length > 1) {
    await browser.switchContext(contexts[0])
    const popUp = await $('[name="Send anyway"]')
    if (await popUp.isExisting()) {
      await popUp.click()
    }
    await browser.switchContext(contexts[1])
  }
}

export const switchToNewTab = async () => {
  await browser.waitUntil(
    async () => (await browser.getWindowHandles()).length > 1,
    {
      timeout: 10000, // Wait up to 10 seconds
      timeoutMsg: 'New tab did not open within the expected time'
    }
  )

  const handles = await browser.getWindowHandles()
  await browser.switchToWindow(handles[1])
}

export const verifyRadioButtonNumber = async (expectedCount) => {
  const radioButtons = await $$('.govuk-radios__input').length
  expect(radioButtons).toBe(expectedCount)
}

export const verifySelectionPersistence = async (
  currentPage,
  nextPage,
  radioButton
) => {
  await currentPage.selectBackLink()
  await waitForPagePath(nextPage.pagePath)

  await browser.refresh()
  await waitForPagePath(nextPage.pagePath)

  await expect(radioButton).toBeSelected()
}

export const keyElementFromChangeLink = (element) =>
  element.parentElement().parentElement().$('.govuk-summary-list__key')

export const valueElementFromChangeLink = (element) =>
  element.parentElement().parentElement().$('.govuk-summary-list__value')
