import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"

const Footer = () => {
  const users = [
    {
      name: "farouk26",
      githubUsername: "farouk26",
      linkedinUsername: "faroukisme",
    },
    {
      name: "hasnahadd",
      githubUsername: "hasnahadd",
      linkedinUsername: "manel-hasna-haddoud-aa5095278",
    },
    {
      name: "Mouloud Mecheter",
      githubUsername: "mouloud247",
      linkedinUsername: "mouloud-mecheter-4a3701166",
    },
    {
      name: "Mounib Zaidi",
      githubUsername: "mounibzaidi",
    },
    {
      name: "Takieddine Dilmi",
      githubUsername: "takidilmi",
      linkedinUsername: "takidilmi",
    },
    {
      name: "Halla Hamidi",
      githubUsername: "Halla24",
      linkedinUsername: "halla-hamidi-989197229",
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

          const linkedinResponse = await fetchLinkedInProfile(
            user.linkedinUsername,
          )

          return {
            name: user.name,
            githubAvatarUrl: githubData.avatar_url,
            githubUrl: githubData.html_url,
            linkedinUrl: linkedinResponse,
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

  async function fetchLinkedInProfile(username) {
    const encodedUser = encodeURIComponent(username)
    const url = `https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile?linkedin_url=https%3A%2F%2Fwww.linkedin.com%2Fin%2F${encodedUser}%2F`
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e5f70bf62cmshb47319825439d1ep172133jsn6ac874d435d8",
        "X-RapidAPI-Host": "fresh-linkedin-profile-data.p.rapidapi.com",
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const result = await response.json()
        const linkedinUrl = result.data.linkedin_url
        return linkedinUrl
      } else {
        console.error(
          `Error fetching LinkedIn profile for ${username}: ${response.status} ${response.statusText}`,
        )
        return ""
      }
    } catch (error) {
      console.error(`Error fetching LinkedIn profile for ${username}:`, error)
      return ""
    }
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-neutral-content">
      <div className="mb-4">
        <h2 className="text-blue text-lg mb-2"> Contact us</h2>
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
                    GitHub:{" "}
                    <a href={user.githubUrl} className="text-blue-500">
                      {user.githubUrl}
                    </a>
                  </p>
                  {user.linkedinUrl && (
                    <p className="text-xs">
                      LinkedIn:{" "}
                      <Link href={user.linkedinUrl} className="text-red-500">
                        {user.linkedinUrl}
                      </Link>
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
