"use client"

import React, { FunctionComponent } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormType } from "@/components/FounderForm"

interface OwnProps {}

type Props = OwnProps & {
  detail: FormType & { image: string; websitePhoto: string }
}
const Startupdetails: FunctionComponent<Props> = ({ detail }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={"px-5"}>
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <Link href={detail.websiteName} target="_blank">
          <DialogHeader>
            <DialogTitle className="capitalize">
              {detail.firstName} {detail.lastName}
            </DialogTitle>
            <DialogDescription>
              Founder of {detail.companyName}
            </DialogDescription>
            <DialogDescription> {detail.comDescription}</DialogDescription>
          </DialogHeader>
        </Link>
        <div className="grid grid-cols-1 gap-2 py-4">
          <div>
            <span className="font-medium">Contact Number:</span>
            <span className="text-muted-foreground">{detail.phone}</span>
          </div>
          <div>
            <Link href={detail.linkedIn} target="_blank">
              <span className="font-medium">LinkedIn Id:</span>
              <span className="text-muted-foreground"> {detail.linkedIn}</span>
            </Link>
          </div>
          <div>
            <span className="font-medium">Email:</span>
            <span className="text-muted-foreground"> {detail.email}</span>
          </div>
          <div>
            <span className="font-medium">Sector:</span>
            <span className="text-muted-foreground"> {detail.sector}</span>
          </div>
          <div>
            <Link href={detail.websiteName} target="_blank">
              <Button variant="outline" className="texr-base mt-4">
                {" "}
                Visit Website
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Startupdetails
