import Wreck from '@hapi/wreck'

export const fetchDisinfectants = async () => {
  const response = await Wreck.get(
    'https://disinfectant-backend.dev.cdp-int.defra.cloud/getApprovedDisinfectants?type=tbo'
  )

  return JSON.parse(response.payload.toString()).filteredDisinfectants ?? []
}
