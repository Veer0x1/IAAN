import { Metadata } from "next"

import { Command, CommandInput } from "@/components/ui/command"
import { getServerSession } from "next-auth/next"
import Provider from "@/app/(homePage)/Provider"
import { authOptions } from "@/lib/auth"
export const metadata: Metadata = {
  title: "Startups",
}

interface StartupPageLayoutProps {
  children: React.ReactNode
}

export default async function StartupPageLayout({
  children,
}: StartupPageLayoutProps) {
  const session = await getServerSession(authOptions)
  return (
    <>
      <div className="flex min-h-screen flex-col">
      <Provider session={session}>
        <main className="flex-1">
          <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            {children}
          </section>
        </main>
       </Provider>
      </div>
    </>
  )
}
