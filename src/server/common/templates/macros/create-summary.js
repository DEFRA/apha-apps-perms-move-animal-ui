/** @import { SectionModel } from '../../model/section/section-model/section-model.js' */

/** @param {SectionModel} section */
export const sectionToSummary = (section, redirectUri) => {
  return section.questionPageAnswers
    .filter(({ page }) => !page.isInterstitial)
    .map(({ page, answer }) => ({
      key: page.question,
      value: answer.html,
      url: `${page.urlPath}?redirect_uri=${redirectUri}`,
      visuallyHiddenKey: page.question,
      attributes: {
        'data-testid': `${page.questionKey}-change-link`
      }
    }))
}
