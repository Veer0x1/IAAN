
import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {Button, buttonVariants} from "@/components/ui/button"
import UserLoginForm from "@/components/UserLoginForm"
import { Icons } from "@/components/icons"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export const metadata: Metadata = {
  title: "Join us",
  description: "Join us page ",
}

const Page = () => {
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
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Join Us</CardTitle>
              <CardDescription>
                {/*Enter your email to sign in to your account*/}
                Welcome to the entrepreneurship community of IIT
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t -mt-8" />

                </div>
                <div className="pt-8 text-lg font-medium">
                  As you are logging for the first time , join as
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "px-8 text-center text-lg text-muted-foreground"
                )}
              >
                <Link
                  href={"/register/founder"}
                  className=" "
                >
                  Join as Founder
                </Link>
              </p>
              <p
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "px-8 text-center text-lg text-muted-foreground"
                )}
              >
                <Link
                  href={"/register/investor"}
                  className=" "
                >
                  Join as Investor
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default Page
