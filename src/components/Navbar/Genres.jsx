import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import Link from "next/link"

const NavBar = () => {
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
    <nav className="flex justify-around items-center px-4 py-2 sticky top-0 z-10">
      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          {openMobileMenu ? (
            <AiOutlineCloseCircle size={38} />
          ) : (
            <AiOutlineMenu size={38} />
          )}
        </button>
      </div>
      <ul
        className={`md:flex flex-row space-x-20 ${
          openMobileMenu ? "flex" : "hidden"
        }`}
      >
        <li className="absolute bg-transparent">
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
        <li>
          <Link href="#" onClick={toggleMoviesDropdown}>
            Movies
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
