import React, { useState } from "react"
import Link from "next/link"

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [movies, setMovies] = useState([])
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false)

  const handleCategoryChange = async (category) => {
    // Update the selected category
    setSelectedCategory(category)

    // Fetch movies data based on the selected category
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=12fef202d421a561786c57849c4afbc3`,
    )
    const data = await response.json()
    setMovies(data.results)
  }

  const toggleMoviesDropdown = () => {
    // Toggle the state of the movies dropdown
    setIsMoviesDropdownOpen(!isMoviesDropdownOpen)
  }

  return (
    <div>
      <Link href={`./`} onClick={toggleMoviesDropdown}>
        Movies
      </Link>
      {isMoviesDropdownOpen && (
        <ul
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="text-neutral-300 bg-gray-800 dropdown absolute rounded p-4 left-12 top-0 w-64 h-38"
        >
          {/* Render each category as a list item */}
          <li className="hover:bg-neutral-300 hover:text-slate-800 hover:rounded">
            <Link href={`./`} value="top_rated">
              Top Rated
            </Link>
          </li>
          <li className="hover:bg-neutral-300 hover:text-slate-800 hover:rounded">
            <Link href={`./`} value="now-playing">
              Now Playing
            </Link>
          </li>
          <li className="hover:bg-neutral-300 hover:text-slate-800 hover:rounded">
            <Link href={`./`} value="upcoming">
              Upcoming
            </Link>
          </li>
          <li className="hover:bg-neutral-300 hover:text-slate-800 hover:rounded">
            <Link href={`./`} value="popular">
              Popular
            </Link>
          </li>
          <li className="hover:bg-neutral-300 hover:text-slate-800 hover:rounded">
            <Link href={`./`} value="latest">
              Latest
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Categories
