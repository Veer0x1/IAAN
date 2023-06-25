"use client"

import React, { FunctionComponent } from "react"
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
import {FormType} from "@/components/FounderForm";

interface OwnProps {}

type Props = OwnProps & {
  detail: FormType &{image: string,websitePhoto:string}
}
const Startupdetails: FunctionComponent<Props> = ({ detail }) => {
  return (
    <Dialog>
      <DialogTrigger asChild >
        <Button variant="outline" className={"px-5"} >Details</Button>
      </DialogTrigger>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {detail.firstName} {detail.lastName}
          </DialogTitle>
          <DialogDescription>Founder</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 grid-cols-1 py-4">
          <div>
            <span className="font-medium">Contact Number:</span>{" "}
            <span className="text-muted-foreground">{detail.phone}</span>
          </div>
          <div>
            <span className="font-medium">LinkedIn Id:</span>{" "}
            <span className="text-muted-foreground"> {detail.linkedIn}</span>
          </div>
          <div>
            <span className="font-medium">Email:</span>{" "}
            <span className="text-muted-foreground"> {detail.email}</span>
          </div>
          <div>
            <span className="font-medium">Sector:</span>{" "}
            <span className="text-muted-foreground"> {detail.sector}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Startupdetails
