import React from "react"
import Link from "next/link"

const Links = () => {
  return (
    <div className="w-1/3 justify-end ">
      <div className="hidden w-full justify-between md:flex space-x-20">
        <Link href="#">Movie</Link>
        <Link href="#">Genres</Link>
        <Link href="#">Actors</Link>
      </div>
    </div>
  )
}

export default Links
