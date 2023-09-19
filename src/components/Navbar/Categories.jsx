import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false)
  const router = useRouter()

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
        <p onClick={toggleMoviesDropdown}>Movies</p>
        {isMoviesDropdownOpen && (
          <ul className="absolute left-12 bg-slate-800 text-slate-300 w-5/6 h-40 rounded pt-2 pb-2">
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
          </ul>
        )}
      </div>
    </>
  )
}

export default Categories
