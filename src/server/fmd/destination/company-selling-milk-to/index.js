import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class CompanySellingMilkToPage extends Page {
  urlPath = '/fmd/movement-destination/milk-selling-company-name'
}

export const companySellingMilkToPage = new CompanySellingMilkToPage()
