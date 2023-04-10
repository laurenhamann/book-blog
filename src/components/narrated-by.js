import React from "react"
import useBlogs from "../hooks/use-blogs"
import { Link } from "gatsby"
const NarratoredBy = ({ data, title }) => {
  const narrator = data
  const tit = title
  const blogs = useBlogs()
  let count = 0
  let ensemble = []
  const map = blogs.map((b, i) => {
    if (narrator === b.narrator) {
      count = count + 1
      return (
        <Link to={b.slug} itemProp="url">
          <p>{b.title}</p>
        </Link>
      )
    } else if (Array.isArray(b.narrators)) {
      b.narrators.forEach(n => {
        if (n === narrator) {
          count = count + 1
          const html = { slug: b.slug, title: b.title }
          ensemble.push(html)
        }
      })
    }
  })
  if (ensemble.length > 0) {
    return (
      <div className="prev-reads">
        <h4>Book Count : {count}</h4>
        <h3>Books Narrated by {tit}</h3>
        {map}
        <h3>Books that include {tit} in an ensemble</h3>
        {ensemble.map(t => {
          return (
            <Link to={t.slug} itemProp="url">
              <p>{t.title}</p>
            </Link>
          )
        })}
      </div>
    )
  } else {
    return (
      <div className="prev-reads">
        <h4>Book Count : {count}</h4>
        <h3>Books Narrated by {tit}</h3>
        {map}
      </div>
    )
  }
}

export default NarratoredBy
