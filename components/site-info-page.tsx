import Link from "next/link"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export function SiteInfoPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen">
      <Header />
      <article className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to Crux
          </Link>
          <header className="mt-8 mb-10">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </header>
          <div className="space-y-8 text-foreground/80 leading-relaxed">{children}</div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
