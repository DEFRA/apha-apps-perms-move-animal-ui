export const navigateIfFirstPage = async (startFromFirstPage, firstPage) => {
  if (startFromFirstPage) {
    await firstPage.navigateToPageAndVerifyTitle()
  }
}
