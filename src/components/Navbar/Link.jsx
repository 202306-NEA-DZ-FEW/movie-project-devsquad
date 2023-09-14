import React, { useState, useEffect } from "react"
import Link from "next/link"
import { fetcher } from "../../utils/API"

const Links = () => {
  const [genres, setGenres] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [movies, setMovies] = useState([])
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false)

  useEffect(() => {
    const fetchMovieGenres = async () => {
      try {
        const response = await fetcher(
          "genre/movie/list?api_key=12fef202d421a561786c57849c4afbc3",
        )
        setGenres(response.genres)
      } catch (error) {
        console.error("Error fetching movie genres:", error)
      }
    }

    fetchMovieGenres()
  }, [])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const fetchMoviesByCategory = async (category) => {
    try {
      const response = await fetcher(
        `movie/${category}?api_key=12fef202d421a561786c57849c4afbc3`,
      )
      setMovies(response.results)
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error)
    }
  }

  const toggleMoviesDropdown = () => {
    setShowMoviesDropdown(!showMoviesDropdown)
  }

  return (
    <div className="w-1/3 justify-end">
      <div className="hidden w-full justify-between md:flex space-x-20">
        <Link href="#" onClick={toggleMoviesDropdown} className="text-red-500">
          Movies
        </Link>
        <Link href="#" onClick={toggleDropdown} className="text-red-500">
          Genres
        </Link>
        <Link href="#" className="text-red-500">
          Actors
        </Link>
      </div>
      {showDropdown && (
        <div className="absolute mt-2">
          <ul className="py-2 bg-transparent">
            {genres.map((genre) => (
              <li
                key={genre.id}
                className="px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showMoviesDropdown && (
        <div className="absolute mt-2">
          <ul className="py-2 bg-transparent">
            <li
              className="px-4 py-2 hover:bg-gray-100 text-red-500"
              onClick={() => fetchMoviesByCategory("now_playing")}
            >
              Now Playing
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 text-red-500"
              onClick={() => fetchMoviesByCategory("popular")}
            >
              Popular
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 text-red-500"
              onClick={() => fetchMoviesByCategory("top_rated")}
            >
              Top Rated
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 text-red-500"
              onClick={() => fetchMoviesByCategory("upcoming")}
            >
              Upcoming
            </li>
            {/* <li
              className="px-4 py-2 hover:bg-gray-100 text-red-500"
              onClick={() => fetchMoviesByCategory("latest")}
            >
              Latest
            </li> */}
          </ul>
        </div>
      )}
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            {movie.title}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover mb-4"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Links
