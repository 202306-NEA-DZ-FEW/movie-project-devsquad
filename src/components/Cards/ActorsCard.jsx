import Image from "next/image"

function ActorsCard({ actor }) {
  const profilePath = actor.profile_path
  return (
    <div className="relative flex flex-col rounded-xl bg-gray-900 border-2 bg-clip-border text-white shadow-md">
      <div className="relative h-60 overflow-hidden rounded-t-xl bg-white fit bg-clip-border text-gray-700 shadow-lg">
        <Image
          className="hover:shadow-lg hover:scale-105 w-full h-full object-cover mb-2  transition-all duration-500 ease-in-out cursor-pointer hover:opacity-65"
          src={`https://image.tmdb.org/t/p/w500${profilePath}`}
          alt="profile-picture"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="text-center h-38 bg-gray-900 border-s border-t-0 border-r border-b border-l border-gray-400 rounded-b-xl">
        <h4 className="mb-2 block font-sans text-base font-semibold tracking-normal text-blue-gray-900">
          {actor.name}
        </h4>
        <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-xs font-medium leading-relaxed text-transparent antialiased">
          {actor.character}
        </p>
      </div>
    </div>
  )
}

export default ActorsCard
