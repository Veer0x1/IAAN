"use client"

import React, { FunctionComponent } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { UserNav } from "@/components/ui/UserNav"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface OwnProps {}

type Props = OwnProps

const NavbarAction: FunctionComponent<Props> = (props) => {
  const { data: session, status } = useSession()
  return (
    <>
      {session?.user && status === "authenticated" ? (
        <UserNav />
      ) : (
        <div>
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
              <Button
                variant="outline"
                size={"sm"}
                disabled={status === "loading"}
              >
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
        </div>
      )}
    </>
  )
}

export default NavbarAction
