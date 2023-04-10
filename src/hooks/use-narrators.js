import { graphql, useStaticQuery } from "gatsby"

const useNarrators = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "narrator" } } }
        sort: { frontmatter: { title: ASC } }
      ) {
        nodes {
          frontmatter {
            title
            score
            reviewed
            type
            name
          }
          excerpt(pruneLength: 50)
          fields {
            slug
          }
        }
      }
    }
  `)
  return data.allMarkdownRemark.nodes.map(post => ({
    title: post.frontmatter.title,
    slug: post.fields.slug,
    type: post.frontmatter.type,
    score: post.frontmatter.score,
    reviewed: post.frontmatter.reviewed,
    name: post.frontmatter.name,
  }))
}

// go to graphiql and see how to query for awards
export default useNarrators
