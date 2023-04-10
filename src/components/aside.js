import React from "react"

const Aside = ({
  final,
  asideVersion,
  asideText,
  setAside,
  query,
  filterPosts,
}) => {
  return (
    <aside className="aside" id={asideVersion}>
      <div id="authors">
        <div
          className={asideVersion === "author" ? "tab selected" : "tab"}
          onClick={() => {
            setAside("author")
            asideText("author")
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
            asideText("narrator")
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
            asideText("tags")
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
            asideText("rating")
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
            asideText("superlatives")
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
            asideText("favorites")
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
    </aside>
  )
}

export default Aside
