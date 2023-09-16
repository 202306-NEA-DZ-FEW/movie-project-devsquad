import React, { useState } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import SearchBar from "./SearchBar"
import Genres from "./Genres"
import Categories from "./Categories"
import Link from "next/link"

const NavBar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu)
  }

  // const itemsToDisplayMovies = movieResults.filter(item => {
  //   return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  // });

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
        {/* Render the Genres component */}
        <div className="absolute">
          <Genres />
        </div>
        {/* Render the Categories component */}
        <div className="absolute">
          <Categories />
        </div>
        <div>
          <Link href="#">Actors</Link>
        </div>
        <div>
          <SearchBar />
        </div>
      </ul>
    </nav>
  )
}

export default NavBar
