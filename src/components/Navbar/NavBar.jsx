import React, { useState } from "react"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import SearchBar from "./SearchBar"
import Genres from "./Genres"
import Categories from "./Categories"
import Link from "next/link"
import CustomModal from "./CustomModal"

const NavBar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu)
  }

  return (
    <nav className="flex justify-between px-4 py-2 sticky top-0 z-10">
      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          {openMobileMenu ? (
            <AiOutlineCloseCircle size={38} />
          ) : (
            <AiOutlineMenu size={38} />
          )}
        </button>
      </div>
      <ul className="hidden md:flex flex-wrap overflow-hidden gap-x-8">
        {/* Render the Genres component */}
        <div>
          <Genres />
        </div>
        {/* Render the Categories component */}
        <div>
          <Categories />
        </div>
        <div>
          <Link href="#">Actors</Link>
        </div>
        <div>
          <SearchBar />
        </div>
      </ul>
      <CustomModal
        isOpen={openMobileMenu}
        onRequestClose={toggleMobileMenu}
        contentLabel="Mobile Menu"
        className="mobile-menu"
      >
        <ul className="absolute left-0 top-0 bg-transparent text-amber-500">
          {/* Render the Genres component */}
          <div>
            <SearchBar />
          </div>
          {/* Render the Categories component */}
          <div className="text-amber-500">
            <Categories />
          </div>
          <div className="text-amber-500">
            <Link href="#">Actors</Link>
          </div>
          <div className="text-amber-500">
            <Genres />
          </div>
        </ul>
      </CustomModal>
    </nav>
  )
}

export default NavBar
