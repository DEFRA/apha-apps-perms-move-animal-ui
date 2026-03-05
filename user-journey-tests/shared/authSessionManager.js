const normalizePath = (value) => value.replace(/^\/+|\/+$/g, '')

export async function loginAndSaveSession(signInPage) {
  const defraIdEnabled =
    (process.env.DEFRA_ID_ENABLED || '').trim().toLowerCase() !== 'false'

  if (!defraIdEnabled) {
    return
  }

  await signInPage.open(signInPage.pagePath)

  const currentPath = normalizePath(new URL(await browser.getUrl()).pathname)
  const signInPath = normalizePath(signInPage.pagePath)

  if (currentPath !== signInPath) {
    return
  }

  await signInPage.signInUsingTestCredentials()
}

export async function restoreSession() {
  const allCookies = await browser.getCookies()
  const cookieNames = allCookies.map((cookie) => cookie.name)

  if (cookieNames.includes('session')) {
    await browser.deleteCookies('session')
  }

  if (cookieNames.includes('crumb')) {
    await browser.deleteCookies('crumb')
  }
}
