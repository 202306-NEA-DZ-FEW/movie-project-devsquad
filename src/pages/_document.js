import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/Navbar/Navbar"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navbar />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  )
}
