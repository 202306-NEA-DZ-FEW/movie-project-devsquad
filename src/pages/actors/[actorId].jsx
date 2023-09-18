import React from "react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import { fetcher } from "@/utils/API"

function ActorDetailsPage() {
  // Retrieve the actor's ID from the route
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return
    getActorData(id)
    getRelatedMovies(id)
  }, [id])

  // useState for actorData
  const [actorData, setActorData] = useState(null)

  // Fetch actor data using the ID and display it
  async function getActorData(actorId) {
    const fetchActorData = await fetcher(`person/${actorId}`)
    setActorData(fetchActorData)
  }

  // useState for relatedMovies
  const [relatedMovies, setRelatedMovies] = useState([])

  // Fetch Actor related movies using the id
  async function getRelatedMovies(actorId) {
    const actorRelatedMovies = await fetcher(`person/${actorId}/movie_credits`)
    setRelatedMovies(actorRelatedMovies.cast)
  }

  return (
    <main className="bg-gradient-to-r from-slate-600 to-slate-950 text-slate-300">
      <div className="container mx-auto p-4">
        <div className="lg:flex">
          {/* Actor Image (25% of screen width) */}
          <div className="lg:w-1/4 lg:flex-shrink-0">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={
                  "https://image.tmdb.org/t/p/w500" + actorData?.profile_path
                }
                alt="Actor Image"
                className="w-full h-3/4 rounded object-cover"
                style={{ border: "2px solid white" }}
              />
            </div>
          </div>

          {/* Actor Information (75% of screen width) */}
          <div className="lg:w-3/4 p-4">
            <div
              className="card h-full bg-base-100 shadow-lg"
              style={{ backgroundColor: "#202025" }}
            >
              <div
                className="card-body flex flex-col justify-between h-full"
                style={{ color: "white" }}
              >
                <div>
                  <h2
                    className="card-title"
                    style={{ fontSize: 50, marginBottom: 20 }}
                  >
                    {actorData?.name}
                  </h2>

                  <h2 className="card-title">Gender</h2>
                  <p>{actorData?.gender === 1 ? "Female" : "Male"}</p>

                  <h2 className="card-title">Popularity</h2>
                  <p>{actorData?.popularity}</p>

                  <h2 className="card-title">Birthday</h2>
                  <p>{actorData?.birthday}</p>

                  <h2 className="card-title">Biography</h2>
                  <p>{actorData?.biography}</p>
                </div>
                {/* Any additional content can be added here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Movies*/}
      <div
        className="mt-8"
        style={{ marginLeft: 91, marginRight: 91, paddingBottom: 20 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-center lg:text-start w-full md:w-full p-1 rounded lg:w-1/3 mr-auto bg-slate-800">
          Related Movies
        </h2>
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-4">
          {relatedMovies?.slice(0, 4).map((movie) => (
            <Link key={movie.name} href={`/movies/${movie.id}`}>
              <div
                key={movie.id}
                className="card h-full bg-base-100 shadow-lg hover:scale-105 hover:shadow-lg object-cover mt-2 mb-2 rounded-md transition-all duration-500 ease-in-out cursor-pointer hover:opacity-60 bg-gradient-to-r from-sky-950 via-blue-950 to-slate-500"
                style={{ border: "2px solid white" }}
              >
                <div className="card-body">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt="movie"
                    className="rounded h-3/4"
                  />
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "white" }}
                  >
                    {movie.title}
                  </h3>

                  <p className="mt-2" style={{ color: "white" }}>
                    Release Year :
                  </p>

                  <p style={{ color: "white" }}>{movie.release_date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ActorDetailsPage
