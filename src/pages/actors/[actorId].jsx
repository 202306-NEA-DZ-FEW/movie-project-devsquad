import React from "react"
import daisyui from "daisyui"
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
    <main style={{ backgroundImage: "url(/imageBackground.jpg)" }}>
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
                className="w-full h-full object-cover"
                style={{ border: "2px solid white" }}
              />
            </div>
          </div>

          {/* Actor Information (75% of screen width) */}
          <div className="lg:w-3/4 p-4">
            <div
              className="card bg-base-100 shadow-lg"
              style={{ backgroundColor: "transparent" }}
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
                  <p> </p>
                  <h2 className="card-title">Gender</h2>
                  <p>{actorData?.gender === 1 ? "Female" : "Male"}</p>
                  <h2 className="card-title">Popularity</h2>
                  <p>{actorData?.popularity}</p>
                  <h2 className="card-title">Birthday</h2>
                  <p>{actorData?.birthday}</p>
                  <h2 className="card-title">Biography</h2>
                  <p>{actorData?.biography}</p>
                </div>
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
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "white" }}>
          Related Movies
        </h2>
        <div className="grid lg:grid-cols-5 gap-4">
          {relatedMovies?.slice(0, 5).map((movie) => (
            <Link key={movie.name} href={`/movies/movieId?id=${movie.id}`}>
              <div
                key={movie.id}
                className="card bg-base-100 shadow-lg hover:scale-105 hover:shadow-lg object-cover mt-2 mb-2 rounded-md transition-all duration-500 ease-in-out cursor-pointer hover:opacity-60"
                style={{
                  backgroundImage: "url(/imageBackground.jpg)",
                  border: "2px solid white",
                }}
              >
                <div className="card-body">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "white" }}
                  >
                    {movie.title}
                  </h3>
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt="movie"
                  />
                  <p className="mt-2" style={{ color: "white" }}>
                    Release Year:{" "}
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
