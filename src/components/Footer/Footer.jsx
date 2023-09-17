import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons" // Import Font Awesome icons

const Footer = () => {
  const githubUsernames = [
    "farouk26",
    "hasnahadd",
    "mouloud247",
    "mounibzaidi",
    "takidilmi",
    "Halla24",
  ]
  const linkedinUsernames = [
    "manel-hasna-haddoud-aa5095278",
    "mouloud-mecheter-4a3701166",
    "faroukisme",
    "takidilmi",
    "halla-hamidi-989197229",
  ]

  const [githubUserData, setGithubUserData] = useState([])
  const [linkedinUserData, setLinkedinUserData] = useState([])

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const promises = githubUsernames.map((username) =>
          fetch(`https://api.github.com/users/${username}`).then((response) =>
            response.json(),
          ),
        )
        const userData = await Promise.all(promises)
        setGithubUserData(userData)
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
      }
    }

    fetchGithubData()
  })

  useEffect(() => {
    const fetchLinkedinData = async () => {
      try {
        const promises = linkedinUsernames.map((username) =>
          fetchLinkedInProfile(username),
        )
        await Promise.all(promises)
      } catch (error) {
        console.error("Error fetching LinkedIn data:", error)
      }
    }

    fetchLinkedinData()
  })

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
      const result = await response.json()
      const linkedinUrl = result.data.linkedin_url
      console.log(`LinkedIn Profile URL for ${username}:`, linkedinUrl)
      // Update the state for LinkedIn data if needed
    } catch (error) {
      console.error(`Error fetching LinkedIn profile for ${username}:`, error)
    }
  }

  return (
    <div className="bg-black p-4">
      <div className="mb-4">
        <h2 className="text-white text-2xl mb-2">GitHub Users</h2>
        <ul>
          {githubUserData.map((user, index) => (
            <li
              key={index}
              className="text-white border-b border-gray-600 py-2"
            >
              <div>
                <h3 className="text-red-500">{user.name}</h3>

                <p>
                  URL:{" "}
                  <a href={user.html_url} className="text-red-500">
                    {user.html_url}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-white text-2xl mb-2">LinkedIn Users</h2>
        <div className="mt-4">
          {linkedinUsernames.map((username, index) => (
            <div key={index} className="flex items-center">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-red-500 mr-2"
              />
              <p className="text-white">{`LinkedIn Profile for ${username}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
