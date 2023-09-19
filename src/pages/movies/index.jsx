import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Navbar from "@/components/Navbar/Navbar"
import MovieCard from "@/components/Cards/Movie-Card"
import Link from "next/link"
import Footer from "@/components/Footer/Footer"

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const router = useRouter()
  const { genre, category, title } = router.query

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
  const getMovieListHeading = () => {
    if (genre) {
      return `${title}`
    } else if (category) {
      return `${category}`
    } else {
      return "Movie List"
    }
  }

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <h1 className="text-4xl font-bold mb-4">{getMovieListHeading()}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies?.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-2 rounded-lg">
            <Link href={`/movies/${movie.id}`}>
              <MovieCard
                title={movie.title}
                release_date={movie.release_date}
                overview={movie.overview}
                popularity={movie.popularity}
                poster_path={movie.poster_path}
              />
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default MovieList
