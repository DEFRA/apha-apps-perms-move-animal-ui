/**
 * @param {string} referrerURI
 * @param {string} needle
 */
export default (referrerURI, needle) => {
  try {
    const { pathname } = new URL(referrerURI)
    return {
      nextPage: pathname === needle ? '/origin/summary' : ''
    }
  } catch (e) {
    return {
      nextPage: null
    }
  }
}

/**
 * exports @typedef {{ nextPage ?: string }} NextPage
 */
