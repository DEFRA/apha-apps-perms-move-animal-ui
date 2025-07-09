import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class AnimalsOnsitePage extends Page {
  urlPath = '/exotics/location-of-visit/animals-onsite'
}

export const animalsOnsitePage = new AnimalsOnsitePage()
