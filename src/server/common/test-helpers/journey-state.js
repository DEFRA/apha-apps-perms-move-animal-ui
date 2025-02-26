/** @import { OnOffFarmData } from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js' */

const validCphNumber = '12/345/6789'
const validOriginType = 'afu'
/** @type {OnOffFarmData} */
const validOnOffFarm = 'off'
const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressTown: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

export const validOriginSectionState = {
  onOffFarm: validOnOffFarm,
  originType: validOriginType,
  cphNumber: validCphNumber,
  address: validAddress
}
