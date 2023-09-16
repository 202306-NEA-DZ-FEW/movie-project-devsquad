import { useState, useEffect } from "react"
import MovieLoop from "@/components/Cards/Loop"
import MovieCard from "@/components/Cards/Movie-Card"
import SideCard from "@/components/Cards/Side-Card"
import { fetcher, fetchData } from "@/utils/API"

export default function Home({ latestMovies, trendingMovies, popularSeries }) {
  return (
    <>
      <MovieLoop />
      <h1 className="rounded pr-2 pt-1 pb-1 w-full md:w-full lg:w-2/4 text-center md:text-center lg:text-end bg-gradient-to-r from-sky-950 to-slate-500 bg-primary ml-auto text-3xl mt-10 mb-10">
        <strong>LATEST MOVIES</strong>
      </h1>
      <div className="first-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {latestMovies?.results.slice(0, 4).map((movie) => {
          return (
            <div key={movie.id}>
              <MovieCard {...movie} />
            </div>
          )
        })}
      </div>
      <h1 className=" rounded pl-2 pt-1 pb-1 bg-gradient-to-r from-slate-500 to-sky-950 w-full md:w-full lg:w-2/4 text-center md:text-center lg:text-start mr-auto text-3xl mt-10 mb-10">
        <strong>TRENDING</strong>
      </h1>
      <div className="wrapper grid grid-cols-8 gap-4 mb-10">
        <div className="second-container col-span-8 md:col-span-6 lg:col-span-6">
          <div className="latest-movies-section grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 w-full">
            {trendingMovies?.results.slice(0, 6).map((movie) => {
              return (
                <div key={movie.id}>
                  <MovieCard {...movie} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="side-container col-span-8 md:col-span-2 lg:col-span-2">
          <h1 className="w-full bg-gradient-to-r from-sky-950 via-blue-950 to-slate-500 text-center mr-auto text-2xl mb-10 rounded p-1">
            <strong>POPULAR TV SHOWS</strong>
          </h1>
          <div className="popular-all grid grid-cols-1 gap-4">
            {popularSeries?.results.slice(0, 4).map((series) => {
              return (
                <div key={series.id}>
                  <SideCard {...series} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

//Fetch Side
export async function getStaticProps() {
  const latestMoviesData = await fetcher("trending/movie/day")
  const trendingMoviesData = await fetcher("movie/top_rated")
  const popularSeriesData = await fetcher("trending/tv/day")

  return {
    props: {
      latestMovies: latestMoviesData,
      trendingMovies: trendingMoviesData,
      popularSeries: popularSeriesData,
    },
  }
}
