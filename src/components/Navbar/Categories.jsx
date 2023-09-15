import React, { useState } from "react"

const MovieCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [movies, setMovies] = useState([])

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=12fef202d421a561786c57849c4afbc3`,
    )
    const data = await response.json()
    setMovies(data.results)
  }

  return (
    <div>
      <h2>Movie Categories</h2>
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">Select a category</option>
        <option value="top_rated">Top Rated</option>
        <option value="popular">Popular</option>
        <option value="latest">Latest</option>
        <option value="now_playing">Now Playing</option>
        <option value="upcoming">Upcoming</option>
      </select>

      {selectedCategory && (
        <div>
          <h2>
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}{" "}
            Movies
          </h2>
          <ul>
            {movies?.map((movie) => (
              <li key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <span>{movie.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MovieCategories
