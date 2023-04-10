import React from "react"
import { Link } from "gatsby"
import Search from "./search"
const Header = ({ isRootPath, title, filterPosts, clear }) => {
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
  return <header className="global-header">{header}</header>
}

export default Header
