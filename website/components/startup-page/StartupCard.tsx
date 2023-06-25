"use client"

import React, { FunctionComponent, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {FormType} from "@/components/FounderForm";
import Startupdetails from "@/components/startup-page/Startupdetails";
interface OwnProps {
  startup: (FormType &{image: string,websitePhoto:string})
  searchText?: string
}

type Props = OwnProps

const StartupCard: FunctionComponent<Props> = ({ startup, searchText }) => {
  const [searchTextIndex, setSearchTextIndex] = useState<number | undefined>(
    undefined
  )
  return (
    <div className="border-subtle relative flex  flex-col rounded-md border p-5">
      <div className="flex justify-center ">
        <Image
          width={300}
          height={400}
          src={startup.websitePhoto}
          alt={startup.firstName + " Logo"}
          className={cn("  rounded-md")}
        />
      </div>
      <div className="flex items-center">
        <h3 className="text-emphasis font-medium mt-1">
          {searchTextIndex != undefined && searchText ? (
            <>
              {startup.firstName.substring(0, searchTextIndex)}
              <span className="bg-yellow-300">
                {startup.firstName.substring(
                  searchTextIndex,
                  searchTextIndex + searchText.length
                )}
              </span>
              {startup.firstName.substring(searchTextIndex + searchText.length)}
            </>
          ) : (
            startup.companyName
          )}
        </h3>
      </div>
      <p
        className="text-default mt-2 grow text-sm capitalize"
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "3",
        }}
      >
        {startup.sector}
      </p>
      <div className="mt-5 flex max-w-full flex-row justify-between gap-2">
        <Startupdetails detail={startup} />
      </div>
    </div>
  )
}

export default StartupCard
