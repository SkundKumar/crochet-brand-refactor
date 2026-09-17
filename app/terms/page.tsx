import type { Metadata } from "next"
import { SiteInfoPage } from "@/components/site-info-page"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms for browsing and ordering from Crux.",
}

export default function TermsPage() {
  return (
    <SiteInfoPage title="Terms of Service" description="Terms for using the Crux website and ordering handmade products.">
      <p>Product images and descriptions represent handmade items. Small differences in colour, shape, and finish are expected and are part of the handmade nature of each piece.</p>
      <p>Prices, availability, preparation times, and delivery estimates may change. An order is confirmed when Crux has reviewed the order enquiry and confirmed the details with you.</p>
    </SiteInfoPage>
  )
}
