"use client"

import React, { FunctionComponent } from "react"
import { FormValues } from "@/schema/investorFormSchema"
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

type detailType = FormValues & { image: string }
interface OwnProps {}

type Props = OwnProps & {
  detail: detailType
}
const Personaldetail: FunctionComponent<Props> = ({ detail }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {detail.firstName} {detail.lastName}
          </DialogTitle>
          <DialogDescription>Investor</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 grid-cols-1 py-4">
          <div>
            <span className="font-medium">Contact Number:</span>{" "}
            <span className="text-muted-foreground">{detail.phone}</span>
          </div>
          <div>
          <Link href={detail.linkedIn} target="_blank" >
            <span className="font-medium">LinkedIn Id:</span>{" "}
            <span className="text-muted-foreground"> {detail.linkedIn}</span>
            </Link>
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
export default Personaldetail
