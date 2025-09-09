import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class CompanyTransportingMilkPage extends Page {
  urlPath = '/fmd/movement-destination/same-transporting-company-yes-no'
}

export const companyTransportingMilkPage = new CompanyTransportingMilkPage()
