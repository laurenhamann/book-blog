import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
export const ArticleOfBook = (
  asideVersion,
  slug,
  image,
  score,
  key,
  title,
  read,
  tags,
  rated,
  narrator,
  either,
  authors,
  i
) => {
  const html = [authors, either, narrator, read, rated, tags]

  if (asideVersion === "favorites") {
    if (i <= 4) {
      return (
        <li key={slug} className="flex">
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
            key={key}
          >
            <header>
              <Link to={slug} itemProp="url">
                <GatsbyImage image={image} alt="" className="book-cover-home" />{" "}
                <br />
                <h2 itemProp="headline" className="headline" key={slug}>
                  {title}
                </h2>
              </Link>
              <p className="score">rating:{score} </p>
            </header>
          </article>
        </li>
      )
    } else {
      return
    }
  } else {
    return (
      <li key={slug} className="flex">
        <article
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
          key={key}
        >
          <header>
            <Link to={slug} itemProp="url">
              <GatsbyImage image={image} alt="" className="book-cover-home" />{" "}
              <br />
              <h2 itemProp="headline" className="headline" key={slug}>
                {title}
              </h2>
            </Link>
            {html.map(d => {
              return d
            })}
          </header>
        </article>
      </li>
    )
  }
}
