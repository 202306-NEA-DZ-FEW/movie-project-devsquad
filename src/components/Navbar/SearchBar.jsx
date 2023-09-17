import React, { useState, useEffect } from "react"
import { fetcher } from "@/utils/API"
import { BiSearchAlt2 } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import Link from "next/link"

const SearchBar = () => {
  {
    /*state for trackig the type of the user */
  }
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (searchQuery.trim() !== "") {
        try {
          const response = await fetcher(
            `search/movie?query=${searchQuery}&api_key=12fef202d421a561786c57849c4afbc3`,
          )
          setSearchResult(response.results[0])
        } catch (error) {
          console.error("Failed to fetch search result:", error)
        }
      } else {
        setSearchResult(null)
      }
    }

    fetchSearchResult()
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    // Perform search
  }

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
          className="p-2 bg-slate-900 rounded-full bg-opacity-50"
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

      {searchResult && (
        <div className="absolute">
          <Link href={`/`}>
            <Link href={`/movies/${searchResult.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${searchResult.poster_path}`}
                alt={searchResult.title}
                className="w-24 h-auto"
              />
            </Link>
          </Link>
        </div>
      )}
    </div>
  )
}

export default SearchBar

{
  /* {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          <Link href={`/movie/${selectedMovie.id}`}>
            <Link href="#">Go to Movie Page</Link>
          </Link>
        </div>
      )} */
}
