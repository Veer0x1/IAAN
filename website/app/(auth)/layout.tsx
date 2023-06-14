import React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          {children}
        </section>
      </div>
    </div>
  )
}
