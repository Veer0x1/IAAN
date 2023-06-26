import React from 'react'
import { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Provider from "@/app/(homePage)/Provider"
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}
     async function Dashboardlayout({ children }: { children: React.ReactNode }){
  const session = await getServerSession(authOptions)
  return (
    <> <div className=" flex-col md:flex">


      <Provider session={session}>
              <main>
            {children}
            </main>
            </Provider>

  </div>
    </>
  )
}

export default Dashboardlayout
