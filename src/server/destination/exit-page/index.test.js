import { ExitPage } from '../../common/model/page/exit-page-model.js'
import { destinationExitPage } from './index.js'

describe('DestinationExitPage', () => {
  it('should be an exit page', () => {
    expect(destinationExitPage).toBeInstanceOf(ExitPage)
  })
})
