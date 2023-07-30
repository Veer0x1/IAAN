import React from "react"
import { StaticImageData } from "next/image"
import abhirvey from "@/public/team/2023-2024/Abhirvey.jpeg"
import atharv from "@/public/team/2023-2024/Atharv.jpg"
import Indrajeet from "@/public/team/2023-2024/Indrajeet.jpg"
import mridul from "@/public/team/2023-2024/Mridul.jpg"
import muskan from "@/public/team/2023-2024/Muskan_Aggarwal.png"
import pranjali from "@/public/team/2023-2024/Pranjali.jpg"
import sanskar from "@/public/team/2023-2024/Sanskar.jpg"
import vanishka from "@/public/team/2023-2024/Vanshika.jpg"
import Varun from "@/public/team/2023-2024/Varun.jpg"
import akshat from "@/public/team/2023-2024/akshat.png"
import balveer from "@/public/team/2023-2024/balveer.jpeg"
import om from "@/public/team/2023-2024/om.png"
import parth from "@/public/team/2023-2024/parth.jpeg"
import rahul from "@/public/team/2023-2024/rahul.jpeg"
import rishav from "@/public/team/2023-2024/rishav.jpeg"
import sahil from "@/public/team/2023-2024/sahil.jpeg"
import sameer from "@/public/team/2023-2024/sameer.jpg"
import shailesh from "@/public/team/2023-2024/shailesh.jpg"

import { TeamComponent } from "@/components/TeamComponent"

export interface Album {
  name: string
  image: StaticImageData
  position: string
  email: string
  linkedin: string
}

const listenNowAlbums: Album[] = [
  {
    name: "PARTH GUPTA",
    image: parth,
    position: "VICE PRESIDENT E-CELL",
    email: "mailto:parthsanjeev.gupta.che20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/parthgupta03/",
  },
  {
    name: "VANSHIKA GUPTA",
    image: vanishka,
    position: "ASSOCIATE VICE PRESIDENT E-CELL",
    email: "mailto:vanshika.gupta.met20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/vanshikagupta13",
  },
  {
    name: "Atharv Patil",
    image: atharv,
    position: "STARTUP ASSISTANCE PROGRAM HEAD",
    email: "mailto:atharv.patil.che21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/atharv-patil/",
  },
  {
    name: "Mridul Ramakrishnan",
    image: mridul,
    position: "STARTUP ASSISTANCE PROGRAM HEAD",
    email: "mailto:mridul.ramakrishnan.mat21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/mridul-ramakrishnan-267401229/",
  },
  {
    name: "Shailesh Agarwal",
    image: shailesh,
    position: "INNOVATION & INCUBATION HEAD",
    email: "mailto:shailesh.agarwal.eee21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/mridul-ramakrishnan-267401229/",
  },
  {
    name: "ABHIRVEY IYER",
    image: abhirvey,
    position: "STRATEGIC RELATIONS HEAD",
    email: "mailto:abhirvey.rajeshiyer.phe21@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/abhirveyiyer27/",
  },
  {
    name: "Varun Barve",
    image: Varun,
    position: "PUBLIC RELATION HEAD",
    email: "mailto:barvevarun.makarand.cd.mst21@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/varunbarvem",
  },
  {
    name: "Rishav Thakur",
    image: rishav,
    position: "MARKETING HEAD",
    email: "mailto:rishav.thakur.cer21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/rishav-thakur-23b290199",
  },
  {
    name: "Pranjali Yadav",
    image: pranjali,
    position: "EVENTS HEAD",
    email: "mailto:pranjali.yadav.cd.mec21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/pranjali-yadav-39583022b",
  },
  {
    name: "Akshat Shah",
    image: akshat,
    position: "EVENTS HEAD",
    email: "mailto:sakshat.kalpeshbhai.mst21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/akshat-shah-639b46223",
  },
  {
    name: "Sahil Gupta",
    image: sahil,
    position: "PUBLICITY HEAD",
    email: "mailto:sahil.sgupta.cer21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/sahil-gupta-87268a23a",
  },
  {
    name: "Om Subham Pati",
    image: om,
    position: "BRANDING HEAD",
    email: "mailto:omsubham.pati.cse21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/om-subham-pati-a49785242/",
  },
  {
    name: "Muskan Aggarwal",
    image: muskan,
    position: "DESIGN HEAD",
    email: "mailto:muskan.aggarwal.min21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/muskan-aggarwal-3bba63238",
  },
  {
    name: "Indrajeet Gupta",
    image: Indrajeet,
    position: "CONTENT HEAD",
    email: "mailto:indrajeet.gupta.min21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/indrajeet-gupta-0a5b25209",
  },
  {
    name: "Balveer Singh Rao",
    image: balveer,
    position: "TECH HEAD",
    email: "mailto:balveer.singhrao.eee21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/balveer-singh-rao-636449229/",
  },
  {
    name: "Rahul Kumar Sonkar",
    image: rahul,
    position: "TECH HEAD",
    email: "mailto:rahul.kumarsonkar.eee21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/rahul-kumar-sonkar-262442253/",
  },

  {
    name: "Sameer Sharma",
    image: sameer,
    position: "HOSPITALITY HEAD",
    email: "mailto:sameer.sharma.che21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/sameer-sharma-9720a022a",
  },
  {
    name: "Sanskar Pandey",
    image: sanskar,
    position: "PARLIAMENT REPRESENTATIVE",
    email: "mailto:sanskar.pandey.civ22@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/sanskar-pandey-12687825b",
  },
]

const Page = () => {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className={"-mt-10 flex justify-center text-[3rem]"}>
          Meet The Team
        </h1>
        <div className="flex flex-wrap justify-center ">
          {listenNowAlbums.map((album) => (
            <TeamComponent
              key={album.name}
              album={album}
              className="m-4 w-[200px]"
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
