import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class BuildingsAnySharedPage extends Page {
  urlPath = '/biosecurity/buildings-any-shared'
  sectionKey = 'biosecurity'
  question = 'question to be asked'
  questionKey = 'buildingsAnyShared'
}

export const buildingsAnySharedPage = new BuildingsAnySharedPage()
