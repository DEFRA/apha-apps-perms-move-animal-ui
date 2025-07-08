import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class AnimalsOnPremisesPage extends Page {
  urlPath = '/exotics/movement-origin/animals-onsite'
}

export const animalsOnPremisesPage = new AnimalsOnPremisesPage()
