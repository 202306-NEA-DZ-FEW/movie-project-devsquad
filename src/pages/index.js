import Image from "next/image"
import MovieLoop from "@/components/Card/Loop"
import Navbar from "@/components/Navbar/Navbar"
import SmallCard from "@/components/Card/Small-Card"
import SideCard from "@/components/Card/Side-Card"
export default function Home() {
  return (
    <>
      <Navbar />
      <MovieLoop />
      <div className="trending-section mt-4 grid grid-rows-1 gap-6">
        <h1 className="text-center text-3xl mt-4">Trending Movies</h1>
        <div className="grid grid-cols-2   gap-4 md:grid-cols-3">
          <SmallCard />
          <SmallCard />
          <SmallCard />
        </div>
      </div>
      <h1 className="text-start text-3xl mt-20 mb-8">Latest Movies</h1>
      <div className="latest-section mt-4 grid grid-cols-3 gap-6">
        <div className="grid col-span-2 gap-4 md:grid-cols-4">
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
        </div>
        <div className="side-movies grid grid-cols-1 h-1/2 gap-3">
          <SideCard />
          <SideCard />
          <SideCard />
          <SideCard />
        </div>
      </div>
    </>
  )
}
