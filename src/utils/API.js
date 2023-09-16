export async function fetcher(apiRoute) {
  const url = "https://api.themoviedb.org/3/" + apiRoute

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmZlZjIwMmQ0MjFhNTYxNzg2YzU3ODQ5YzRhZmJjMyIsInN1YiI6IjY1MDFiNjcxNmEyMjI3MDBjM2I2YWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XJjyQmVwx0bDppP1jD0WnR_WV0eH7kBhZBRVRQFEMhQ",
    },
  }
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}

export async function fetchData(apiUrl, numColumns, numMovies) {
  const url = `https://api.themoviedb.org/3/${apiUrl}`

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmZlZjIwMmQ0MjFhNTYxNzg2YzU3ODQ5YzRhZmJjMyIsInN1YiI6IjY1MDFiNjcxNmEyMjI3MDBjM2I2YWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XJjyQmVwx0bDppP1jD0WnR_WV0eH7kBhZBRVRQFEMhQ",
    },
  }

  const response = await fetch(url, options)
  const data = await response.json()

  // Check if data.results is an array
  if (!Array.isArray(data.results)) {
    throw new Error("Invalid data structure received from the API")
  }

  // Shuffle the movies array
  const shuffledMovies = data.results.sort(() => 0.5 - Math.random())

  // Calculate the number of movies per column
  const moviesPerColumn = Math.ceil(numMovies / numColumns)

  // Create an array of arrays to represent columns
  return Array.from({ length: numColumns }, (_, columnIndex) =>
    shuffledMovies.slice(
      columnIndex * moviesPerColumn,
      (columnIndex + 1) * moviesPerColumn,
    ),
  )
}
