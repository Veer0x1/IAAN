"use client"

import React, { FunctionComponent, useState } from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InvestorCard } from "@/components/investor-page/investorCard"

interface OwnProps {}

type Props = OwnProps

const investor = [
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Rakesh Jhaa",
    description: "Investor",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Arpit Singh",
    description: "Investor",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Dhruv Gupta",
    description: "Investor",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Shailendra Jatav",
    description: "Investor",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Vaibhav Saini",
    description: "Investor",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Rishi Kaushik",
    description: "Investor",
  },

  // Add more investors objects here
]

const InvestorPage: FunctionComponent<Props> = (props) => {
  const [searchText, setSearchText] = useState<string | undefined>(undefined)
  return (
    <>
      <header className={"flex w-full max-w-full items-center truncate"}>
        <div
          className={
            "hidden w-full truncate ltr:mr-4 rtl:ml-4 sm:hidden md:block lg:block"
          }
        >
          <h3
            className={
              "max-w-28 sm:max-w-72 md:max-w-80 text-emphasis hidden truncate text-xl font-semibold sm:text-xl md:block xl:max-w-full"
            }
          >
            Investor Page
          </h3>
          <p className={"text-default hidden text-sm md:block"}>
            Connecting people, technology and the workplace.
          </p>
        </div>
        <div
          className={
            "flex w-full flex-col pr-2 pt-4 md:flex-row md:justify-between md:pt-0 lg:w-auto"
          }
        >
          <Input
            type={"search"}
            placeholder={"Search Investor"}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </header>

      <div
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-emphasis my-4 max-w-max text-lg font-medium"
        )}
      >
        All Investors
      </div>
      <InvestorCard detail={investor} />
    </>
  )
}

export default InvestorPage
