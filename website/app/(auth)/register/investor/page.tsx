"use client"
import React, { FunctionComponent } from "react"

import InvestorForm from "@/components/InvestorForm"

interface OwnProps {}

type Props = OwnProps

const page: FunctionComponent<Props> = () => {
  return (
    <>
      <InvestorForm />
    </>
  )
}

export default page
