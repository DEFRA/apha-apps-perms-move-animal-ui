import { Page } from '~/src/server/common/model/page/page-model.js'

export class CountryPage extends Page {
  urlPath = '/origin/country'
  sectionKey = 'origin'
}

export const countryPage = new CountryPage()
