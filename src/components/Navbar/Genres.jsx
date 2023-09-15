import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import Link from "next/link"

const Genres = () => {
  const [genres, setGenres] = useState([])
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  useEffect(() => {
    async function fetchGenres() {
      const data = await fetcher(
        "genre/movie/list?api_key=12fef202d421a561786c57849c4afbc3",
      )
      setGenres(data.genres)
    }
    fetchGenres()
  }, [])

  const toggleGenresDropdown = () => {
    setIsGenresDropdownOpen(!isGenresDropdownOpen)
  }

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu)
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
                  <Link href="#">{genre.name}</Link>
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
