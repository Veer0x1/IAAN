"use-client"

import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Icons } from "@/components/icons"

export interface Album {
  name: string
  artist: string
  cover: string
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
              src={album.cover}
              alt={album.name}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all duration-500 ease-in-out hover:scale-110",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium">{album.name}</h3>
        <Button
          variant={"outline"}
          className="-p-y-4 text-sm transition-all duration-500 ease-in-out hover:text-blue-400"
        >
          <Icons.linkedin className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
