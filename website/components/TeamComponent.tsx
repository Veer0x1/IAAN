'use-client'
import React from 'react'
import Image from "next/image"
import { ListMusic, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
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

export function TeamComponent({album, aspectRatio = "portrait", width, height, className, ...props}: TeamComponentProps) {
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
                "h-auto w-auto object-cover transition-all ease-in-out duration-500 hover:scale-110",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>

      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium">{album.name}</h3>
        <Button variant={"outline"} className="text-sm -p-y-4 transition-all ease-in-out duration-500 hover:text-blue-400">LinkedIn</Button>
      </div>
    </div>
  )
}
