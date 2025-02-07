import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class RoadsAndTracksPage extends Page {
  urlPath = '/biosecurity/roads-and-tracks'
  sectionKey = 'biosecurity'
  question = ''
  questionKey = 'roadsAndTracks'
}

export const roadsAndTracksPage = new RoadsAndTracksPage()
