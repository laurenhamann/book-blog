import { graphql, useStaticQuery } from 'gatsby';

const useBlogs = () => {
    const data = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
            nodes {
            frontmatter {
                author
                biline
                blogauthor
                date(formatString: "MMMM DD, YYYY")
                description
                rating
                series
                tags
                title
                img {
                childImageSharp {
                    gatsbyImageData(blurredOptions: {width: 150}, height: 200, width: 200)
                }
                }
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
        author: post.frontmatter.author,
        blogAuthor: post.frontmatter.blogauthor,
        date: post.frontmatter.date,
        excerpt: post.excerpt,
        tags: post.frontmatter.tags,
        rating: post.frontmatter.rating,
        image: post.frontmatter.img,
        slug: post.fields.slug
    }))
}

export default useBlogs;