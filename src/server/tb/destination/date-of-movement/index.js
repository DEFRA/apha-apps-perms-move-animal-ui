import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class DateOfMovementPage extends Page {
  urlPath = '/destination/date-of-movement'
}

export const dateOfMovementPage = new DateOfMovementPage()
