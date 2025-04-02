import { ClientSecretCredential } from '@azure/identity'
import { Client } from '@microsoft/microsoft-graph-client'
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/authentication/azureTokenCredentials/TokenCredentialAuthenticationProvider.js'
import { config } from '~/src/config/config.js'

const sharepointConfig = config.get('sharepoint')

const credential = new ClientSecretCredential(
  sharepointConfig.tenantId ?? '',
  sharepointConfig.clientId ?? '',
  sharepointConfig.clientSecret ?? ''
)

const siteId = sharepointConfig.siteId
const listId = sharepointConfig.listId
const driveId = sharepointConfig.driveId

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ['https://graph.microsoft.com/.default']
})

const graphClient = Client.initWithMiddleware({ authProvider })

/**
 * Adds items to the configured SharePoint list
 */
export async function addItem(data, linkToFile) {
  return graphClient.api(`/sites/${siteId}/lists/${listId}/items`).post({
    fields: {
      Title: 'Test item',
      Link: `<a href="${linkToFile}" target="_blank">Biosecurity Map</a>`
    }
  })
}

/**
 * Gets items from the configured SharePoint list
 */
export async function getItems() {
  return graphClient.api(`/sites/${siteId}/lists/${listId}/items`).get()
}

export async function uploadFile(cphNumber, fileName, file) {
  return graphClient
    .api(
      `/drives/${driveId}/items/root:/Biosecurity Maps/${cphNumber}/${fileName}:/content`
    )
    .put(file)
}
