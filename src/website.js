export const websiteFiles = new Map([
  ['/index.html', await import('./website/index.html.js')],
  ['/manifest.webmanifest', await import('./website/manifest.webmanifest.js')],
])
