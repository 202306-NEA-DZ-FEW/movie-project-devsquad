import Image from "next/image"
import Link from "next/link"
import ActorsCard from "@/components/Cards/ActorsCard"

export default function MoviePage({ movieData, creditsData, relatedData }) {
  const director = creditsData?.crew?.find(
    (crewMember) => crewMember.job === "Director",
  )

  return (
    <div className=" bg-gray-900">
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
            <h1 className=" mb-2 ml-0 text-4xl tracking-tight font-extrabold text-white">
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
                <li>
                  <div className="text-sm">
                    <ul>
                      <li>
                        <span className="text-white">Genres:</span>{" "}
                        {movieData?.genres
                          ?.map((genre) => genre.name)
                          .join(", ")}
                      </li>
                      <li>
                        <span className="text-white">Release date:</span>{" "}
                        {movieData?.release_date}
                      </li>

                      <div className="flex  items-center">
                        <span className="text-white">Production:</span>{" "}
                        <div className="flex ml-4 space-x-4">
                          {movieData?.production_companies
                            ?.slice(0, 3)
                            .map((company) => (
                              <div
                                key={company.id}
                                className="flex items-center"
                              >
                                <img
                                  src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                  alt={company.name}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span>{company.name}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-1 flex flex-col mr-4 items-center gap-2">
            <div className="mb-2 ml-2 text-4xl center tracking-tight font-extrabold text-white">
              Related Movies
            </div>
            {relatedData?.results?.slice(0, 3).map((movie) => (
              <div
                key={movie.id}
                className="w-[30rem] border-2 border-b-4 border-gray-200 rounded-xl hover:bg-black"
              >
                <Link href={`/movies/${movie.id}`}>
                  <div className="grid grid-cols-6 p-2 gap-y-2">
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="max-w-16 max-h-16 rounded-sm"
                        alt={movie.title}
                      />
                    </div>
                    <div className="col-span-5 md:col-span-4 ml-4">
                      <p className="text-white font-bold">{movie.title}</p>
                      <p className="text-gray-400">
                        Release date: {movie.release_date}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-4 ml-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
        Cast
      </div>
      <div className="mt-6 grid p-4 grid-cols-5 gap-4">
        {creditsData?.cast?.slice(0, 5).map((actor) => (
          <Link key={actor.id} href={`/actors/actorId?id=${actor.id}`}>
            <ActorsCard actor={actor} />
          </Link>
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
