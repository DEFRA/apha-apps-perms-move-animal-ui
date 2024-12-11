import { CphNumberPage } from '~/src/server/origin/cph-number/index.js'
import { SectionModelUpdated } from './section-model-updated.js'
import { OnOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'
import { OriginAddressPage } from '~/src/server/origin/address/index.js'
import { OnOffFarm } from '~/src/server/common/model/answer/on-off-farm.js'
import { CphNumber } from '~/src/server/common/model/answer/cph-number.js'
import { Address } from '~/src/server/common/model/answer/address.js'
/** @import {OnOffFarmData} from '~/src/server/common/model/answer/on-off-farm.js' */

class OriginModel extends SectionModelUpdated {
  static firstPage = new OnOffFarmPage()
}

const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressTown: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

const validState = {
  onOffFarm: /** @type {OnOffFarmData} */ ('off'),
  cphNumber: '12/345/6789',
  address: validAddress
}

const invalidState = {
  onOffFarm: /** @type {OnOffFarmData} */ ('off'),
  cphNumber: 'not-a-cph',
  address: validAddress // this is unreachable in the journey, since we've got an invalid question ahead of it
}

const exitState = {
  onOffFarm: /** @type {OnOffFarmData} */ ('on'),
  cphNumber: 'not-a-cph', // this is unreachable in the journey, because we will have exited already
  address: validAddress // this is unreachable in the journey, because we will have exited already
}

describe('SectionModel.fromState', () => {
  it('should generate from the first page it runs out of questions - for a valid payload', () => {
    const data = OriginModel.fromState(validState)._data

    expect(data.length).toEqual(3)

    expect(data[0].page).toBeInstanceOf(OnOffFarmPage)
    expect(data[0].answer).toBeInstanceOf(OnOffFarm)

    expect(data[1].page).toBeInstanceOf(CphNumberPage)
    expect(data[1].answer).toBeInstanceOf(CphNumber)

    expect(data[2].page).toBeInstanceOf(OriginAddressPage)
    expect(data[2].answer).toBeInstanceOf(Address)
  })

  it('should short-circuit on invalid page', () => {
    const data = OriginModel.fromState(invalidState)._data

    expect(data.length).toEqual(2)

    expect(data[0].page).toBeInstanceOf(OnOffFarmPage)
    expect(data[0].answer).toBeInstanceOf(OnOffFarm)

    expect(data[1].page).toBeInstanceOf(CphNumberPage)
    expect(data[1].answer).toBeInstanceOf(CphNumber)
  })

  it('should short-circuit on an exit page', () => {
    const data = OriginModel.fromState(exitState)._data

    expect(data.length).toEqual(1)
    expect(data[0].page).toBeInstanceOf(OnOffFarmPage)
    expect(data[0].answer).toBeInstanceOf(OnOffFarm)
  })
})

describe('SectionModel.validate', () => {
  it('should return valid if all questions in journey are validly answered', () => {
    const origin = OriginModel.fromState(validState)

    expect(origin.validate()).toEqual({ isValid: true })
  })

  it('should return ... invalid ? ... if the section hits an exit condition before its complete', () => {
    const origin = OriginModel.fromState(exitState)

    expect(origin.validate()).toEqual({ isValid: false })
  })

  it('should return invalid if the section hits a page with an invalid answer', () => {
    const origin = OriginModel.fromState(invalidState)
    const { isValid, firstInvalidPage } = origin.validate()

    expect(isValid).toEqual(false)
    expect(firstInvalidPage).toBeInstanceOf(CphNumberPage)
  })
})

describe('SectionModel.value', () => {
  it('return the page answers', () => {
    const { value, _data } = OriginModel.fromState(validState)

    expect(value).toEqual(_data)
  })
})
