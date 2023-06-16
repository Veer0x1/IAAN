import React from 'react'
import { Metadata } from "next"
import { MainNav } from "@/components/dashboard_component/main-nav"
import { Search } from "@/components/dashboard_component/search"
import { UserNav } from "@/components/dashboard_component/user-nav"
import Link from "next/link"
import { Icons } from "@/components/icons"
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}
const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <> <div className=" flex-col md:flex">
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* <TeamSwitcher /> */}
        <Link href="/" className="hidden items-center space-x-2 md:flex">
    <Icons.logo className={"h-6 w-6"} />
    <span className="hidden font-bold sm:inline-block">
      IAAN
    </span>
  </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </header>
    <main>{children}</main>
    
  </div>
    </>
  )
}

export default Dashboardlayout