import * as React from "react"
import { Link, graphql } from "gatsby"
import "../sass/styles.scss"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import useBlogs from "../hooks/use-blogs"
import FilterHeader from "../components/filterHeader"
import UpNext from "../components/up-next"
import { CurrentCount } from "../components/currentCount"
import Aside from "../components/aside"
import Header from "../components/header"
import { asideTexts } from "../components/aside-text"
import { queryBooks } from "../components/query-book-list"
import Layout from "../components/layout"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const blogs = useBlogs()
  const [posts, setPosts] = React.useState(blogs)
  const [query, setQuery] = React.useState("emptyQuery")
  const [asideVersion, setAside] = React.useState("author")
  const [bookcount, setCount] = React.useState(blogs.length)
  let final
  if (blogs.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>No blog posts found.</p>
      </Layout>
    )
  } else {
    // asideText(asideVersion)
    console.log(blogs)
    asideTexts(asideVersion, blogs, function callback(finalarray) {
      final = finalarray
    })
  }

  const newQuery = event => {
    const q =
      event.target.value === 0 ? event.target.textContent : event.target.value
    const newPosts = []
    setQuery(q)
    blogs.map(post => {
      if (asideVersion === "tags") {
        post.tags.filter(t => {
          if (q === t) {
            newPosts.push(post)
          }
        })
      } else if (typeof q === "number") {
        if (post.rating === q) {
          return newPosts.push(post)
        }
      } else if (asideVersion === "narrator") {
        if (
          post.narrator !== null &&
          post.narrator.toLowerCase().includes(q.toLowerCase())
        ) {
          return newPosts.push(post)
        } else if (post.narrators !== null) {
          post.narrators.map(e => {
            if (e.toLowerCase().includes(q.toLowerCase())) {
              return newPosts.push(post)
            }
          })
        }
      } else if (asideVersion === "favorites") {
        post.tags.filter(t => {
          if (q === t && post.score !== null) {
            newPosts.push(post)
          }
        })
        const sorted = newPosts.sort((a, b) => b.score - a.score)
      } else if (asideVersion === "superlatives") {
        if (post.superlative !== null) {
          if (post.superlative.toLowerCase().includes(q.toLowerCase())) {
            return newPosts.push(post)
          }
        }
      } else if (asideVersion === "type") {
        if (post.type === q) {
          return newPosts.push(post)
        }
      } else {
        if (
          post.title.toLowerCase().includes(q.toLowerCase()) ||
          (post.author &&
            post.author.toLowerCase().includes(q.toLowerCase())) ||
          (post.tags &&
            post.tags.join("").toLowerCase().includes(q.toLowerCase()))
        ) {
          return newPosts.push(post)
        }
      }
    })
    setPosts(newPosts)
    if (q === "" || q === "none") {
      setPosts(blogs)
      setAside("author")
    }
    // set the component's state with our newly generated query and list variables
  }

  const clearInput = e => {
    document.getElementById("search-input").value = ""
  }

  return (
    <Layout
      location={location}
      title={siteTitle}
      filterPosts={newQuery}
      clear={clearInput}
    >
      <CurrentCount count={bookcount} />
      <UpNext />
      <div className="query" data-test="filter-header">
        <h1>
          <FilterHeader query={query} aside={asideVersion} />
        </h1>
      </div>
      <div className="flex">
        <ol>
          {posts.map((post, i) => {
            const title = post.title || post.slug
            //get book image
            let image = getImage(post.image)
            const key = `${post.slug}${i}`
            if (asideVersion === "favorites") {
              if (i <= 4) {
                return (
                  <li key={post.slug} className="flex">
                    <article
                      className="post-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                      key={key}
                    >
                      <header>
                        <Link to={post.slug} itemProp="url">
                          <GatsbyImage
                            image={image}
                            alt=""
                            className="book-cover-home"
                          />{" "}
                          <br />
                          <h2
                            itemProp="headline"
                            className="headline"
                            key={post.slug}
                          >
                            {title}
                          </h2>
                        </Link>
                        <p className="score">rating:{post.score} </p>
                      </header>
                    </article>
                  </li>
                )
              } else {
                return
              }
            } else {
              //color changes based on rating score
              const classNames =
                post.rating === 5
                  ? "green"
                  : post.rating >= 3
                  ? "yellow"
                  : "red"

              //changes narrator singular to ensemble for multiple
              const narrator =
                post.narrator !== null ? (
                  <p className="narrator">Narrated By: {post.narrator}</p>
                ) : post.narrator === null && post.narrators === null ? (
                  ""
                ) : (
                  <p className="narrator">Narratored By: Ensemble</p>
                )

              const rated = (
                <small className={classNames}>
                  {" "}
                  Rating: {post.rating} out of 5
                </small>
              )
              const read = (
                <small className="date">Date Read: {post.date}</small>
              )

              const authors = (
                <p className="author">Written by: {post.author}</p>
              )
              //series or byline
              const either =
                post.series !== null ? (
                  <p className="series">{post.series}</p>
                ) : post.biline !== null ? (
                  <p className="byline">{post.biline}</p>
                ) : (
                  ""
                )

              // get tags
              const tags =
                post.tags !== undefined
                  ? post.tags.map(tag => {
                      return (
                        <small className={tag}>
                          -{tag} {}
                        </small>
                      )
                    })
                  : "Uncatagorized"

              const html = [authors, either, narrator, read, rated, tags]

              return (
                <li key={post.slug} className="flex">
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                    key={key}
                  >
                    <header>
                      <Link to={post.slug} itemProp="url">
                        <GatsbyImage
                          image={image}
                          alt=""
                          className="book-cover-home"
                        />{" "}
                        <br />
                        <h2
                          itemProp="headline"
                          className="headline"
                          key={post.slug}
                        >
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
          })}
        </ol>
        <Aside
          final={final}
          asideVersion={asideVersion}
          asideText={asideTexts}
          setAside={setAside}
          query={query}
          filterPosts={newQuery}
        />
      </div>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
