import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { fetcher } from "@/utils/API"
import { ActorsCard } from ".movies/[movieId]"

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const router = useRouter()
  const { genre, category } = router.query

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=12fef202d421a561786c57849c4afbc3`
        if (genre) {
          url += `&with_genres=${genre}`
        }
        if (category === "popular") {
          url =
            "https://api.themoviedb.org/3/movie/popular?api_key=12fef202d421a561786c57849c4afbc3"
        } else if (category === "top_rated") {
          url =
            "https://api.themoviedb.org/3/movie/top_rated?api_key=12fef202d421a561786c57849c4afbc3"
        } else if (category === "latest") {
          url =
            "https://api.themoviedb.org/3/movie/latest?api_key=12fef202d421a561786c57849c4afbc3"
        } else if (category === "now_playing") {
          url =
            "https://api.themoviedb.org/3/movie/now_playing?api_key=12fef202d421a561786c57849c4afbc3"
        } else if (category === "upcoming") {
          url =
            "https://api.themoviedb.org/3/movie/upcoming?api_key=12fef202d421a561786c57849c4afbc3"
        }
        const response = await fetch(url)
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
    }

    fetchMovies()
  }, [genre, category])

  return (
    <div className="bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Movie List</h1>
      <div className="grid grid-cols-5 gap-4">
        {movies?.map((movie) => (
          <div key={movie.id}>
            <ActorsCard
              actor={{
                name: movie.title,
                character: movie.overview,
                profile_path: movie.poster_path,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieList
