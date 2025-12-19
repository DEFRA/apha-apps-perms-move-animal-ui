import { browser } from '@wdio/globals'

export const waitForExpectedRedirectUri = async (pagePath) => {
  const expectedQueryString = `returnUrl=/${pagePath}`
  await browser.waitUntil(
    async () => {
      const currentUrl = await browser.getUrl()
      const currentQueryString = currentUrl.split('?')[1]

      return expectedQueryString === currentQueryString
    },
    {
      timeoutMessage: `Failed to verify page returnUrl.  Expected: "${pagePath}", but found ${await browser.getUrl()}`
    }
  )
}

export const waitForPagePath = async (path) => {
  const normalizePath = (value) => value.replace(/^\/+|\/+$/g, '')

  const expectedPath = normalizePath(path)

  await browser.waitUntil(
    async () => {
      const currentUrl = await browser.getUrl()
      const { pathname } = new URL(currentUrl)

      const currentPath = normalizePath(pathname)

      return currentPath === expectedPath
    },
    {
      timeoutMsg: `Failed to verify page path. Expected path: "/${expectedPath}", but found: "${await browser.getUrl()}"`
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

export const loadPageAndVerifyTitle = async (
  path,
  pageTitle,
  preview = true
) => {
  const url = preview ? `${path}?force=true` : path

  await browser.url(url)
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
  await switchToNewTab({
    urlContains: 'bovine-tb-getting-your-cattle-tested-in-england'
  })
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
      await selectElement($('[id*="__listbox"] > li:first-child'), true)
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

export const switchToNewTab = async ({
  titleContains,
  urlContains,
  timeout = 20000
}) => {
  const startHandles = await browser.getWindowHandles()

  await browser.waitUntil(
    async () => {
      const handles = await browser.getWindowHandles()

      for (const h of handles) {
        await browser.switchToWindow(h)
        const title = await browser.getTitle()
        const url = await browser.getUrl()

        if (
          (titleContains && title.includes(titleContains)) ||
          (urlContains && url.includes(urlContains))
        ) {
          return true
        }
      }

      return false
    },
    {
      timeout,
      interval: 500,
      timeoutMsg: `Could not find window matching titleContains="${titleContains}" or urlContains="${urlContains}". Handles: ${startHandles}`
    }
  )
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
