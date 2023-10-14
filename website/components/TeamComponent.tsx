"use client"

import React from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Icons } from "@/components/icons"

export interface Album {
  name: string
  image: StaticImageData
  position: string
  email: string
  linkedin: string
}

interface TeamComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function TeamComponent({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: TeamComponentProps) {
  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={album.image}
              alt={album.name}
              width={width}
              height={height}
              className={cn(
                " object-cover transition-all duration-500 ease-in-out hover:scale-110",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium">{album.name.toUpperCase()}</h3>
        <Link href={album.linkedin} target={"_blank"}>
          <Button
            variant={"outline"}
            className="-p-y-4 m-2 text-sm transition-all duration-500 ease-in-out hover:text-blue-400"
          >
            <Icons.linkedin className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={album.email} target={"_blank"}>
          <Button
            variant={"outline"}
            className="-p-y-4 m-2 text-sm transition-all duration-500 ease-in-out hover:text-red-400"
          >
            <Icons.mail className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
