import React from "react"
import daisyui from "daisyui"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { data } from "autoprefixer"
import Link from "next/link"

function ActorDetailsPage() {
  const router = useRouter()
  const { id } = router.query // Retrieve the actor's ID from the route
  const [actorData, setActorData] = useState(null)

  // Fetch actor data using the ID and display it
  const fetchActorData = async (actorId) => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmZlZjIwMmQ0MjFhNTYxNzg2YzU3ODQ5YzRhZmJjMyIsInN1YiI6IjY1MDFiNjcxNmEyMjI3MDBjM2I2YWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XJjyQmVwx0bDppP1jD0WnR_WV0eH7kBhZBRVRQFEMhQ",
      },
    }
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}`,
      options,
    )
    const posts = await res.json()
    setActorData(posts)
  }

  useEffect(() => {
    if (!id) return
    fetchActorData(id)
    console.log("Actor ID:", id)
  }, [id])

  // Fetch Actor related movies using the id
  const [relatedMovies, setRelatedMovies] = useState([])

  useEffect(() => {
    // Fetch related movies and set them in the state
    fetcher(id)
      .then((data) => {
        setRelatedMovies(data.cast)
      })
      .catch((error) => {
        // Handle any errors
        console.error(error)
      })
  }, [id])

  return (
    <main style={{ backgroundColor: "#35393e" }}>
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
                style={{ border: "3px solid white" }}
              />
            </div>
          </div>

          {/* Actor Information (75% of screen width) */}
          <div className="lg:w-3/4 p-4">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body flex flex-col justify-between h-full">
                <div>
                  <h2
                    className="card-title"
                    style={{ fontSize: 30, marginBottom: 10 }}
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
        style={{ marginLeft: 91, marginRight: 91, marginBottom: 20 }}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "white" }}>
          Related Movies
        </h2>
        <div className="grid lg:grid-cols-5 gap-4">
          {relatedMovies?.slice(0, 5).map((movie) => (
            <Link key={movie.name} href={`/movies/movieId?id=${movie.id}`}>
              <div
                key={movie.id}
                className="card bg-base-100 shadow-lg div-hover:hover"
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

export async function fetcher(apiRoute) {
  const url = `https://api.themoviedb.org/3/person/${apiRoute}/movie_credits`

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmZlZjIwMmQ0MjFhNTYxNzg2YzU3ODQ5YzRhZmJjMyIsInN1YiI6IjY1MDFiNjcxNmEyMjI3MDBjM2I2YWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XJjyQmVwx0bDppP1jD0WnR_WV0eH7kBhZBRVRQFEMhQ",
    },
  }
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}

export default ActorDetailsPage
