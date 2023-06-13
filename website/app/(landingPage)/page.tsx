"use client"
import React from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data } = useSession();
  
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        Home {data?.user?.name}
        <img src={data?.user?.image!} />
      </section>
    </>
  );
};

export default Page;
