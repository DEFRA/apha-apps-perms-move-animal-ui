export const escapeHtml = (unsafe) => {
  return unsafe?.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
