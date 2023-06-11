import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Investors Page",
}

interface InvestorPageLayoutProps {
  children: React.ReactNode
}

export default function InvestorPageLayout({
  children,
}: InvestorPageLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            {children}
          </section>
        </main>
      </div>
    </>
  )
}
