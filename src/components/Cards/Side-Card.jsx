import { FaStarHalfAlt } from "react-icons/fa"
import { useState, useEffect } from "react"

function SideCard(series) {
  const { name, media_type, first_air_date, vote_average, poster_path } = series
  const [trailerUrl, setTrailerUrl] = useState("")

  useEffect(() => {
    async function fetchTrailerUrl() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${series.id}/videos?api_key=12fef202d421a561786c57849c4afbc3
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
  }, [series])

  return (
    <>
      <div className="card card-side h-44 bg-gradient-to-r from-sky-950 from-10% via-indigo-950 via-10% to-slate-500 shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <figure className="max-h-full w-2/3 object-cover">
          <img
            src={`https://image.tmdb.org/t/p/w500/` + poster_path}
            alt="Movie"
          />
        </figure>
        <div className="card-body p-0  w-full h-full grid grid-cols-4">
          <h1 className="card-title justify-start self-start col-span-4 w-full ml-2">
            {name}
          </h1>
          <p className="w-full col-span-4 ml-2">{first_air_date}</p>
          <p className="w-full col-span-4 ml-2">
            {vote_average} <FaStarHalfAlt />
          </p>
          <div className="col-span-4 px-5">
            {trailerUrl && (
              <a href={trailerUrl}>
                <button className="btn btn-sm mb-4 bg-inherit justify-center text-yellow-500">
                  WATCH TRAILER
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default SideCard
