import AvatarPhoto from "@/public/assests/avatar2.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import  Image  from 'next/image';
export function RecentSales() {
  return (<>
    <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Rahul Kumar Sonkar</CardTitle>
                <CardDescription>
                Founder
                </CardDescription>
              </CardHeader>
              <CardContent>
    <div className="space-y-8"> 
      <div className=" grid lg:grid-cols-10 grid-cols-1 gap-3 ">
         <div className="col-span-2 w-[120%]  sm:w-[110%] lg:w-[100%] border-b-2 lg:border-b-0 p-4 lg:border-r-2 h-[100%] grid justify-items-center items-center">
        <Image src={AvatarPhoto} alt="Profile_photo" width={100} height={100} className="rounded-full"/>
         </div>
         
         <div className="col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-start items-center ">
            <div>Gender: male</div>
           <div>Linkedin id: rahulxyz</div>

           <div>
          Date of birth: 23/07/1997
           </div>
           <div>
            Phone number: 6387738230
           </div>
            <div>Country: Indian</div>
           
           <div>Current location: Mughal Sarai, India</div>

           <div>
           Here for: Business Opportunities, Networking, Mentors
           </div>
           
         </div>

      </div>
  
    </div>
    </CardContent>
            </Card>
            <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>My Startup</CardTitle>
              <CardDescription>
              Invested Startup
              </CardDescription>
              <CardTitle>My Networks</CardTitle>
              <CardDescription>
              Founders
              </CardDescription>
            </CardHeader>
          </Card>
          </>
  )
}