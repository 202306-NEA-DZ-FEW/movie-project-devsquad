import React from "react"
import Footer from "@/components/Footer/Footer"
import Link from "next/link"
import { fetcher } from "@/utils/API"
import Navbar from "@/components/Navbar/Navbar"

//fetch Popular Actors data
export async function getStaticProps() {
  const popularActors = await fetcher("person/popular?language=en-US&page=1")

  return {
    props: {
      popularActors,
    },
  }
}
//pass the data fetched as props
function Actors({ popularActors }) {
  return (
    <main className="bg-gradient-to-r from-slate-600 to-slate-950 text-slate-300">
      <Navbar />
      <div
        className="container mx-auto mt-5"
        style={{ marginTop: 0, paddingTop: 20, paddingBottom: 20 }}
      >
        <h1 className="text-3xl font-semibold mb-5 bg-gradient-to-r from-sky-950 via-blue-950 to-slate-500 p-2 text-center md:text-center lg:text-center">
          POPULAR ACTORS
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {popularActors.results.map((actor) => (
            <Link key={actor.name} href={`/actors/actorId?id=${actor.id}`}>
              <div
                key={actor.name}
                className="bg-white p-4 shadow hover:scale-105 hover:shadow-lg object-cover mt-2 mb-2 rounded-md transition-all duration-500 ease-in-out cursor-pointer hover:opacity-60 bg-gradient-to-r from-sky-950 from-10% via-indigo-950 via-30% to-slate-500"
              >
                <img
                  src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}
                  alt={actor.name}
                  className="w-full h-auto rounded-md mb-2 "
                  style={{ border: "2px solid white" }}
                />
                <p className="text-lg font-semibold" style={{ color: "white" }}>
                  {actor.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Actors
