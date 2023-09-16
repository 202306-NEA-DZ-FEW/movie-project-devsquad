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

  const handleGenreClick = (genreId) => {
    router.push(`/movies?genre=${genreId}`)
  }

  return (
    <nav>
      <ul>
        <li className="absolute right-24">
          <a href="#" onClick={toggleGenresDropdown}>
            Genres
          </a>
          {isGenresDropdownOpen && (
            <ul>
              {genres?.map((genre) => (
                <li key={genre.id}>
                  <Link href={`/movies?genre=${genre.id}`}>
                    <Link href="#" onClick={() => handleGenreClick(genre.id)}>
                      {genre.name}
                    </Link>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Genres
