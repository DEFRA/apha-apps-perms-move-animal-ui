import { Page } from '../../common/model/page/page-model.js'

// using Page to not make whole section invalid due to the page not being implemented yet
// make QuestionPage when implementing
export class ManureAndSlurryPage extends Page {
  urlPath = '/biosecurity/manure-and-slurry'
  sectionKey = 'biosecurity'
  question = ''
  questionKey = 'manureAndSlurry'
}

export const manureAndSlurryPage = new ManureAndSlurryPage()
