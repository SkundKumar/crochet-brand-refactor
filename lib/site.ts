const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
const vercelDeploymentUrl = process.env.VERCEL_URL?.trim()
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
const isVercelProduction = process.env.VERCEL_ENV === "production"

if (isVercelProduction && !configuredSiteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be set in production")
}

const deploymentUrl = isVercelProduction ? vercelProductionUrl : vercelDeploymentUrl
export const siteUrl = configuredSiteUrl
  || (deploymentUrl ? `https://${deploymentUrl}` : "http://localhost:3000")

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString()
