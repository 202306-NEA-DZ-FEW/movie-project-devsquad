const HeadingCard = ({ movie }) => {
  if (!movie) {
    return null
  }
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl h-full w-full transition-opacity duration-500 ease-in-out">
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
              <h1 className="text-6xl mb-8">Featured</h1>
              <h2 className="card-title text-3xl">{movie.original_title}</h2>
              <p className="text-1xl">{movie.overview}</p>
              <p>Popularity: {movie.popularity}</p>
              <p>Release Date: {movie.release_date}</p>
              <p>Vote Average: {movie.vote_average}</p>
              <p>Vote Count: {movie.vote_count}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Watch</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeadingCard
