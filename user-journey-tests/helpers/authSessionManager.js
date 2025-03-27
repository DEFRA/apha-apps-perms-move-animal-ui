/* global localStorage, sessionStorage */
let savedCookies
let savedLocalStorage

export async function loginAndSaveSession(signInPage) {
  await signInPage.signInUsingTestCredentials()

  savedCookies = await browser.getCookies()

  savedLocalStorage = await browser.execute(() => {
    const store = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      store[key] = localStorage.getItem(key)
    }
    return store
  })
}

// This restores all cookie details from previous run (much faster than advanced, use where possible)
export async function restoreSession() {
  await browser.url('/')

  for (const cookie of savedCookies) {
    await browser.setCookies(cookie)
  }

  await browser.refresh()

  await browser.execute((data) => {
    for (const key in data) {
      localStorage.setItem(key, data[key])
    }
  }, savedLocalStorage)

  await browser.refresh()
}

// This one only restores the certain cookies so that data saved in the app is not retained
export async function restoreSessionAdvanced() {
  await browser.url('/')

  // 🔁 Clear existing state before restoring
  await browser.deleteCookies()
  await browser.execute(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  // ✅ Restore saved cookies
  const authCookiesOnly = savedCookies.filter(
    (cookie) => ['auth', 'crumb'].includes(cookie.name) // keep only login-relevant cookies
  )

  for (const cookie of authCookiesOnly) {
    await browser.setCookies(cookie)
  }

  await browser.refresh()

  // ✅ Restore saved localStorage (after refresh to avoid overwrite)
  await browser.execute((data) => {
    for (const key in data) {
      localStorage.setItem(key, data[key])
    }
  }, savedLocalStorage)

  await browser.refresh()
}
