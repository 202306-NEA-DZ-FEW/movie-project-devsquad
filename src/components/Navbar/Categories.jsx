import React, { useState } from "react"
import Link from "next/link"
const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [movies, setMovies] = useState([])
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false)

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=12fef202d421a561786c57849c4afbc3`,
    )
    const data = await response.json()
    setMovies(data.results)
  }
  const toggleMoviesDropdown = () => {
    setIsMoviesDropdownOpen(!isMoviesDropdownOpen)
  }
  return (
    <div className=" bg-transparent">
      <a href="#" onClick={toggleMoviesDropdown}>
        Movies
      </a>
      {isMoviesDropdownOpen && (
        <ul
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <li>
            <Link href={`./`} value="top_rated">
              Top Rated
            </Link>
          </li>
          <li>
            <Link href={`./`} value="now-playing">
              Now Playing
            </Link>
          </li>
          <li>
            <Link href={`./`} value="upcoming">
              Upcoming
            </Link>
          </li>
          <li>
            <Link href="./" value="popular">
              Popular
            </Link>
          </li>
          <li>
            <Link href="./" value="latest">
              Latest
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Categories
