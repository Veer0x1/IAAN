import React from "react"
import { useSession } from "next-auth/react"
import {TeamComponent} from "@/components/TeamComponent";
export interface Album {
  name: string
  artist: string
  cover: string
}

const listenNowAlbums: Album[] = [
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
]

const Page = () => {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
           <h1 className={"justify-center flex text-[3rem] -mt-10"}>Meet The Team</h1>
        <div className="flex flex-wrap justify-center ">
          {listenNowAlbums.map((album) => (
            <TeamComponent
              key={album.name}
              album={album}
              className="w-[200px] m-4"
              aspectRatio="portrait"
              width={200}
              height={150}
            />
          ))}
          {listenNowAlbums.map((album) => (
            <TeamComponent
              key={album.name}
              album={album}
              className="w-[200px] m-4"
              aspectRatio="portrait"
              width={200}
              height={150}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Page
