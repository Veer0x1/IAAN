"use client"
import React, { FunctionComponent } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {useSession} from "next-auth/react";

interface OwnProps {}

type Props = OwnProps

const Hero: FunctionComponent<Props> = (props) => {
   const {data:session,status} =useSession()
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Link
          href={siteConfig.links.twitter}
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
        >
          Follow along on LinkedIn
        </Link>
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          IIT BHU Alumni Angel Network
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          An initiative by IIT BHU Alumni and E-Cell IIT BHU
        </p>
        <div className="space-x-4">
          {!session&&<Link href="/login" className={cn(buttonVariants({size: "lg"}))}>
            Get Started
          </Link>}
        </div>
      </div>
    </section>
  )
}

export default Hero
