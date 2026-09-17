import type { Metadata } from "next"
import { SiteInfoPage } from "@/components/site-info-page"

export const metadata: Metadata = {
  title: "Contact Crux",
  description: "Contact the Crux team about products, custom requests, orders, and partnerships.",
}

export default function ContactPage() {
  return (
    <SiteInfoPage title="Contact Us" description="We are happy to help with product questions, orders, and custom requests.">
      <p>For the fastest response, use the WhatsApp enquiry button on any product page. Please include the product name and your question.</p>
      <p>For order support, include your order details and the phone number used at checkout so we can help quickly.</p>
    </SiteInfoPage>
  )
}
