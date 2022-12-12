import * as React from "react"
import { Link } from "gatsby"
import Search from "./search"

const Layout = ({ location, title, children, filterPosts }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  console.log(filterPosts);

  let header

  if (isRootPath) {
    header = (
      <div className="flex-header"> 
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
        <Search filter={(e) => filterPosts(e)} />
      </div>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
