// components/MovieCarousel.js
import { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import MovieCard from "./Card"

const MovieLoop = () => {
  const [movies, setMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await fetcher("movie/upcoming")
      setMovies(response.results)
    }

    fetchPopularMovies()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }, 6000) // Loop Changes movie every 6 seconds (adjust as needed)

    return () => {
      clearInterval(interval)
    }
  }, [movies])

  return (
    <div className="movie-card-loop">
      {movies.length > 0 && (
        <MovieCard movie={movies[currentIndex]} key={movies[currentIndex].id} />
      )}
    </div>
  )
}

export default MovieLoop
