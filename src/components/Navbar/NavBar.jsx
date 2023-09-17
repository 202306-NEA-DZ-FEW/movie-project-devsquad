import React, { useState } from "react"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import SearchBar from "./SearchBar"
import Genres from "./Genres"
import Categories from "./Categories"
import Link from "next/link"
import CustomModal from "./CustomModal"
import Logo from "./Logo"

const NavBar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu)
  }

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Categories />
            </li>
            <br></br>
            <li>
              <Link href={`./actors`}>Actors</Link>
            </li>
            <br></br>
            <Genres />
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href={`./movies`}>
          <Logo />
        </Link>
      </div>
      <div className="navbar-end ">
        <SearchBar />
      </div>
    </nav>
  )
}

export default NavBar
{
  /*           
          <div>
            <Genres />
          </div>
          
          <div>
            <Categories />
          </div>
          <div>
            <Link href="#">Actors</Link>
          </div>
          <div>
            <SearchBar />
          </div> */
}
