import { FaCalendarCheck } from "react-icons/fa"

function MovieCard({ title, release_date, overview, popularity, poster_path }) {
  return (
    <>
      <div className="card w-full shadow-xl h-full rounded-3xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <figure className="h-1/2 w-full object-cover">
          <img
            src={`https://image.tmdb.org/t/p/w500/` + poster_path}
            alt="Movie"
          />
        </figure>
        <div className="card-body rounded-b-3xl grid cols-4 p-0 h-1/4 bg-gradient-to-r from-sky-950 via-30% to-slate-500">
          <h2 className="card-title col-span-4 ml-2 mt-3 text-3xl font-bold text-yellow-200">
            {title}
          </h2>
          <p className="col-span-4 ml-2 mt-2 self-center text-1xl font-normal text-start">
            {overview}
          </p>
          <p className="col-span-2 ml-2 mt-2 self-center text-start text-yellow-200">
            <strong>Popularity {popularity}</strong>
          </p>
          <p className="col-span-2 ml-3 mt-3 mr-3 mb-2 self-center justify-center text-end text-yellow-200">
            <strong>{release_date}</strong>
          </p>
        </div>
      </div>
    </>
  )
}

export default MovieCard
