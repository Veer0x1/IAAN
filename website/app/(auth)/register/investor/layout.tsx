import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Investor form",
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <div className="flex w-full flex-1 flex-col items-center justify-center px-20 ">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute left-4 top-4 md:left-8 md:top-8"
            )}
          >
            <>
              {/* eslint-disable-next-line react/jsx-no-undef */}
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
          <Card className={"m-4"}>
            <div className="space-y-6 p-10 pb-16 md:block">
              <div className="space-y-0.5">
                <h2 className="text-center text-2xl font-bold tracking-tight">
                  Personal Info
                </h2>
                <p className="text-center text-muted-foreground">
                  Provide your details to get started
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex-1">{children}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
