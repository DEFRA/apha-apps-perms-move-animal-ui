export async function loginAndSaveSession(signInPage) {
  const defraIdEnabled =
    (process.env.DEFRA_ID_ENABLED || '').trim().toLowerCase() !== 'false'

  if (!defraIdEnabled) {
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
