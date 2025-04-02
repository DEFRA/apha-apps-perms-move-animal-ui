export async function loginAndSaveSession(signInPage) {
  await signInPage.signInUsingTestCredentials()
}

export async function restoreSession() {
  await browser.deleteCookies('session', 'crumb')
}
