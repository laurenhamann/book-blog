import React from "react"

const FilterHeader = ({ query, aside }) => {
  let header
  if (query === "emptyQuery" || query === "none") {
    header = ""
    return
  } else if (aside === "favorites") {
    header = `My Top 5 - ${query}`
    return header
  } else {
    header = `Filter: ${query}`
    return header
  }
  return <h1>{header}</h1>
}

export default FilterHeader
