import React, { useEffect, useRef, useState, type UIEvent } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function useShouldShowArrows() {
  const ref = useRef<HTMLUListElement>(null)
  const [showArrowScroll, setShowArrowScroll] = useState({
    left: false,
    right: false,
  })

  useEffect(() => {
    const appCategoryList = ref.current
    if (
      appCategoryList &&
      appCategoryList.scrollWidth > appCategoryList.clientWidth
    ) {
      setShowArrowScroll({ left: false, right: true })
    }
  }, [])

  const calculateScroll = (e: UIEvent<HTMLUListElement>) => {
    setShowArrowScroll({
      left: e.currentTarget.scrollLeft > 0,
      right:
        Math.floor(e.currentTarget.scrollWidth) -
          Math.floor(e.currentTarget.offsetWidth) !==
        Math.floor(e.currentTarget.scrollLeft),
    })
  }

  return {
    ref,
    calculateScroll,
    leftVisible: showArrowScroll.left,
    rightVisible: showArrowScroll.right,
  }
}

interface CategoryTabProps {
  selectedCategory: string | null
  categories: string[]
  searchText?: string
  setSectorFilter: React.Dispatch<React.SetStateAction<string>>
}
export default function CategoryTab({
  selectedCategory,
  categories,
  searchText,
  setSectorFilter,
}: CategoryTabProps) {
  const [value, setValue] = useState<string>("")
  const router = useRouter()
  const { ref, calculateScroll, leftVisible, rightVisible } =
    useShouldShowArrows()
  const handleLeft = () => {
    if (ref.current) {
      ref.current.scrollLeft -= 100
    }
  }

  const handleRight = () => {
    if (ref.current) {
      ref.current.scrollLeft += 100
    }
  }
  useEffect(() => {
    if (value != undefined) {
      setSectorFilter(value)
    }
  }, [value, setSectorFilter])
  return (
    <div className="relative mb-4 flex flex-col justify-between lg:flex-row lg:items-center">
      <h2 className="text-emphasis hidden text-base font-semibold leading-none sm:block">
        {searchText
          ? "search"
          : (selectedCategory &&
              selectedCategory[0].toUpperCase() + selectedCategory.slice(1)) ||
            "All Startups"}
      </h2>
      {leftVisible && (
        <button
          onClick={handleLeft}
          className="absolute bottom-0 flex md:-top-1 md:left-1/2"
        >
          <div className="flex h-12 w-5 items-center justify-end bg-background">
            <ChevronLeft className="text-subtle h-4 w-4" />
          </div>
          <div className="to-default flex h-12 w-5 bg-gradient-to-l from-transparent" />
        </button>
      )}
      <ul
        className="no-scrollbar mt-3 flex max-w-full space-x-1 overflow-x-auto  lg:mt-0 lg:max-w-[50%]"
        onScroll={(e) => calculateScroll(e)}
        ref={ref}
      >
        <li
          onClick={() => {
            //   router.replace(router.asPath.split("?")[0], undefined, {
            //     shallow: true,
            //   })
            setValue("")
          }}
          className={cn(
            selectedCategory === null
              ? "bg-emphasis text-default"
              : "text-emphasis bg-muted",
            "hover:bg-emphasis min-w-max rounded-md px-4 py-2.5 text-sm font-medium hover:cursor-pointer"
          )}
        >
          {"All Startups"}
        </li>
        {categories.map((cat, pos) => (
          <li
            key={pos}
            onClick={() => {
              //   if (selectedCategory === cat) {
              //     router.replace(router.asPath.split("?")[0], undefined, {
              //       shallow: true,
              //     })
              //   } else {
              //     router.replace(
              //       router.asPath.split("?")[0] + `?category=${cat}`,
              //       undefined,
              //       {
              //         shallow: true,
              //       }
              //     )
              //   }
              value == cat ? setValue("") : setValue(cat)
            }}
            className={cn(
              value == undefined
                ? "bg-emphasis text-default"
                : "text-emphasis hover:bg-emphasis bg-muted",
              "hover:bg-emphasis whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium hover:cursor-pointer"
            )}
          >
            {cat[0].toUpperCase() + cat.slice(1)}
          </li>
        ))}
      </ul>
      {rightVisible && (
        <button
          onClick={handleRight}
          className="absolute bottom-0 right-0 flex md:-top-1"
        >
          <div className="to-default flex h-12 w-5 bg-gradient-to-r from-transparent" />
          <div className="flex h-12 w-5 items-center justify-end bg-background">
            <ChevronRight className="text-subtle h-4 w-4" />
          </div>
        </button>
      )}
    </div>
  )
}
