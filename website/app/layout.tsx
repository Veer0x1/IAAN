import "@/styles/globals.css"
import { Metadata } from "next"
import { getServerSession } from "next-auth/next"

import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import Provider from "@/app/Provider"
import {MainNav} from "@/components/main-nav";
import {landingPageConfig} from "@/config/landingPage";
import NavbarAction from "@/components/ui/NavbarAction";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

// @ts-ignore
export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions)
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>IAAN</title>
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Provider session={session}>
              <header className="container z-40 bg-background -mb-2.5">
                <div className="flex h-20 items-center justify-between py-6">
                  <MainNav items={landingPageConfig.mainNav} />
                  <nav className="flex align-middle"></nav>
                  <NavbarAction />
                </div>
              </header>
              <div className="relative flex min-h-screen flex-col">
                <div className="flex-1">{children}</div>
              </div>
            </Provider>
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
