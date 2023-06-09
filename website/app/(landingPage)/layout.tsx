import Link from "next/link"

import { landingPageConfig } from "@/config/landingPage"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={landingPageConfig.mainNav} />
          <nav className="flex align-middle">
            <Link
              href={"/login"}
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "mr-4 px-4"
              )}
            >
              Login
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"sm"}>
                  Join Us
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-1.5 w-auto">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href={"/register/founder"}>
                      <span>Join as Founder</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {/*<User className="mr-2 h-4 w-4" />*/}
                    <Link href={"/register/investor"}>
                      <span>Join as Investor</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
      {/*<Separator />*/}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

export default LandingLayout
