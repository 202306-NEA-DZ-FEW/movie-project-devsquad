import MovieLoop from "@/components/Cards/Loop"
import MovieCard from "@/components/Cards/Movie-Card"
import SideCard from "@/components/Cards/Side-Card"
import Navbar from "@/components/Navbar/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <MovieLoop />
      <h1 className="text-center text-3xl mt-8 mb-8">Trending Movies</h1>
      <div className="trending-section mt-4 grid grid-rows-1 gap-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </div>
      <h1 className=" w-full text-center md:w-full md:text-center lg:w-3/4 lg:text-end text-3xl mt-20 mb-8 bg-primary">
        Latest Movies
      </h1>
      <div className="latest-section mt-4 grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 col-span-4 md:col-span-4 lg:col-span-3 gap-4">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
        <div className="side-movies col-span-4 md:col-span-4 lg:col-span-1 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 h-1/2 gap-3">
          <h1 className="text-center md:text-center lg:text-start text-3xl mb-8">
            Upcoming Movies
          </h1>
          <SideCard />
          <SideCard />
          <SideCard />
          <SideCard />
        </div>
      </div>
    </>
  )
}
