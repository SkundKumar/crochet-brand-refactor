const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

if (process.env.NODE_ENV === "production" && !configuredSiteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be set in production")
}

export const siteUrl = configuredSiteUrl || "http://localhost:3000"

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString()
