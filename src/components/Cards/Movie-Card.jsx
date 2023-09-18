import { Container } from "postcss"
import Image from "next/image"
import { FaCalendarCheck } from "react-icons/fa"

function MovieCard({ title, release_date, overview, popularity, poster_path }) {
  return (
    <>
      <div className="card w-full shadow-xl rounded-3xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <figure className="h-64">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="Movie"
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body h-36 rounded-b-2xl grid cols-3 p-0 bg-gradient-to-r from-sky-950 via-10% to-slate-500 bg-opacity-20">
          <h2 className="card-title col-span-4 ml-2 mt-3 text-1xl font-bold p-0 text-slate-200">
            {title}
          </h2>
          <p className="col-span-2 ml-2 mt-2 self-start p-0 text-start text-yellow-200">
            <strong>Popularity {popularity}</strong>
          </p>
          <p className="col-span-2 ml-3 mt-3 mr-3 mb-2 pb-10 self-start justify-center text-end text-sm text-yellow-200">
            <strong>{release_date}</strong>
          </p>
        </div>
      </div>
    </>
  )
}

export default MovieCard
