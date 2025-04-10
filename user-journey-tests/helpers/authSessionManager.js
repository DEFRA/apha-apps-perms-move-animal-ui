export async function loginAndSaveSession(signInPage) {
  const defraIdEnabled =
    (process.env.DEFRA_ID_ENABLED || '').trim().toLowerCase() !== 'false'

  if (!defraIdEnabled) {
    return
  }

  await signInPage.signInUsingTestCredentials()
}

export async function restoreSession() {
  await browser.deleteCookies('session', 'crumb')
}
