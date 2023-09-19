import React, { useEffect, useState } from "react"

const HeadingCard = ({ movie }) => {
  const [trailerUrl, setTrailerUrl] = useState("")

  useEffect(() => {
    async function fetchTrailerUrl() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=12fef202d421a561786c57849c4afbc3
          `,
        )
        const data = await response.json()
        if (data.results && data.results.length > 0) {
          const trailer = data.results.find(
            (video) =>
              video.type === "Trailer" && video.site === "YouTube" && video.key,
          )
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`)
          }
        }
      } catch (error) {
        console.error("Error fetching trailer URL:", error)
      }
    }

    fetchTrailerUrl()
  }, [movie])

  return (
    <div className="card card-side rounded-t-none bg-gradient-to-r from-sky-950 from-10% via-indigo-950 via-30% to-slate-500 shadow-xl h-full w-full transition-opacity duration-500 ease-in-out">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:h-96">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.original_title}
            className="object-cover h-full lg:h-full w-full"
          />
        </div>
        <div className="p-4 lg:p-6 flex flex-col justify-center w-full lg:w-full">
          <div className="flex-grow">
            <h1 className="text-6xl mb-8 text-yellow-200">
              <strong>Featured</strong>
            </h1>
            <h2 className="card-title text-3xl text-yellow-200 mb-2">
              {movie.original_title}
            </h2>
            <p className="text-1xl">{movie.overview}</p>
            <p>Popularity : {movie.popularity}</p>
            <p>Release date : {movie.release_date}</p>
            <p>Average vote : {movie.vote_average}</p>
            <p>Vote count : {movie.vote_count}</p>
            {trailerUrl && (
              <div className="card-actions justify-end">
                <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
                  <button className="btn bg-inherit justify-center text-slate-800">
                    Watch Trailer
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeadingCard
