import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import Link from "next/link"

const Genres = () => {
  const [genres, setGenres] = useState([])
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false)

  useEffect(() => {
    // Fetch genres data from the API
    async function fetchGenres() {
      const data = await fetcher(
        "genre/movie/list?api_key=12fef202d421a561786c57849c4afbc3",
      )
      setGenres(data.genres)
    }
    fetchGenres()
  }, [])

  const toggleGenresDropdown = () => {
    // Toggle the state of the genres dropdown
    setIsGenresDropdownOpen(!isGenresDropdownOpen)
  }

  return (
    <div>
      <ul>
        <li>
          <Link href="#" onClick={toggleGenresDropdown}>
            Genres
          </Link>
          <div>
            {isGenresDropdownOpen && (
              <ul className="dropdown absolute">
                {/* Render each genre as a list item */}
                {genres?.map((genre) => (
                  <li key={genre.id}>
                    <Link href="#">{genre.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Genres
