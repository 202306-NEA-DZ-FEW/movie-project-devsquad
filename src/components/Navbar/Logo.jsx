import React from "react"
import MyImage from "./pagelogo.png"
const Logo = () => {
  return (
    <div className="logo h-16 w-16">
      <img src={MyImage} alt="logo" />
      <ion-icon name="logo-ionic"></ion-icon>
    </div>
  )
}

export default Logo
