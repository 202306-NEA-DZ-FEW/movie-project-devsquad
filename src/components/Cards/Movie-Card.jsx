import { FaCalendarCheck } from "react-icons/fa"

function MovieCard({ title, release_date, overview, popularity, poster_path }) {
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl image-full h-full">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500/` + poster_path}
            alt="Movie"
          />
        </figure>
        <div className="card-body grid grid cols-4 p-0">
          <h2 className="card-title col-span-4 ml-2 mt-2 text-3xl">
            Title: {title}
          </h2>
          <p className="col-span-4 ml-2 mt-2 self-center text-center">
            Overview: {overview}
          </p>
          <p className="col-span-2 ml-2 mt-2 self-center text-start">
            <strong>Popularity {popularity}</strong>
          </p>
          <p className="col-span-2 ml-3 mt-3 mr-3 mb-2 self-center justify-center text-end">
            <strong>{release_date}</strong>
          </p>
        </div>
      </div>
    </>
  )
}

export default MovieCard
