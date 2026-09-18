import type { Metadata } from "next"
import { SiteInfoPage } from "@/components/site-info-page"

export const metadata: Metadata = {
  title: "Shipping Information",
  description: "Learn about Crux preparation times, delivery, and shipping charges.",
}

export default function ShippingPage() {
  return (
    <SiteInfoPage title="Shipping" description="Carefully packed handmade pieces delivered to you.">
      <p>Orders are generally prepared within 1–2 weeks. The exact delivery estimate is shown in the delivery information for each product.</p>
      <p>Shipping is free on orders over ₹500. Orders below that threshold have a ₹60 shipping charge, as shown in the cart before checkout.</p>
    </SiteInfoPage>
  )
}
