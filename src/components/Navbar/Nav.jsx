import React, { useState } from "react"
import Links from "./Links"
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import { BiSearchAlt2 } from "react-icons/bi"
const Nav = () => {
  const [Open, setOpen] = useState(false)
  function HandelNavbar() {
    setOpen(!Open)
  }
  return (
    <>
      <nav>
        <div className="flex justify-between space-x-4">
          <Links />
        </div>
        <form className="w-[300px] relative">
          <div className="relative">
            <input
              type="search"
              placeholder="type here"
              className="w-full p-2 rounded-full bg-slate-800"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translate(-130%, -80%)",
              }}
            />
            <button
              className="p-2 bg-slate-900 rounded-full "
              style={{
                position: "absolute",
                top: "50%",
                left: "-30%",
                transform: "translate(-130%, -80%)",
              }}
            >
              <BiSearchAlt2 size={20} />
            </button>
          </div>
        </form>
        <div className="md:hidden">
          <button onClick={HandelNavbar}>
            {Open ? (
              <AiOutlineCloseCircle size={38} />
            ) : (
              <AiOutlineMenu size={38} />
            )}
          </button>
        </div>
      </nav>
      {Open && (
        <div className="flex basis-full flex-col items-center">
          <Links />
        </div>
      )}
    </>
  )
}

export default Nav
