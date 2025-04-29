import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getServerURLs = () => {
  let serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  let productionUrl = process.env.NEXT_PUBLIC_PRIMARY_PRODUCTION_URL

  if (!serverUrl && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    serverUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!serverUrl) {
    serverUrl = 'http://localhost:3000'
  }

  if (!productionUrl && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    productionUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!productionUrl) {
    productionUrl = 'http://localhost:3000'
  }

  return [serverUrl, productionUrl]
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
