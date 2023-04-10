import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import NarratoredBy from "../components/narrated-by"
const NarratorTemplate = ({
  data: { site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <h4>{post.frontmatter.author}</h4>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="article-section"
        />
      </article>
      <NarratoredBy
        data={post.frontmatter.name}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

export default NarratorTemplate

export const pageQuery = graphql`
  query MyQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        name
      }
    }
  }
`
