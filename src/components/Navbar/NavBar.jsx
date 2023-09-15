import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import Link from "next/link"

const NavBar = () => {
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false)
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    async function fetchGenres() {
      const data = await fetcher(
        "genre/movie/list?api_key=12fef202d421a561786c57849c4afbc3",
      )
      setGenres(data.genres)
    }

    // async function fetchMovies(category) {
    //   setSelectedCategory(category);

    //     const data = await fetcher(
    //       `movie/${category}?api_key=12fef202d421a561786c57849c4afbc3`,
    //     )
    //     setMovies(data.results)

    // }

    fetchGenres()
    // fetchMovies()
  }, [])

  const toggleGenresDropdown = () => {
    setIsGenresDropdownOpen(!isGenresDropdownOpen)
  }

  const toggleMoviesDropdown = () => {
    setIsMoviesDropdownOpen(!isMoviesDropdownOpen)
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
          {isMoviesDropdownOpen && (
            <ul className="absolute  bg-transparent">
              <li>
                <Link href="#">Top Rated</Link>
              </li>
              <li>
                <Link href="#">Popular</Link>
              </li>
              <li>
                <Link href="#">Latest</Link>
              </li>
              <li>
                <Link href="#">Now Playing</Link>
              </li>
              <li>
                <Link href="#">Upcoming</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="#">Actors</Link>
        </li>
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
