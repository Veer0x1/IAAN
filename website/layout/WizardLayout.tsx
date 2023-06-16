"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { noop } from "lodash"

import { StepCard, Steps } from "@/components/form"

export default function WizardLayout({
  children,
  maxSteps = 2,
  currentStep = 0,
}: {
  children: React.ReactNode
} & { maxSteps?: number; currentStep?: number }) {
  const [meta, setMeta] = useState({ title: "", subtitle: " " })
  const pathname = usePathname()
  const { title, subtitle } = meta

  useEffect(() => {
    setMeta({
      title: window.document.title,
      subtitle:
        window.document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") || "",
    })
  }, [pathname])

  return (
    <div className="text-emphasis flex min-h-screen w-full flex-1 flex-col items-center justify-center px-20 dark:bg-foreground dark:text-foreground">
      <div></div>
      <div className="mx-auto px-4 py-24">
        <div className="relative">
          <div className="sm:mx-auto sm:w-full sm:max-w-[600px]">
            <div className="mx-auto sm:max-w-[520px]">
              <header>
                <p className="font-cal mb-3 text-[28px] font-medium leading-7">
                  {title}&nbsp;
                </p>
                <p className="text-subtle font-sans text-sm font-normal">
                  {subtitle}&nbsp;
                </p>
              </header>
              <Steps
                maxSteps={maxSteps}
                currentStep={currentStep}
                navigateToStep={noop}
              />
            </div>
            <StepCard>{children}</StepCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getLayout = (page: React.ReactElement) => (
  <WizardLayout>{page}</WizardLayout>
)
