"use client"

import React, { FunctionComponent, useState } from "react"
import Image from "next/image"
import defaultImage from "@/public/assests/defaultImage.png"
import { FormValues } from "@/schema/investorFormSchema"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Personaldetail from "@/components/investor-page/personalDetail"

interface OwnProps {
  detail: (FormValues & { image: string })[]
  searchName: string
}

type Props = OwnProps
export const InvestorCard: FunctionComponent<Props> = (props: Props) => {
  const [filter, setFilter] = useState<(FormValues & { image: string })[]>([])
  //   const filteredData = props.detail?.filter((data) =>
  //   data.firstName.toLowerCase().startsWith(props.searchName?.toLowerCase())
  // );
  // console.log(filter);

  React.useEffect(() => {
    if (props.searchName !== undefined) {
      const filtered = props.detail.filter((data) =>
        data.firstName.toLowerCase().startsWith(props.searchName?.toLowerCase())
      )
      setFilter(filtered)
    } else {
      setFilter(props.detail)
    }
  }, [props.searchName, props.detail])
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filter.map((data, index) => {
        return (
          <Card className="w-60 " key={index}>
            <CardContent>
              <div className="-mx-5 mt-2 flex justify-center">
                <Image
                  src={data.image ? data.image : defaultImage}
                  alt="defaultImage"
                  priority={true}
                  className="h-[10rem] w-[10rem] rounded-full"
                  width={200}
                  height={200}
                />
              </div>
              <Separator className="mt-2" />
            </CardContent>
            <CardHeader className="-mt-8">
              <CardTitle className="capitalize">
                {data.firstName} {data.lastName}
              </CardTitle>

              <CardDescription>{"Investor"}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center ">
              <Personaldetail detail={data} />
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
