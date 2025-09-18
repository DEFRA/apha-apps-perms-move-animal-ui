export const verifyCheckAnswersPage = async ({
  journeyData,
  basePath,
  redirectUri,
  checkAnswersPage,
  expectedHeading = 'Check your answers before you continue your application'
}) => {
  const getExpected = (key) => journeyData[key].expected
  const getExpectedHref = (key) =>
    `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

  await checkAnswersPage.verifyPageHeadingAndTitle(expectedHeading)

  for (const key of Object.keys(journeyData)) {
    const valueEl = await checkAnswersPage.getValue(key)
    const changeLink = await checkAnswersPage.getChangeLink(key)

    await expect(valueEl).toHaveTextContaining(getExpected(key))
    await expect(changeLink).toHaveAttribute('href', getExpectedHref(key))
  }
}

export const verifyCheckAnswersPageShort = async ({
  journeyData,
  checkAnswersPage,
  expectedHeading = 'Check your answers before you continue your application'
}) => {
  const getExpected = (key) => journeyData[key].expected
  await checkAnswersPage.verifyPageHeadingAndTitle(expectedHeading)

  for (const key of Object.keys(journeyData)) {
    const valueEl = await checkAnswersPage.getValue(key)

    await expect(valueEl).toHaveTextContaining(getExpected(key))
  }
}
