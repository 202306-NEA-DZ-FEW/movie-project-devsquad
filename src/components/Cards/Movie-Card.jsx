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
        <div className="card-body h-40 rounded-b-2xl grid cols-3 p-0 bg-gradient-to-b from-slate-900 to-gray-900 bg-opacity-20">
          <h2 className="card-title col-span-4 ml-2 mt-3 text-1xl font-bold p-0  text-white">
            {title}
          </h2>
          <p className="col-span-2 ml-2 mt-2 text-sm self-start p-0 text-start text-white">
            <strong>Popularity {popularity}</strong>
          </p>
          <p className="col-span-2 ml-3 mt-3 mr-3 mb-2 pb-10 self-start justify-center text-end text-sm text-white">
            <strong>{release_date}</strong>
          </p>
        </div>
      </div>
    </>
  )
}

export default MovieCard
