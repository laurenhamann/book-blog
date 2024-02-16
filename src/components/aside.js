import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons"
const Aside = ({
  final,
  asideVersion,
  asideText,
  setAside,
  query,
  filterPosts,
  setSort,
}) => {
  const [displayButton, setDisplayButton] = useState(faPlus)
  const [displayStyle, setDisplayStyle] = useState(false)
  const [sorted, setSorted] = useState(false)
  const displayFilters = () => {
    setDisplayStyle(!displayStyle)
    const id = document.getElementById("filter")
    console.log(displayStyle)
    if (displayStyle) {
      id.style.display = "flex"
      setDisplayButton(faMinus)
    } else {
      id.style.display = "none"
      setDisplayButton(faPlus)
    }
  }
  const setAZSort = () => {
    setSorted(!sorted)
    if (sorted) {
      setSort("AZ")
    } else {
      setSort("none")
    }
  }
  return (
    <aside className="aside" id={asideVersion}>
      <FontAwesomeIcon icon={faArrowDownAZ} onClick={setAZSort} />
      <FontAwesomeIcon
        icon={displayButton}
        onClick={displayFilters}
        className="display-button"
      />
      <div id="filter">
        <div id="authors">
          <div
            className={asideVersion === "author" ? "tab selected" : "tab"}
            onClick={() => {
              setAside("author")
            }}
          >
            <small>Authors</small>
          </div>
        </div>
        <div id="narrators">
          <div
            className={asideVersion === "narrator" ? "tab selected" : "tab"}
            onClick={() => {
              setAside("narrator")
            }}
          >
            <small>Narrators</small>
          </div>
        </div>
        <div id="type">
          <div
            className={asideVersion === "type" ? "tab selected" : "tab"}
            onClick={() => {
              setAside("type")
              asideText("type")
            }}
          >
            <small>Type</small>
          </div>
        </div>
        <div id="tags">
          <div
            className={asideVersion === "tags" ? "tab selected" : "tab"}
            onClick={() => {
              setAside("tags")
            }}
          >
            <small>Tags</small>
          </div>
        </div>
        <div id="rating">
          <div
            className={asideVersion === "rating" ? "tab selected" : "tab"}
            onClick={() => {
              setAside("rating")
            }}
          >
            <small>Rating</small>
          </div>
        </div>
        <div id="Superlatives">
          <div
            className={asideVersion === "superlatives" ? "tab selected" : "tab"}
            onClick={() => {
              setAside("superlatives")
            }}
          >
            <small>Most Likely to</small>
          </div>
        </div>
        <div id="favorites">
          <div
            className={asideVersion === "favorites" ? "tab selected" : "tab"}
            onClick={() => {
              setAside("favorites")
            }}
          >
            <small>Favorites</small>
          </div>
        </div>
        <div className="data">
          {final.map((t, i) => {
            const key = `${t.name}+${i}`
            if (asideVersion === "favorites") {
              return (
                <div className="data-container" key={key}>
                  <li
                    value={t.name}
                    className={
                      query === t.name
                        ? "aside-list-item selected"
                        : "aside-list-item"
                    }
                    onClick={e => filterPosts(e)}
                  >
                    {t.name}
                  </li>
                  <small>(Top 5)</small>
                </div>
              )
            } else if (asideVersion === "narrator") {
              return (
                <div className="data-container" key={key}>
                  <li
                    value={t.name}
                    className={
                      query === t.name
                        ? "aside-list-item selected"
                        : "aside-list-item"
                    }
                    onClick={e => filterPosts(e)}
                  >
                    {t.name}
                  </li>
                  <small>({t.count})</small>
                </div>
              )
            } else {
              return (
                <div className="data-container" key={key}>
                  <li
                    value={t.name}
                    className={
                      query === t.name
                        ? "aside-list-item selected"
                        : "aside-list-item"
                    }
                    onClick={e => filterPosts(e)}
                  >
                    {t.name}
                  </li>
                  <small>({t.count})</small>
                </div>
              )
            }
          })}
        </div>
      </div>
    </aside>
  )
}

export default Aside
