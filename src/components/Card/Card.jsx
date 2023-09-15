const MovieCard = ({ movie }) => {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl h-full w-full">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-96">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
              className="object-cover h-full lg:h-full w-full"
            />
          </div>
          <div className="p-4 lg:p-6 flex flex-col justify-center w-full lg:w-full">
            <h1 className="text-6xl mb-3">Upcoming</h1>
            <h2 className="card-title">{movie.original_title}</h2>
            <p>{movie.overview}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Vote Average: {movie.vote_average}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieCard
