import type { Metadata } from "next"
import { SiteInfoPage } from "@/components/site-info-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how Crux handles information shared through the website and order enquiries.",
}

export default function PrivacyPage() {
  return (
    <SiteInfoPage title="Privacy Policy" description="Your information should be handled with care.">
      <p>Crux uses information you provide to respond to enquiries, prepare orders, and communicate about delivery. We do not sell personal information.</p>
      <p>When you choose WhatsApp checkout or enquiry, your message is sent to WhatsApp and handled according to WhatsApp’s policies. Please avoid sharing information that is not needed to fulfil your request.</p>
    </SiteInfoPage>
  )
}
