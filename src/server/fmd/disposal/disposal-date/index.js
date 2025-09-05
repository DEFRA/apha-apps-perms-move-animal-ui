import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class DisposalDatePage extends Page {
  urlPath = '/fmd/disposal-of-animal/date-of-disposal'
}

export const disposalDatePage = new DisposalDatePage()
