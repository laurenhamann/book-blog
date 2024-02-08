import React from "react"

const FilterHeader = ({ query, aside, resetFilterFunc }) => {
  let header
  if (query === "emptyQuery" || query === "none") {
    header = ""
    return
  } else if (aside === "favorites") {
    header = `My Top 5 - ${query}`
    return header
  } else {
    console.log("in else", query)
    const headerText = `Filter: ${query}`
    header = `${headerText}`
    return (
      <>
        <h3>{headerText}</h3>
        <button value="none" onClick={event => resetFilterFunc(event)}>
          Clear
        </button>
      </>
    )
  }
  return <h1>{header}</h1>
}

export default FilterHeader
