import { browser, $, $$ } from '@wdio/globals'

const normalizePath = (value) => value.replace(/^\/+|\/+$/g, '')

const diagnosticUrl = (value) => {
  if (!value) return '[not available]'
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol)
      ? `${url.origin}${url.pathname}`
      : `${url.protocol}[redacted]`
  } catch {
    return '[invalid URL]'
  }
}

export const logFailureContext = async (test, phase, retries) => {
  const details = {
    timestamp: new Date().toISOString(),
    test: [test?.parent, test?.title].filter(Boolean).join(' - '),
    phase,
    attempt: retries?.attempts
  }
  let timer
  try {
    Object.assign(details, {
      sessionId: browser.sessionId,
      browser: browser.capabilities?.browserName,
      version: browser.capabilities?.browserVersion,
      platform: browser.capabilities?.platformName,
      device:
        browser.capabilities?.deviceName ??
        browser.capabilities?.['appium:deviceName']
    })
    await Promise.race([
      (async () => {
        if (browser.isMobile) details.context = await browser.getContext()
        details.url = diagnosticUrl(await browser.getUrl())
        const page = await browser.execute(() => ({
          title: globalThis.document.title,
          language: globalThis.document.documentElement.lang,
          validationFields: Array.from(
            globalThis.document.querySelectorAll(
              '.govuk-error-summary a[href^="#"]'
            ),
            (link) => link.getAttribute('href')
          )
        }))
        Object.assign(details, page)
      })(),
      new Promise((resolve, reject) => {
        timer = setTimeout(() => reject(new Error('capture timed out')), 5000)
      })
    ])
  } catch {
    details.diagnostics = 'Page context unavailable or capture timed out'
  } finally {
    clearTimeout(timer)
  }
  process.stderr.write(`[E2E failure] ${JSON.stringify(details)}\n`)
}

export const waitForExpectedRedirectUri = async (pagePath) => {
  const expectedQueryString = `returnUrl=/${pagePath}`
  let currentUrl
  await browser.waitUntil(
    async () => {
      currentUrl = await browser.getUrl()
      const currentQueryString = currentUrl.split('?')[1]

      return expectedQueryString === currentQueryString
    },
    {
      timeoutMsg: () =>
        `Failed to verify page returnUrl. Expected: "${pagePath}", but found URL: "${diagnosticUrl(currentUrl)}" (query values redacted)`
    }
  )
}

export const waitForPagePath = async (path) => {
  const expectedPath = normalizePath(path)
  let currentUrl

  await browser.waitUntil(
    async () => {
      currentUrl = await browser.getUrl()
      const { pathname } = new URL(currentUrl)

      return normalizePath(pathname) === expectedPath
    },
    {
      timeoutMsg: () =>
        `Failed to verify page path. Expected path: "/${expectedPath}", but found: "${diagnosticUrl(currentUrl)}"`
    }
  )
}

export const waitForFullPageUrl = async (url) => {
  let currentUrl
  await browser.waitUntil(
    async () => {
      currentUrl = await browser.getUrl()
      return url === currentUrl
    },
    {
      timeoutMsg: () =>
        `Failed to verify page url. Expected: "${diagnosticUrl(url)}", but found: "${diagnosticUrl(currentUrl)}" (query values redacted)`
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
    await element.click()
  } catch (error) {
    throw new Error(
      `Failed to click element - ${await element.selector}: ${error}`
    )
  }
}

export const verifyPageTitle = async (pageTitle) => {
  let title
  const titleMatches = async () => {
    title = await browser.getTitle()
    return title === pageTitle || title === `Error: ${pageTitle}`
  }

  await browser.waitUntil(titleMatches, {
    timeoutMsg: () =>
      `Expected page title to be "${pageTitle}" or "Error: ${pageTitle}"\nReceived:\t${JSON.stringify(title)}`
  })
}

export const loadPageAndVerifyTitle = async (
  path,
  pageTitle,
  preview = true
) => {
  const pagePath = path.startsWith('/') ? path : `/${path}`
  const url = preview ? `${pagePath}?force=true` : pagePath

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
  pageTitle,
  urlContains
) => {
  await selectElement(linkElement)
  await switchToNewTab({
    titleContains: pageTitle,
    urlContains
  })
  await verifyPageTitle(pageTitle)
}

export const validateElementVisibleAndText = async (element, text) => {
  try {
    await waitForElement(element, { visible: true })
    await expect(element).toHaveText(text, { containing: true })
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
