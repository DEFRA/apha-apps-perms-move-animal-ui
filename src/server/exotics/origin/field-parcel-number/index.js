import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class FieldParcelNumberPage extends Page {
  urlPath = '/exotics/movement-origin/field-parcel-number'
}

export const fieldParcelNumberPage = new FieldParcelNumberPage()
