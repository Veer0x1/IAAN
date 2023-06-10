"use client"

import React, { FunctionComponent, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface OwnProps {
  startup: any
  searchText?: string
}

type Props = OwnProps

const StartupCard: FunctionComponent<Props> = ({ startup, searchText }) => {
  const [searchTextIndex, setSearchTextIndex] = useState<number | undefined>(
    undefined
  )
  return (
    <div className="border-subtle relative flex h-64 flex-col rounded-md border p-5">
      <div className="flex">
        <Image
          width={48}
          height={48}
          src={startup.logo}
          alt={startup.name + " Logo"}
          className={cn("mb-4 h-12 w-12 rounded-sm")}
        />
      </div>
      <div className="flex items-center">
        <h3 className="text-emphasis font-medium">
          {searchTextIndex != undefined && searchText ? (
            <>
              {startup.name.substring(0, searchTextIndex)}
              <span className="bg-yellow-300">
                {startup.name.substring(
                  searchTextIndex,
                  searchTextIndex + searchText.length
                )}
              </span>
              {startup.name.substring(searchTextIndex + searchText.length)}
            </>
          ) : (
            startup.name
          )}
        </h3>
      </div>
      <p
        className="text-default mt-2 grow text-sm"
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "3",
        }}
      >
        {startup.description}
      </p>
      <div className="mt-5 flex max-w-full flex-row justify-between gap-2">
        <Button variant={"outline"} className={"w-full"}>
          details
        </Button>
      </div>
    </div>
  )
}

export default StartupCard
