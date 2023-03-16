import React from "react"
import { Years } from "./year-blocks"
import Bio from "./bio"
export const Footer = () => {
  return (
    <footer>
      <div>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
      <Bio />
      <Years />
    </footer>
  )
}
