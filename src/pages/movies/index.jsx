import React from "react"
import daisyui from "daisyui"
import Link from "next/link"
import { data } from "autoprefixer"

function Actors({ popularActors }) {
  console.log(popularActors.results)

  return (
    <main style={{ backgroundColor: "#1B1B1D " }}>
      <div
        className="container mx-auto mt-5"
        style={{ backgroundColor: "#1B1B1D " }}
      >
        <h1
          className="text-3xl font-semibold mb-5"
          style={{ color: "white", textAlign: "center" }}
        >
          Popular Actors
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {popularActors.results.map((actor) => (
            <Link key={actor.name} href={`/actors/actorId?id=${actor.id}`}>
              <div key={actor.name} className="bg-white p-4 rounded shadow">
                <img
                  src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}
                  alt={actor.name}
                  className="w-full h-auto rounded-md mb-2"
                />
                <p className="text-lg font-semibold">{actor.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const url =
    "https://api.themoviedb.org/3/person/popular?language=en-US&page=1"

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmZlZjIwMmQ0MjFhNTYxNzg2YzU3ODQ5YzRhZmJjMyIsInN1YiI6IjY1MDFiNjcxNmEyMjI3MDBjM2I2YWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XJjyQmVwx0bDppP1jD0WnR_WV0eH7kBhZBRVRQFEMhQ",
    },
  }
  const response = await fetch(url, options)
  const data = await response.json()
  return {
    props: {
      popularActors: data,
    },
  }
}

export default Actors
