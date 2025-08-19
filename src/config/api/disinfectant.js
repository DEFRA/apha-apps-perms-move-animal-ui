export const disinfectantConfig = {
  baseUrl: {
    doc: 'Base url for the disinfectant api',
    format: String,
    default: 'https://disinfectant-backend.dev.cdp-int.defra.cloud',
    env: 'DISINFECTANT_API_BASE_URL'
  },
  path: {
    doc: 'Path for the disinfectant api',
    format: String,
    default: '/getApprovedDisinfectants',
    env: 'DISINFECTANT_API_PATH'
  },
  cache: {
    database: {
      doc: 'REDIS db to use for api cache',
      format: Number,
      default: 1,
      env: 'DISINFECTANT_API_CACHE_DATABASE'
    },
    TTL: {
      doc: 'Time to live for api cache (seconds)',
      format: Number,
      default: 604800,
      env: 'DISINFECTANT_API_CACHE_TTL'
    }
  }
}
