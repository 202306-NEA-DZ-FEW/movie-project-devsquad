import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import Link from "next/link"
import Genres from "./Genres"
import Categories from "./Categories"

const NavBar = () => {
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false)
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu)
  }

  return (
    <nav className="flex justify-even  px-4 py-2 sticky top-0 z-10">
      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          {openMobileMenu ? (
            <AiOutlineCloseCircle size={38} />
          ) : (
            <AiOutlineMenu size={38} />
          )}
        </button>
      </div>
      <ul className="flex flex-wrap overflow-hidden gap-x-8">
        <div className="absolute">
          <Genres />
        </div>
        <div>
          <Categories />
        </div>
        <div>
          <Link href="#">Actors</Link>
        </div>
        <li>
          <form className="w-[300px] relative">
            <input
              type="search"
              placeholder="type here"
              className="w-full p-2 rounded-full bg-slate-800"
            />
            <button
              className="p-2 bg-slate-900 rounded-full "
              style={{
                position: "absolute",
                top: "75%",
                left: "100%",
                transform: "translate(-130%, -80%)",
              }}
            >
              <BiSearchAlt2 size={20} />
            </button>
          </form>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
