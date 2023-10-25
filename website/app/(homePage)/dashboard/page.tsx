"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { db } from "@/firebase/config"
import { FormValues } from "@/schema/investorFormSchema"
import { collection, getDocs, query, where } from "firebase/firestore"
import {  Users,IndianRupee } from "lucide-react"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormType } from "@/components/FounderForm"
import { DashboardContent } from "@/components/dashboard_component/dashboardContent"
type CombinedType =FormType | FormValues
type Propdata = CombinedType & { here: string,commitment:string,companyName:string,comDescription:string}

const Page = () => {
  const [fetchData, setFetchData] = React.useState<Propdata>({} as Propdata)
  const { data: session, status } = useSession()
  const route = useRouter()
  React.useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const querySnapshot1 = await getDocs(
          query(
            collection(db, "founders"),
            where("email", "==", session?.user?.email)
          )
        )
        const querySnapshot2 = await getDocs(
          query(
            collection(db, "investors"),
            where("email", "==", session?.user?.email)
          )
        )
        if (!querySnapshot1.empty) {
          const datafetch = querySnapshot1.docs[0].data()
          setFetchData({ ...datafetch, here: "Founder" } as Propdata)
        } else if (!querySnapshot2.empty) {
          const datafetch = querySnapshot2.docs[0].data()
          setFetchData({ ...datafetch, here: "Investor" } as Propdata)
        } else setFetchData({} as Propdata)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchDataAsync()
    if (!session) {
      route.push("/login")
    }
  }, [route, session])
  return (
    <>
      {session?.user &&
      status === "authenticated" &&
      Object.keys(fetchData).length > 0 ? (
        <>
          <section>
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              </div>
              <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="add_info">Add more info</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <DashboardContent personData={fetchData} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {fetchData.here==="Investor"?<Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Commitment Amount
                        </CardTitle>
                        <IndianRupee className="h-4 w-4 text-muted-foreground"/>
                      </CardHeader>
                      <CardContent>
                        <div className=" flex items-center text-2xl font-bold "><IndianRupee className="flex h-5 w-4 "/><div>{fetchData.commitment}</div></div>
                      </CardContent>
                    </Card>:<></>}

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Number of Investment
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">+2</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </>
      ) : (
        <div className="flex  flex-col border-subtle rounded-md border p-5 m-4">
          <div className=" flex items-center justify-center">
            <Skeleton className="h-full w-full  m-2 p-10 " />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-2 w-[150px] m-2" />
            <Skeleton className="h-2 w-[100px] m-2" />
          </div>
        </div>
      )}
    </>
  )
}

export default Page
