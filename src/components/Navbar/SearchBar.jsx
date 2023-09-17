import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"

const SearchBar = () => {
  {
    /*state for trackig the type of the user */
  }
  const [searchQuery, setSearchQuery] = useState("")
  {
    /*state for displaying  the actor  */
  }

  const [actors, setActors] = useState([])
  {
    /*state for displaying  the movies  */
  }

  const [movieResults, setMovieResults] = useState([])

  const fetchActors = async () => {
    try {
      const actor = await fetcher(
        "person/popular?api_key=12fef202d421a561786c57849c4afbc3",
      )
      setActors(actor.results)
    } catch (error) {
      console.error("Failed to fetch actors:", error)
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
  useEffect(() => {
    fetchActors()
    fetchMovies()
  }, [])
  const handleSearch = async (e) => {
    e.preventDefault()
    await fetchActors()
    await fetchMovies()
  }

  // console.log(movieResults);
  // console.log(actors);

  {
    /*items that display based on the user input in search field */
  }

  const itemsToDisplay = [...actors, ...movieResults].filter((item) => {
    if (item.name) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase())
    } else if (item.title) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return false
  })

  console.log(itemsToDisplay)

  return (
    <div>
      <form className="relative">
        <input
          type="search"
          placeholder="Type here"
          value={searchQuery}
          className="w-full p-2 rounded-full bg-slate-800"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="p-2 bg-slate-900 rounded-full"
          style={{
            position: "absolute",
            top: "75%",
            left: "100%",
            transform: "translate(-130%, -80%)",
          }}
          onClick={handleSearch}
        >
          <BiSearchAlt2 size={20} />
        </button>
      </form>
      {/* <ul>
      {itemsToDisplay.map((item) => (
          <li key={item.id}>{item.name}{item.title}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default SearchBar
