"use client"

import React, { FunctionComponent } from "react"
import Image from "next/image"
import defaultImage from "@/public/assests/defaultImage.png"

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

interface OwnProps {
  detail: {
    logo: string;
    name: string;
    description: string;
}[]
}

type Props = OwnProps
export const InvestorCard: FunctionComponent<Props> = (props: Props) => {
  
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {
       props.detail?.map((data,index)=>{
        return(
          <Card className="w-60 " key={index}>
          <CardContent>
            <div className="-mx-5 mt-2 flex justify-center">
              <Image
                src={defaultImage}
                alt="defaultImage"
                priority={true}
                className="h-[10rem] w-[10rem] "
              />
            </div>
            <Separator className="mt-2" />
          </CardContent>
          <CardHeader className="-mt-8">
            <CardTitle>{data.name}</CardTitle>
    
            <CardDescription>{data.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center ">
            <Button variant="outline">Send Request</Button>
          </CardFooter>
        </Card>
        )
       }) 
      }
    </div>
  )
}
