import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PrevReads from "../components/previous-reads"
import Review from "../components/reviewed"


const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const classNames = post.frontmatter.rating === 5 ? 'green rating' : 
  post.frontmatter.rating >= 3 ? 'yellow rating' : 'red rating';
  const review = post.frontmatter.reviewed;

  const tags = post.frontmatter.tags !== undefined ? post.frontmatter.tags.map((tag) => {
    return (
      <small className={tag}>
      -{tag} { }
      </small>
    )
  }) : 'No Tags Available';


  const narrator = post.frontmatter.narrator !== null ?  `Narrated by: ${post.frontmatter.narrator}` : post.frontmatter.narrators !== null ? 'Narrated by: Ensemble' : 'Hardcover';

  let image = getImage(post.frontmatter.image);
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
          <p>{post.frontmatter.date}</p>
          <div className="blogger-section">
            <p className="narrator">{narrator}</p>
            <p className={classNames}>{post.frontmatter.rating} out of 5</p>
            <p className="tag">{tags} </p>
          </div>
        </header>

        <GatsbyImage image={image} 
                    alt=""
                    className="book-cover-post" />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="article-section"
        />
        <Review review={review} />
        <hr />
        <PrevReads 
          data={post.frontmatter.author}
          title={post.frontmatter.title}
        />
      </article>
      <hr />
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <footer>
          <Bio />
        </footer>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
        date(formatString: "MMMM DD, YYYY")
        blogger
        author
        tags
        rating
        biline
        series
        narrator
        narrators
        superlatives
        reviewed
        score
        image {
          childImageSharp {
              gatsbyImageData(blurredOptions: {width: 400}, height: 450, width: 300)
          }
        }
      } 
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
