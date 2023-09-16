function MovieCard({ title, overview, popularity, poster_path }) {
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl image-full h-full">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500/` + poster_path}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Title: {title}</h2>
          <p>Overview {overview}</p>
          <p>Popularity {popularity}</p>
          <p>Date</p>
        </div>
      </div>
    </>
  )
}

export default MovieCard
