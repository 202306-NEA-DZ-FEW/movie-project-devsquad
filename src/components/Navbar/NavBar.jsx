import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
const NavBar = () => {
  const [genres, setGenres] = useState([])
  const [movieResults, setMovieResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [actors, setActors] = useState([])
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false)
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const fetchActors = async () => {
    try {
      const actor = await fetcher(
        "person/popular?api_key=12fef202d421a561786c57849c4afbc3",
      )
      setActors(actor.results)
    } catch (error) {
      console.error("Failed to fetch movies:", error)
    }
  }

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
        setMovieResults(data.results)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      }
    }

    fetchActors()
    fetchGenres()
    fetchMovies()
  }, [])
  console.log(actors)
  console.log(movieResults)

  const toggleGenresDropdown = () => {
    setIsGenresDropdownOpen(!isGenresDropdownOpen)
  }

  const toggleMoviesDropdown = () => {
    setIsMoviesDropdownOpen(!isMoviesDropdownOpen)
  }

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu)
  }
  const itemsToDisplay = actors.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase())
  })
  // const itemsToDisplayMovies = movieResults.filter(item => {
  //   return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  // });

  return (
    <nav className="flex justify-between items-center px-4 py-2 sticky top-0 z-10 ">
      <div className="md:hidden absolute right-0">
        <button onClick={toggleMobileMenu}>
          {openMobileMenu ? (
            <AiOutlineCloseCircle size={38} />
          ) : (
            <AiOutlineMenu size={38} />
          )}
        </button>
      </div>
      <ul
        className={` ${
          openMobileMenu ? "block" : "hidden"
        } flex sm:gap-4 flex-col sm:flex-row gap-16`}
      >
        <li>
          <a href="#" onClick={toggleGenresDropdown}>
            Genres
          </a>
          {isGenresDropdownOpen && (
            <ul className="absolute">
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
            <ul className="absolute">
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
              value={searchQuery}
              className="w-full p-2 rounded-full bg-slate-800"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="p-2 bg-slate-900 rounded-full "
              style={{
                position: "absolute",
                top: "75%",
                left: "100%",
                transform: "translate(-130%, -80%)",
              }}
              onClick={() => {
                fetchActors
                fetchMovies
              }}
            >
              <BiSearchAlt2 size={20} />
            </button>
          </form>
        </li>
      </ul>
      {/* <ul>
      {itemsToDisplay.map(actor => (
        <li key={actor.id}>{actor.name}</li>
      ))}


      </ul> */}
    </nav>
  )
}

export default NavBar
