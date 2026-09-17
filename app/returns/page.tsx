import type { Metadata } from "next"
import { SiteInfoPage } from "@/components/site-info-page"

export const metadata: Metadata = {
  title: "Returns and Exchanges",
  description: "Read the Crux returns and order support information.",
}

export default function ReturnsPage() {
  return (
    <SiteInfoPage title="Returns & Exchanges" description="We want you to love your Crux purchase.">
      <p>If an item arrives damaged or there is a problem with your order, contact us as soon as possible with your order details and photographs so we can review it.</p>
      <p>Because handmade pieces are prepared individually, please contact us before sending anything back. We will confirm the appropriate next step for your order.</p>
    </SiteInfoPage>
  )
}
