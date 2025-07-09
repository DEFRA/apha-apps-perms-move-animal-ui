import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class IsDurationMoreThanOneDayPage extends Page {
  urlPath = '/exotics/visit-details/duration-more-than-one-day'
}

export const isDurationMoreThanOneDayPage = new IsDurationMoreThanOneDayPage()
