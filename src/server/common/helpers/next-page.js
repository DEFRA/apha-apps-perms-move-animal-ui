export const calculateNextPage = (redirect, original) => {
  if (redirect && redirect !== '') {
    return redirect
  } else {
    return original
  }
}

/**
 * exports @typedef {{ nextPage ?: string }} NextPage
 */
