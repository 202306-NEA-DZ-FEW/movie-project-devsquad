import Image from "next/image"

export function MovieCard({ movie }) {
  return (
    <a
      href="#"
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <Image
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt=""
        width={500}
        height={300}
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {movie.title}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {movie.overview}
        </p>
      </div>
    </a>
  )
}
import Link from "next/link"

export default function Home({ latestMovies }) {
  return (
    <div className="gap-4 overflow-x-scroll">
      {latestMovies.results.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`}>
          <MovieCard movie={movie} {...movie} />
        </Link>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const url = "https://api.themoviedb.org/3/movie/popular"
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmZlZjIwMmQ0MjFhNTYxNzg2YzU3ODQ5YzRhZmJjMyIsInN1YiI6IjY1MDFiNjcxNmEyMjI3MDBjM2I2YWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XJjyQmVwx0bDppP1jD0WnR_WV0eH7kBhZBRVRQFEMhQ",
    },
  }

  const response = await fetch(url, options)
  const data = await response.json()

  return {
    props: {
      latestMovies: data,
    },
  }
}
import { useState, useEffect } from "react"

function App() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return <h1>{isClient ? "This is never prerendered" : "Prerendered"}</h1>
}
