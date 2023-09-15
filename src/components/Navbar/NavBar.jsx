import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"

const NavBar = () => {
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false)
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await fetcher(
          "genre/movie/list?api_key=12fef202d421a561786c57849c4afbc3",
        )
        setGenres(data.genres)
      } catch (error) {
        console.error("Failed to fetch genres:", error)
      }
    }

    async function fetchMovies() {
      try {
        const data = await fetcher(
          "movie/now_playing?api_key=12fef202d421a561786c57849c4afbc3",
        )
        setMovies(data.results)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      }
    }

    fetchGenres()
    fetchMovies()
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
    <nav className="flex justify-between items-center px-4 py-2 sticky top-0 z-10">
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
        <li>
          <a href="#" onClick={toggleGenresDropdown}>
            Genres
          </a>
          {isGenresDropdownOpen && (
            <ul>
              {genres.map((genre) => (
                <li key={genre.id}>
                  <a href="#">{genre.name}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <a href="#" onClick={toggleMoviesDropdown}>
            Movies
          </a>
          {isMoviesDropdownOpen && (
            <ul>
              <li>
                <a href="#">Top Rated</a>
              </li>
              <li>
                <a href="#">Popular</a>
              </li>
              <li>
                <a href="#">Latest</a>
              </li>
              <li>
                <a href="#">Now Playing</a>
              </li>
              <li>
                <a href="#">Upcoming</a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="#">Actors</a>
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
