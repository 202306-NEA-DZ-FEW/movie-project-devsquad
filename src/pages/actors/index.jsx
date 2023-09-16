import React from "react"
import daisyui from "daisyui"
import Link from "next/link"
import { fetcher } from "@/utils/API"

export async function getStaticProps() {
  const popularActors = await fetcher("person/popular?language=en-US&page=1") // Call the fetcher function with the API route

  return {
    props: {
      popularActors,
    },
  }
}

function Actors({ popularActors }) {
  return (
    <main style={{ backgroundColor: "#35393e" }}>
      <div
        className="container mx-auto mt-5"
        style={{ marginTop: 0, paddingTop: 20 }}
      >
        <h1
          className="text-3xl font-semibold mb-5"
          style={{ color: "white", textAlign: "center", fontSize: 40 }}
        >
          Popular Actors
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {popularActors.results.map((actor) => (
            <Link key={actor.name} href={`/actors/actorId?id=${actor.id}`}>
              <div
                key={actor.name}
                className="bg-white p-4 rounded shadow"
                style={{ backgroundImage: "url(/imageBackground.jpg)" }}
              >
                <img
                  src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}
                  alt={actor.name}
                  className="w-full h-auto rounded-md mb-2"
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
    </main>
  )
}

export default Actors
