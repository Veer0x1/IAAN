"use client"

import React, { FunctionComponent, useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FormType } from "@/components/FounderForm"
import Startupdetails from "@/components/startup-page/Startupdetails"

interface OwnProps {
  startup: FormType & { image: string; websitePhoto: string }
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
        {startup.websitePhoto.length>0? <Image
          width={300}
          height={200}
          src={startup.websitePhoto}
          alt={startup.firstName + " Logo"}
          className={cn("h-[10rem] rounded-md")}
        />:<div><Skeleton className=" w-[300px] h-[200px]  p-10 m-2" /></div>}
      </div>
      <div className="flex items-center">
        <h3 className="text-emphasis mt-1 font-medium">
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
         {startup.mentorship &&  <Button variant="outline" className={"px-5"} >Mentorship required</Button>}
      </div>
    </div>
  )
}

export default StartupCard
