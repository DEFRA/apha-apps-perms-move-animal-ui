const generateContentSecurityPolicyHeaders = (request) => [
  "default-src 'self';",
  "img-src 'self' https://www.nationalarchives.gov.uk/ https://unpkg.com https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org;",
  `script-src 'nonce-${request.app.uuid}' 'unsafe-inline' https://unpkg.com;`,
  "style-src 'self' 'unsafe-inline' https://unpkg.com;",
  "font-src 'self' https://unpkg.com;",
  "frame-ancestors 'none';"
]
export const addSecurityHeaders = (request, h) => {
  return (
    request.response.header?.(
      'Content-Security-Policy',
      generateContentSecurityPolicyHeaders(request).join(' ')
    ) ?? h.continue
  )
}
