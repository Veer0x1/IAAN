import Image from "next/image"
import AvatarPhoto from "@/public/assests/avatar2.png"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DashboardContent() {
  return (
    <>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Rahul Kumar Sonkar</CardTitle>
          <CardDescription>Founder</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className=" grid grid-cols-1 gap-3 lg:grid-cols-10 ">
              <div className="col-span-2 grid  h-[100%] w-[120%] items-center justify-items-center border-b-2 p-4 sm:w-[110%] lg:w-[100%] lg:border-b-0 lg:border-r-2">
                <Image
                  src={AvatarPhoto}
                  alt="Profile_photo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>

              <div className="col-span-8 grid grid-cols-1 items-center justify-items-start sm:grid-cols-2 lg:grid-cols-3 ">
                <div>Gender: male</div>
                <div>Linkedin id: rahulxyz</div>

                <div>Date of birth: 23/07/1997</div>
                <div>Phone number: 6387738230</div>
                <div>Country: Indian</div>

                <div>Current location: Mughal Sarai, India</div>

                <div>Here for: Business Opportunities, Networking, Mentors</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>My Startup</CardTitle>
          <CardDescription>Invested Startup</CardDescription>
          <CardTitle>My Networks</CardTitle>
          <CardDescription>Founders</CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}
