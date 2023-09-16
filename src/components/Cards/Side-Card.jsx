function SideCard(series) {
  const { name, genre_ids, overview, vote_average, poster_path } = series
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl bg-primary h-20 truncate">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500/` + poster_path}
            alt="Series"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Name: {name}</h2>
          <p>Bio: {overview}</p>
          <p>Vote Rate {vote_average}</p>
        </div>
      </div>
    </>
  )
}
export default SideCard
