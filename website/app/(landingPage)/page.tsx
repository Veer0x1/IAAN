import React from "react"
import { useSession } from "next-auth/react"

import ContactUs from "@/components/landing-page/ContactUs"
import Hero from "@/components/landing-page/Hero"
import  Footer from '@/components/Footer'
const Page = () => {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Hero />
        <ContactUs />

        <Footer/>

      </section>
    </>
  )
}

export default Page
