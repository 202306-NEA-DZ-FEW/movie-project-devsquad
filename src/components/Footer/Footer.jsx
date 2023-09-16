import React, { useState, useEffect } from "react"

const Footer = () => {
  const users = [
    "farouk26",
    "hasnahadd",
    "mouloud247",
    "mounibzaidi",
    "takidilmi",
    "Halla24",
  ]
  const usersLinkedin = [
    "manel-hasna-haddoud-aa5095278",
    "mouloud-mecheter-4a3701166",
  ]

  const [userData, setUserData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = users.map(async (user) => {
          const response = await fetch(`https://api.github.com/users/${user}`)
          const data = await response.json()
          return {
            name: data.name,
            avatarUrl: data.avatar_url,
            url: data.html_url,
          }
        })
        const userData = await Promise.all(promises)
        setUserData(userData)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchData()
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
      const result = await response.json()
      const linkedinUrl = result.data.linkedin_url
      console.log(`LinkedIn Profile URL for ${username}:`, linkedinUrl)
    } catch (error) {
      console.error(`Error fetching LinkedIn profile for ${username}:`, error)
    }
  }

  async function fetchAllLinkedInProfiles() {
    for (const username of usersLinkedin) {
      await fetchLinkedInProfile(username)
    }
  }

  useEffect(() => {
    fetchAllLinkedInProfiles()
  }, [])

  return (
    <div>
      <ul>
        {userData.map((user, index) => (
          <li key={index}>
            <div>
              <h3>{user.name}</h3>
              <img src={user.avatarUrl} alt={`Avatar of ${user.name}`} />
              <p>
                URL: <a href={user.url}>{user.url}</a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
