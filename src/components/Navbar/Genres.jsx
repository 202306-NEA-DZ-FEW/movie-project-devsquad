import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { fetcher } from "@/utils/API"
import Link from "next/link"

const Genres = () => {
  const [genres, setGenres] = useState([])
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchGenres() {
      const data = await fetcher(
        `genre/movie/list?api_key=12fef202d421a561786c57849c4afbc3`,
      )
      setGenres(data.genres)
    }
    fetchGenres()
  }, [])

  const toggleGenresDropdown = () => {
    setIsGenresDropdownOpen(!isGenresDropdownOpen)
  }
  return (
    <div>
      <ul>
        <li>
          <p onClick={toggleGenresDropdown}>Genres</p>
          <div>
            {isGenresDropdownOpen && (
              <ul className="absolute left-12 text-slate-300 bg-slate-800 dropdown rounded p-4 top-0 w-64 h-38 overflow-y-auto">
                {/* Render each genre as a list item */}
                {genres?.map((genre) => (
                  <li
                    className="hover:bg-slate-200 hover:text-slate-800 hover:rounded"
                    key={genre.id}
                  >
                    <Link
                      href={`/movies?genre=${genre.id}&title=${genre.name}`}
                    >
                      {genre.name}
                    </Link>
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
