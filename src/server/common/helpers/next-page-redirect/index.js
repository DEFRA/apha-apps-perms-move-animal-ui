export const nextPageRedirect = (prefix = '', nextPage, query) => {
  const queryParams = new URLSearchParams(query)
  let url = prefix + nextPage.urlPath

  if (queryParams.size > 0) {
    url += `?${decodeURIComponent(queryParams.toString())}`
  }

  return url
}
