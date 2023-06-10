"use client"

import React, { FunctionComponent, useState } from "react"

import { Input } from "@/components/ui/input"
import AllStartups from "@/components/startup-page/AllStartups"

interface OwnProps {}

type Props = OwnProps

const startups = [
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Startup One",
    description:
      "A revolutionary startup changing the world with innovative products.",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Startup Two",
    description:
      "An AI-powered startup providing cutting-edge solutions for businesses.",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Startup Three",
    description:
      "A social impact startup aiming to improve lives through technology.",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Startup Three",
    description:
      "A social impact startup aiming to improve lives through technology.",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Startup Three",
    description:
      "A social impact startup aiming to improve lives through technology.",
  },
  {
    logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    name: "Startup Three",
    description:
      "A social impact startup aiming to improve lives through technology.",
  },

  // Add more startup objects here
]

const StartupPage: FunctionComponent<Props> = (props) => {
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
            Startups Page
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
            placeholder={"Search Startups"}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </header>
      <AllStartups searchText={searchText} startups={startups} />
    </>
  )
}

export default StartupPage
