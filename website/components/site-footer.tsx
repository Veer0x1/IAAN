"use client"

import * as React from "react"
import Image from "next/image"
import DarkLogo from "@/public/assests/DarkLogo.svg"
import LightLogo from "@/public/assests/LightLogo.svg"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const { theme, setTheme } = useTheme()
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {theme === "dark" ? (
            <Image src={LightLogo} alt="IAAN" width={50} height={50} />
          ) : (
            <Image src={DarkLogo} alt="IAAN" width={50} height={50} />
          )}
          {/*<Icons.logo className="h-6 w-6" />*/}
          <p className="text-center text-sm font-medium leading-loose md:text-left">
            IIT BHU Alumni Angel Network
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
