import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'

// STUB PAGE
export class CompanySellingMilkToPage extends ExitPage {
  urlPath = '/fmd/movement-destination/milk-selling-company-name'
}

export const companySellingMilkToPage = new CompanySellingMilkToPage()
