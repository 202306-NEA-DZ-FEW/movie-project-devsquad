import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const SingleMovie = () => {
  const router = useRouter()
  const { movieId } = router.query
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=12fef202d421a561786c57849c4afbc3`,
        )
        const data = await response.json()
        setMovie(data)
      } catch (error) {
        console.error("Error fetching movie details:", error)
      }
    }

    if (movieId) {
      fetchMovieDetails()
    }
  }, [movieId])

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <Link href="/movielist">
        <a className="text-blue-500 mb-4">Back to Movie List</a>
      </Link>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full mb-2 rounded-lg"
      />
      <h3 className="text-lg font-bold">{movie.title}</h3>
      <p className="text-gray-300">{movie.overview}</p>
      {/* Display other movie details as needed */}
    </div>
  )
}

export default SingleMovie
