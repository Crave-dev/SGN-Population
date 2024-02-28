import { redirect } from "next/navigation";
import Information from "./_components/information";

import './globals.css'
import { minMax } from "./lib/config";

export default function Home(props: { searchParams: Record<string, string>}) {
  const params = new URLSearchParams(props?.searchParams)

  if (!params.has('year')) {
    const params = new URLSearchParams([['year', minMax[0]?.toString()]])
    redirect(`?${params.toString()}`)
  }

  return (
    <main style={{
      width: '100vw',
      height: '100dvh',
      backgroundColor: 'white'
    }}>
      <h1 style={{ marginLeft: 50, fontWeight: 'bold', fontSize: '2rem' }}>{`Population growth per country, ${minMax[0]} - ${minMax[1]}`}</h1>
      <h2 style={{ marginLeft: 50, fontWeight: 400, fontSize: '1.5rem' }}>Click on the legend below to filter by continent</h2>
      <Information style={{ marginLeft: 50, marginTop: '1rem' }} />
    </main>
  );
}
