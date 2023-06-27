"use client"

import React, { FunctionComponent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/firebase/config"
import { collection, getDocs } from "firebase/firestore"
import { useSession } from "next-auth/react"

import { Input } from "@/components/ui/input"
import { FormType } from "@/components/FounderForm"
import AllStartups from "@/components/startup-page/AllStartups"

interface OwnProps {}

type Props = OwnProps

type detailType = (FormType & { image: string; websitePhoto: string })[]

const StartupPage: FunctionComponent<Props> = (props) => {
  const [collectionData, setCollectionData] = useState<detailType>([])
  const [searchText, setSearchText] = useState<string | undefined>(undefined)
  const { data: session, status } = useSession()
  const route = useRouter()
  useEffect(() => {
    if (!session) {
      route.push("/login")
    }
    const getCollection = async () => {
      const querySnapshot = await getDocs(collection(db, "founders"))
    }
  }, [route, session])
  useEffect(() => {
    const getCollection = async () => {
      const querySnapshot = await getDocs(collection(db, "founders"))
      // @ts-ignore
      const data: detailType = querySnapshot.docs.map((doc) => doc.data())
      // console.log(data);
      setCollectionData(data)
    }
    getCollection()
  }, [])
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
                Startups Page
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
                placeholder={"Search Startups"}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </header>
          <AllStartups searchText={searchText} startups={collectionData} />
        </>
      ) : (
        <div className="flex items-center justify-center text-lg font-bold">
          Loading...
        </div>
      )}
    </>
  )
}

export default StartupPage
