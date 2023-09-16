import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { fetcher } from "@/utils/API"

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
        if (category) {
          url += `&sort_by=${category}`
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
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList
