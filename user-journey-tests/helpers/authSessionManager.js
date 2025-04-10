export async function loginAndSaveSession(signInPage) {
  if (process.env.DEFRA_ID_ENABLED === 'false') {
    return
  }

  await signInPage.signInUsingTestCredentials()
}

export async function restoreSession() {
  await browser.deleteCookies('session', 'crumb')
}
