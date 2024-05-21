"use client"

import React, { FunctionComponent } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import AvatarPhoto from "@/public/assests/avatar2.png"
import { FormValues } from "@/schema/investorFormSchema"
import { useSession } from "next-auth/react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormType } from "@/components/FounderForm"

type DetailForm = FormType | FormValues
type PropType = DetailForm & { here: string ,companyName:string,comDescription:string}
interface OwnProps {}
type CombinedType =FormType | FormValues
type Props = OwnProps & {
  personData: CombinedType & { here: string ,companyName:string,comDescription:string}

}
export const DashboardContent: FunctionComponent<Props> = ({ personData }) => {
  const { data: session, status } = useSession()
  const route = useRouter()
  React.useEffect(() => {
    if (!session) {
      route.push("/login")
    }
  }, [route, session])
  // console.log(session?.user?.name);
  const imageUrl = session?.user?.image
  return (
    <>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>
            <span className="capitalize">{personData.firstName}</span>{" "}
            <span className="capitalize">{personData.lastName}</span>
          </CardTitle>
          <CardDescription>{personData.here}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className=" grid grid-cols-1 gap-3 lg:grid-cols-10 ">
              <div className="col-span-2 grid  h-[100%] w-[120%] items-center justify-items-center border-b-2 p-4 sm:w-[110%] lg:w-[100%] lg:border-b-0 lg:border-r-2">
                <Image
                  src={imageUrl ? imageUrl : AvatarPhoto}
                  alt="Profile_photo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>

              <div className="col-span-8 grid grid-cols-1 items-center  justify-items-start sm:grid-cols-2 lg:grid-cols-2 ">
                <div className="hyphens-auto break-words">
                  Gender: {personData.gender}
                </div>
               <Link href={personData.linkedIn} target="_blank" > <div>Linkedin id:{personData.linkedIn}</div></Link>
                <div>Phone number: {personData.phone}</div>
                <div>Country: {personData.country}</div>
                <div>Sector: {personData.sector}</div>
                <div>Email: {personData.email}</div>
                <div>Here for: {personData.here}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {personData.here == "Founder" && <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>My Startup</CardTitle>
          <CardDescription>{personData.companyName}</CardDescription>
          <CardDescription>{personData.comDescription}</CardDescription>
        </CardHeader>
      </Card>}
    </>
  )
}
