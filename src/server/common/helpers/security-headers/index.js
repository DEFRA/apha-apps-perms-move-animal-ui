const generateContentSecurityPolicyHeaders = (request) => [
  "default-src 'self';",
  "img-src 'self' https://www.nationalarchives.gov.uk/;",
  `script-src 'nonce-${request.app.uuid}' strict-dynamic;`,
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
