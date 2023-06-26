import { landingPageConfig } from "@/config/landingPage"
import NavbarAction from "@/components/ui/NavbarAction"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/*<header className="container z-40 bg-background">*/}
      {/*  <div className="flex h-20 items-center justify-between py-6">*/}
      {/*    <MainNav items={landingPageConfig.mainNav} />*/}
      {/*    <nav className="flex align-middle"></nav>*/}
      {/*    <NavbarAction />*/}
      {/*  </div>*/}
      {/*</header>*/}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

export default LandingLayout
