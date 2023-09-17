import Image from "next/image"
import Link from "next/link"

function ActorsCard({ actor }) {
  const profilePath = actor.profile_path
  return (
    <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-white shadow-md">
      <div className="relative h-60 overflow-hidden rounded-t-xl bg-white fit bg-clip-border text-gray-700 shadow-lg">
        <Image
          className="hover:shadow-lg hover:scale-105 w-full h-full object-cover mb-2 rounded-md transition-all duration-500 ease-in-out cursor-pointer hover:opacity-65"
          src={`https://image.tmdb.org/t/p/w500${profilePath}`}
          alt="profile-picture"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 text-center bg-gray-900 border-s border-t-0 border-r border-b border-l border-gray-400 rounded-b-xl">
        <h4 className="mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {actor.name}
        </h4>
        <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-xs font-medium leading-relaxed text-transparent antialiased">
          {actor.character}
        </p>
      </div>
    </div>
  )
}

export default function MoviePage({ movieData, creditsData, relatedData }) {
  const director = creditsData?.crew?.find(
    (crewMember) => crewMember.job === "Director",
  )

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="p-0 m-0 h-96 relative">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
            alt={movieData.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-900"></div>
        </div>
      </section>
      <section className="bg-gray-900 text-white p-8">
        <div className="container flex flex-col md:flex-row items-start">
          <div className="pr-4">
            <Image
              className="rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
              width={220}
              height={300}
            />
          </div>
          <div className="w-full md:w-1/2 md:ml-0">
            <h1 className="text-4xl mb-2 ml-0 text-4xl mb-0 tracking-tight font-extrabold text-gray-900 dark:text-white">
              {movieData.title}
            </h1>
            <div className="flex items-center mb-4">
              <p className="mr-2">
                {movieData.original_language.toUpperCase()}
              </p>
              <p>{movieData.runtime} min</p>
              <p className="mr-2 ml-3">⭐{movieData.vote_average}</p>
              <p className="mr-1">({movieData.vote_count} Votes)</p>
            </div>
            <p className="mb-2 text-sm">{movieData.overview}</p>
            <div className="text-lg">
              <ul>
                <li>
                  <span className="text-white">Genres:</span>{" "}
                  {movieData.genres.map((genre) => genre.name).join(", ")}
                </li>
                <li>
                  <span className="text-white">Release date:</span>{" "}
                  {movieData.release_date}
                </li>
                <li>
                  <span className="text-white">Director:</span>{" "}
                  {director ? director.name : "N/A"}
                </li>
              </ul>
            </div>
          </div>
          {/* Add a white box to the right */}
          <div className=" flex-1 bg-white"></div>
        </div>
      </section>

      <div className="mb-4 ml-4 text-4xl mb-0 tracking-tight font-extrabold text-gray-900 dark:text-white">
        Cast
      </div>
      <div className="mt-6 grid p-4 grid-cols-5 gap-4">
        {creditsData?.cast?.slice(0, 5).map((actor) => (
          <ActorsCard key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { movieId } = context.query
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
  const relatedUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`
  const options = {
    headers: {
      accept: "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmZlZjIwMmQ0MjFhNTYxNzg2YzU3ODQ5YzRhZmJjMyIsInN1YiI6IjY1MDFiNjcxNmEyMjI3MDBjM2I2YWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XJjyQmVwx0bDppP1jD0WnR_WV0eH7kBhZBRVRQFEMhQ",
    },
  }

  const response = await fetch(url, options)
  const creditsResponse = await fetch(creditsUrl, options)
  const relatedResponse = await fetch(relatedUrl, options)

  const data = await response.json()
  const creditsData = await creditsResponse.json()
  const relatedData = await relatedResponse.json()

  return {
    props: {
      movieData: data,
      creditsData: creditsData,
      relatedData: relatedData,
    },
  }
}
