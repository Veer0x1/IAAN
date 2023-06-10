import { Metadata } from "next"

import { Command, CommandInput } from "@/components/ui/command"

export const metadata: Metadata = {
  title: "Startups",
}

interface StartupPageLayoutProps {
  children: React.ReactNode
}

export default function StartupPageLayout({
  children,
}: StartupPageLayoutProps) {
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
