import { Page } from '~/src/server/common/model/page/page-model.js'

export class NumberOfAnimalsPage extends Page {
  urlPath = '/exotics/about-the-movement/what-is-moving/select-animals/quantity'
}

export const numberOfAnimalsPage = new NumberOfAnimalsPage()
