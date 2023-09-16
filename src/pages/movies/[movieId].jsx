import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function MoviePage({ movieData, creditsData, relatedData }) {
  let director = "N/A"
  if (creditsData && creditsData.crew) {
    const directorData = creditsData.crew.find(
      (person) => person.job === "Director",
    )
    if (directorData) {
      director = directorData.name
    }
  }

  let productionCompany = "N/A"
  if (
    movieData &&
    movieData.production_companies &&
    movieData.production_companies.length > 0
  ) {
    productionCompany = movieData.production_companies[0].name
  }
  return (
    <div className="bg-F5FAFF text-white p-10">
      <div className="mb-10 ">
        <Image
          src={movieData.backdrop_path}
          alt={movieData.title}
          width={200}
          height={300}
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <Image
            src={movieData.poster_path}
            alt={movieData.title}
            width={500}
            height={600}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">{movieData.title}</h2>
          <ul className="list-disc pl-5 mb-4">
            <li>Director: {director}</li>
            <li>Language: {movieData.original_language}</li>
            <li>Release Date: {movieData.release_date}</li>
            <li>Runtime: {movieData.runtime} minutes</li>
          </ul>

          <p className="text-xl mt-4">
            Production Company: {productionCompany}
          </p>
        </div>
      </div>

      {/* Related Movies Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Related Movies</h2>
        <div className="flex flex-wrap justify-around">
          {relatedData.results?.map((movie, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
            >
              <Link href={`/movie/${movie.id}`}>
                <a>
                  <div className="flex flex-col items-center max-w-sm mx-auto">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={500}
                      height={300}
                    />
                    <div className="mt-3 text-center">
                      <h1 className="text-xl font-bold">{movie.title}</h1>
                      <p className="mt-2">{movie.release_date}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
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
