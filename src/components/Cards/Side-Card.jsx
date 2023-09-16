import { FaStarHalfAlt } from "react-icons/fa"

function SideCard(series) {
  const { name, media_type, first_air_date, vote_average, poster_path } = series
  return (
    <>
      <div className="card card-side h-36 bg-gradient-to-r from-sky-950 from-10% via-indigo-950 via-10% to-slate-500 shadow-xl">
        <figure className="max-h-full w-1/2 object-cover">
          <img
            src={`https://image.tmdb.org/t/p/w500/` + poster_path}
            alt="Movie"
          />
        </figure>
        <div className="card-body p-0  w-full h-full grid grid-cols-4">
          <h3 className="card-title justify-start self-start col-span-4 w-full ml-2">
            {name}
          </h3>
          <p className="w-full col-span-4 ml-2">{first_air_date}</p>
          <p className="w-full col-span-4 ml-2">
            {vote_average} <FaStarHalfAlt />
          </p>
          <p className="w-full col-span-4 ml-2 mb-">{media_type}</p>
        </div>
      </div>
    </>
  )
}
export default SideCard
