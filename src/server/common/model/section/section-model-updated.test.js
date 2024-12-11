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

describe('SectionModel.value', () => {
  it('should generate from the first page it runs out of questions - for a valid payload', () => {
    const value = OriginModel.fromState(validState).value

    expect(value.length).toEqual(3)

    expect(value[0].page).toBeInstanceOf(OnOffFarmPage)
    expect(value[0].answer).toBeInstanceOf(OnOffFarm)

    expect(value[1].page).toBeInstanceOf(CphNumberPage)
    expect(value[1].answer).toBeInstanceOf(CphNumber)

    expect(value[2].page).toBeInstanceOf(OriginAddressPage)
    expect(value[2].answer).toBeInstanceOf(Address)
  })

  it('should short-circuit on invalid page', () => {
    const value = OriginModel.fromState(invalidState).value

    expect(value.length).toEqual(2)

    expect(value[0].page).toBeInstanceOf(OnOffFarmPage)
    expect(value[0].answer).toBeInstanceOf(OnOffFarm)

    expect(value[1].page).toBeInstanceOf(CphNumberPage)
    expect(value[1].answer).toBeInstanceOf(CphNumber)
  })

  it('should short-circuit on an exit page', () => {
    const value = OriginModel.fromState(exitState).value

    expect(value.length).toEqual(1)
    expect(value[0].page).toBeInstanceOf(OnOffFarmPage)
    expect(value[0].answer).toBeInstanceOf(OnOffFarm)
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

describe('SectionModel.fromState', () => {
  it('should return an instance of the class that produced it', () => {
    expect(OriginModel.fromState(validState)).toBeInstanceOf(OriginModel)
  })
})
