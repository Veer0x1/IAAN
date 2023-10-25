import React from "react"
import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import UserLoginForm from "@/components/UserLoginForm"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

const page = () => {
  return (
    <main>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="flex  flex-col items-center justify-center py-12">
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <UserLoginForm />
        </div>
      </div>
    </main>
  )
}

export default page
