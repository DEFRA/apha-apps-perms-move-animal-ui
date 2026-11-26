import { $ } from '@wdio/globals'
import {
  selectLinkAndVerifyTitle,
  validateElementVisibleAndText
} from './page-helpers.js'

export async function verifyStaticPageTranslations(page, translation) {
  await selectLinkAndVerifyTitle(page.getLanguageLink('cy'), translation.title)
  await expect($('html')).toHaveAttribute('lang', 'cy')
  await validateElementVisibleAndText(page.getPageHeading(), translation.title)

  for (const text of translation.welsh) {
    await validateElementVisibleAndText($('main'), text)
  }

  for (const { selector, href, text } of translation.links || []) {
    await expect($(selector)).toHaveAttribute('href', href)
    await validateElementVisibleAndText($(selector), text)
  }

  await selectLinkAndVerifyTitle(page.getLanguageLink('en'), page.pageTitle)
  await expect($('html')).toHaveAttribute('lang', 'en')
  await page.verifyPageHeadingAndTitle()

  for (const text of translation.english) {
    await validateElementVisibleAndText($('main'), text)
  }
}
