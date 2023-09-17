import { FaGithub } from "react-icons/fa"

function Footer() {
  return (
    <>
      <footer className="footer p-10 bg-gradient-to-r from-slate-900 to-sky-950 text-neutral-content">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          ></svg>
          <p>
            DevSquad
            <br />
            Reliable team since Birth
          </p>
        </aside>
        <nav>
          <header className="footer-title">Dev Team</header>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaGithub />
            </a>
            <a>
              <FaGithub />
            </a>
            <a>
              <FaGithub />
            </a>
          </div>
        </nav>
      </footer>
    </>
  )
}

export default Footer
