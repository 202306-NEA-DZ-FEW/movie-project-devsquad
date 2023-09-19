import React from "react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import { fetcher } from "@/utils/API"
import MovieCard from "@/components/Cards/Movie-Card"

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
      <div className="hero bg-gradient-to-r from-slate-600 to-slate-950 text-slate-300">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={"https://image.tmdb.org/t/p/w500" + actorData?.profile_path}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="actor_image"
          />
          <div>
            <h1 className="text-5xl font-bold">{actorData?.name}</h1>
            <p className="py-6">
              Genger : {actorData?.gender === 1 ? "Female" : "Male"}
            </p>
            <p className="py-6">Popularity : {actorData?.popularity}</p>
            <p className="py-6">Biography : {actorData?.biography}</p>
          </div>
        </div>
      </div>

      {/* Related Movies*/}
      <div
        className="mt-8"
        style={{ marginLeft: 91, marginRight: 91, paddingBottom: 20 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-sky-950 to-slate-500 md:text-center lg:text-start w-full md:w-full p-1 rounded lg:w-1/3 mr-auto bg-slate-800">
          RELATED MOVIES
        </h2>
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-4">
          {relatedMovies?.slice(0, 4).map((movie) => (
            <Link key={movie.name} href={`/movies/${movie.id}`}>
              <MovieCard {...movie} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ActorDetailsPage
