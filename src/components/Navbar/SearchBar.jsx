import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [actors, setActors] = useState([])
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

  useEffect(() => {
    fetchActors()
  }, [])

  const handleSearch = async () => {
    try {
      const data = await fetcher(
        `search/actor?query=${searchQuery}&api_key=12fef202d421a561786c57849c4afbc3`,
      )
      setActors(data.results)
    } catch (error) {
      console.error("Failed to fetch search results:", error)
    }
  }
  const itemsToDisplay = actors.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase())
  })
  // {itemsToDisplay.map((actor) => (
  //   console.log(actor.name)
  // ))}

  return (
    <div>
      <form className="w-[300px] relative">
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
          onClick={fetchActors}
        >
          <BiSearchAlt2 size={20} />
        </button>
      </form>
      {/* <ul>
        {itemsToDisplay.map((actor) => (
 <li key={actor.id}>{actor.name}</li>))}
      </ul> */}
    </div>
  )
}

export default SearchBar
