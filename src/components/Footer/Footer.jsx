import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"

const Footer = () => {
  const users = [
    {
      name: "farouk26",
      githubUsername: "farouk26",
      linkedinUrl: "https://www.linkedin.com/in/faroukisme",
    },
    {
      name: "hasnahadd",
      githubUsername: "hasnahadd",
      linkedinUrl: "https://www.linkedin.com/in/manel-hasna-haddoud-aa5095278",
    },
    {
      name: "Mouloud Mecheter",
      githubUsername: "mouloud247",
      linkedinUrl: "https://www.linkedin.com/in/mouloud-mecheter-4a3701166",
    },
    {
      name: "Mounib Zaidi",
      githubUsername: "mounibzaidi",
      linkedinUrl: "Mounib Zaidi",
    },
    {
      name: "Takieddine Dilmi",
      githubUsername: "takidilmi",
      linkedinUrl: "https://www.linkedin.com/in/takidilmi",
    },
    {
      name: "Halla Hamidi",
      githubUsername: "Halla24",
      linkedinUrl: "https://www.linkedin.com/in/halla-hamidi-989197229",
    },
  ]

  const [userData, setUserData] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const promises = users.map(async (user) => {
          const githubResponse = await fetch(
            `https://api.github.com/users/${user.githubUsername}`,
          )
          const githubData = await githubResponse.json()

          return {
            name: user.name,
            githubAvatarUrl: githubData.avatar_url,
            githubUrl: githubData.html_url,
            linkedinUrl: user.linkedinUrl,
          }
        })

        const userData = await Promise.all(promises)
        setUserData(userData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-neutral-content">
      <div className="mb-4">
        <h2 className="text-blue text-1g mb-2"> made by </h2>
        <div className="flex flex-wrap">
          {userData.map((user, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
            >
              <div className="bg-white bg-opacity-20 p-2 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <img
                    src={user.githubAvatarUrl}
                    alt={`Avatar of ${user.name}`}
                    className="rounded-full h-8 w-8 mr-2"
                  />
                  <h3 className="text-white-500 text-sm">{user.name}</h3>
                </div>
                <div className="mt-1">
                  <p className="text-xs">
                    <FontAwesomeIcon icon={faGithub} className="mr-1" />
                    GitHub:{" "}
                    <a href={user.githubUrl} className="text-blue-500">
                      {user.githubUrl}
                    </a>
                  </p>
                  {user.linkedinUrl && (
                    <p className="text-xs">
                      <FontAwesomeIcon icon={faLinkedin} className="mr-1" />
                      LinkedIn:{" "}
                      <a href={user.linkedinUrl} className="text-red-500">
                        LinkedIn Profile
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer footer-center p-2 bg-base-300 text-base-content">
        <aside>
          <p className="text-xs">
            Copyright © 2023 - All right reserved by DevSquad team
          </p>
        </aside>
      </footer>
    </div>
  )
}

export default Footer
