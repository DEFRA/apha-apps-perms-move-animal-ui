import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class ApplicantMovingCarcassesPage extends Page {
  urlPath = '/fmd/movement-destination/business-receiving-the-licence'
}

export const applicantMovingCarcassesPage = new ApplicantMovingCarcassesPage()
