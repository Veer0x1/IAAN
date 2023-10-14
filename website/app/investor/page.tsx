"use client"

import React, { FunctionComponent, useState } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/firebase/config"
import { FormValues } from "@/schema/investorFormSchema"
import { collection, getDocs } from "firebase/firestore"
import { useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InvestorCard } from "@/components/investor-page/investorCard"

interface OwnProps {}

type Props = OwnProps
type detailSchema = FormValues & { image: string }
const InvestorPage: FunctionComponent<Props> = (props) => {
  const [searchText, setSearchText] = useState<string>("")
  const [collectionData, setCollectionData] = useState<detailSchema[]>([])
  const { data: session, status } = useSession()
  const route = useRouter()
  React.useEffect(() => {
    const fetchCollectionData = async () => {
      const collectionRef = collection(db, "investors")
      const querySnapshot = await getDocs(collectionRef)
      const data: detailSchema[] = querySnapshot.docs.map(
        (doc) => doc.data() as detailSchema
      )
      setCollectionData(data)
    }

    fetchCollectionData()
    if (!session) {
      route.push("/login")
    }
  }, [route, session])
  return (
    <>
      {session?.user && status === "authenticated" ? (
        <>
          <header className={"flex w-full max-w-full items-center truncate"}>
            <div
              className={
                "hidden w-full truncate ltr:mr-4 rtl:ml-4 sm:hidden md:block lg:block"
              }
            >
              <h3
                className={
                  "max-w-28 sm:max-w-72 md:max-w-80 text-emphasis hidden truncate text-xl font-semibold sm:text-xl md:block xl:max-w-full"
                }
              >
                Investor Page
              </h3>
              <p className={"text-default hidden text-sm md:block"}>
                Connecting people, technology and the workplace.
              </p>
            </div>
            <div
              className={
                "flex w-full flex-col pr-2 pt-4 md:flex-row md:justify-between md:pt-0 lg:w-auto"
              }
            >
              <Input
                type={"search"}
                placeholder={"Search Investor"}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </header>

          <div
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-emphasis my-4 max-w-max text-lg font-medium"
            )}
          >
            All Investors
          </div>
          <InvestorCard detail={collectionData} searchName={searchText} />
        </>
      ) : (
        <div className="flex items-center justify-center text-lg font-bold">
          Loading...
        </div>
      )}
    </>
  )
}

export default InvestorPage
