import React, { FunctionComponent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import { categories } from "@/lib/startup-categories"
import CategoryTab from "@/components/startup-page/CategoryTab"
import StartupCard from "@/components/startup-page/StartupCard"

interface OwnProps {
  searchText?: string
  startups: any
}

type Props = OwnProps

const AllStartups: FunctionComponent<Props> = ({ searchText, startups }) => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [startupsContainerRef, enableAnimation] =
    useAutoAnimate<HTMLDivElement>()
  if (searchText) {
    enableAnimation && enableAnimation(false)
  }

  // useEffect(() => {
  //   const queryCategory =
  //     typeof router.query.category === "string" &&
  //     categories.includes(router.query.category)
  //       ? router.query.category
  //       : null
  //   setSelectedCategory(queryCategory)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router.query.category])

  return (
    <div className={"mt-6"}>
      <CategoryTab
        selectedCategory={selectedCategory}
        searchText={searchText}
        categories={categories}
      />
      <div
        className="grid gap-3 lg:grid-cols-4 [@media(max-width:1270px)]:grid-cols-3 [@media(max-width:500px)]:grid-cols-1 [@media(max-width:730px)]:grid-cols-1"
        ref={startupsContainerRef}
      >
        {startups.map(
          (startup: { name: string; logo: string; description: string }) => (
            <StartupCard
              key={startup.name}
              startup={startup}
              searchText={searchText}
            />
          )
        )}{" "}
      </div>
    </div>
  )
}

export default AllStartups
