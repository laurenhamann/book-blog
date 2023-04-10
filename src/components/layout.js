import * as React from "react"
import { Link } from "gatsby"
import Search from "./search"
import { Footer } from "./footer"
const Layout = ({ location, title, children, filterPosts, clear }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let header

  if (isRootPath) {
    header = (
      <div className="flex-header">
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
        <Search filter={e => filterPosts(e)} clear={e => clear(e)} />
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
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
