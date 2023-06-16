import Head from "next/head"

function InvestorFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Join as a Investor</title>
        <meta name="description" content={"Be a investor"} />
      </Head>
      {children}
    </>
  )
}

export default InvestorFormLayout
