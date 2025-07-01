export const calculateNextPage = (prefix = '', redirect, original) => {
  if (redirect && redirect !== '') {
    return prefix + redirect
  } else {
    return original
  }
}

/**
 * exports @typedef {{ nextPage ?: string }} NextPage
 */
