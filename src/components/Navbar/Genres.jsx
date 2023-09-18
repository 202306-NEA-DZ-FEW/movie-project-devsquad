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
          <Link href={`./`} onClick={toggleGenresDropdown}>
            Genres
          </Link>
          <div>
            {isGenresDropdownOpen && (
              <ul className="absolute left-12 text-slate-300 bg-gray-800 dropdown rounded p-4 top-0 w-64 h-38 overflow-y-auto">
                {/* Render each genre as a list item */}
                {genres?.map((genre) => (
                  <li
                    className="hover:bg-slate-300 hover:text-slate-800 hover:rounded"
                    key={genre.id}
                  >
                    <Link href={`./`}>{genre.name}</Link>
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
