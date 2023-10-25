import React, { FunctionComponent } from "react"

import { Icons } from "@/components/icons"

interface OwnProps {}

type Props = OwnProps

const ContactUs: FunctionComponent<Props> = (props) => {
  return (
    <section
      id="contact-us"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 rounded-lg"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Contact Us
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          IIT BHU Alumni Angel Network is a joint initiative of E-Cell IIT BHU &
          IIT BHU Alumni with the motive of creating a platform for the students
          and alumni entrepreneurs of IIT BHU to network & access funding
          opportunities for their startups and raise funds from successful and
          distinguished alums of IIT BHU.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-around rounded-md p-6">
            <Icons.phone />
            <div className="space-y-2">
              <h3 className="font-bold">Phone number</h3>
              <p className="text-sm text-muted-foreground">
                <a href="tel:+919120787959">Call us at +91 9120787959</a>
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-around rounded-md p-6">
            <Icons.mail />
            <div className="space-y-2">
              <h3 className="font-bold">Email</h3>
              <p className="text-sm text-muted-foreground">
                <a href="mailto:ecell@itbhu.ac.in">
                  Send us an email at ecell@itbhu.ac.in
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-around rounded-md p-6">
            <Icons.map />
            <div className="space-y-2">
              <h3 className="font-bold">Location</h3>
              <p className="text-sm text-muted-foreground">
                <p>
                  Indian Institute of Technology (Banaras Hindu University)
                  Varanasi, India{" "}
                </p>
                <p>PIN: 221005</p>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*<div className="mx-auto text-center md:max-w-[58rem]">*/}
      {/*  <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">*/}
      {/*    Taxonomy also includes a blog and a full-featured documentation site*/}
      {/*    built using Contentlayer and MDX.*/}
      {/*  </p>*/}
      {/*</div>*/}
    </section>
  )
}

export default ContactUs
