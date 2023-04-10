import React from "react"
import { Link } from "gatsby"
import useNarrators from "../hooks/use-narrators"

const FilterHeader = ({ query, aside }) => {
  const pages = useNarrators()
  let header
  let slug
  if (query === "emptyQuery" || query === "none") {
    header = ""
    return
  } else if (aside === "favorites") {
    header = `My Top 5 - ${query}`
    return header
  } else {
    pages.map(page => {
      if (page.name === query) {
        console.log(page.name)
        slug = page.slug
        header = (
          <h1>
            Filter: <Link to={page.slug}>{query}</Link>
          </h1>
        )
      } else {
        header = (
          <h1>
            Filter: <Link to={slug}>{query}</Link>
          </h1>
        )
      }
    })
    return header
  }
  return <h1>{header}</h1>
}

export default FilterHeader
