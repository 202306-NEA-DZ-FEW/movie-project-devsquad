import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [movies, setMovies] = useState([])
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Fetch movies data based on the selected category
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedCategory}?api_key=12fef202d421a561786c57849c4afbc3`,
        )
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
    }

    if (selectedCategory) {
      fetchMovies()
    }
  }, [selectedCategory])

  const handleCategoryChange = (category) => {
    // Update the selected category
    setSelectedCategory(category)
    // Navigate to the MovieList page with the selected category as a query parameter
    router.push(`/movies?category=${category}`)
  }

  const toggleMoviesDropdown = () => {
    // Toggle the state of the movies dropdown
    setIsMoviesDropdownOpen(!isMoviesDropdownOpen)
  }

  return (
    <>
      <div className=" ">
        <Link href={`./`} onClick={toggleMoviesDropdown}>
          Movies
        </Link>
        {isMoviesDropdownOpen && (
          <ul className="absolute left-12 bg-slate-800 text-slate-300 w-3/4 h-38 rounded pt-2 pb-2">
            {/* Render each category as a list item */}
            <li className="hover:text-slate-800 hover:bg-slate-200 hover:rounded">
              <button
                value="top_rated"
                onClick={() => handleCategoryChange("top_rated")}
              >
                TopRated
              </button>
            </li>
            <li className="hover:text-slate-800 hover:bg-slate-200 hover:rounded">
              <button
                value="now_playing"
                onClick={() => handleCategoryChange("now_playing")}
              >
                NowPlaying
              </button>
            </li>
            <li className="hover:text-slate-800 hover:bg-slate-200 hover:rounded">
              <button
                value="upcoming"
                onClick={() => handleCategoryChange("upcoming")}
              >
                Upcoming
              </button>
            </li>
            <li className="hover:text-slate-800 hover:bg-slate-200 hover:rounded">
              <button
                value="popular"
                onClick={() => handleCategoryChange("popular")}
              >
                Popular
              </button>
            </li>
            <li className="hover:text-slate-800 hover:bg-slate-200 hover:rounded">
              <button
                value="latest"
                onClick={() => handleCategoryChange("latest")}
              >
                Latest
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}

export default Categories

{
  /* <div>
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
      </div> */
}
