import { browser } from '@wdio/globals'

export const waitForUrlPath = async (path) => {
  const normalizePath = (path) => path.replace(/^\/+|\/+$/g, ''); // Remove leading and trailing slashes

  await browser.waitUntil(
    async () => {
      const currentUrl = await browser.getUrl();
      const currentPath = new URL(currentUrl).pathname;
      const normalizedCurrentPath = normalizePath(currentPath);

      const expectedPath = `/${normalizePath(path)}`;

      return normalizedCurrentPath === normalizePath(expectedPath);
    },
    {
      timeoutMsg: `Failed to verify page path. Expected: "/${path}", but found: "${await browser.getUrl()}"`,
    }
  );
};

export const waitForElement = async (
  element,
  options = { timeout: 10000, visible: true }
) => {
  await element.waitForExist({ timeout: options.timeout })
  if (options.visible) {
    await element.waitForDisplayed({ timeout: options.timeout })
  }
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
  await browser.waitUntil(
    async () => (await browser.getTitle()) === pageTitle,
    {
      timeoutMsg: `Expected page title to become ${pageTitle}`
    }
  )
}

export const loadPageAndVerifyTitle = async (path, pageTitle) => {
  await browser.url(path)
  await verifyPageTitle(pageTitle)
}

export const selectLinkAndVerifyTitle = async (linkElement, pageTitle) => {
  await selectElement(linkElement)
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

export const typeIntoElement = async (element, text) => {
  try {
    await waitForElement(element)
    await element.setValue(text)
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
