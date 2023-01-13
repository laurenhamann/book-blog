import { graphql, useStaticQuery } from 'gatsby';

const useBlogs = () => {
    const data = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            filter: {frontmatter: {description: {ne: "up next"}}}
            sort: {frontmatter: {date: DESC}}
        ){
            nodes {
            frontmatter {
                author
                byline
                blogger
                date(formatString: "MMMM DD, YYYY")
                description
                narrator
                rating
                series
                tags
                title
                narrators
                superlatives
                score
                description
                image {
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
        blogAuthor: post.frontmatter.blogger,
        date: post.frontmatter.date,
        biline: post.frontmatter.byline,
        series: post.frontmatter.series,
        excerpt: post.excerpt,
        tags: post.frontmatter.tags,
        narrator: post.frontmatter.narrator,
        narrators: post.frontmatter.narrators,
        rating: post.frontmatter.rating,
        image: post.frontmatter.image,
        slug: post.fields.slug,
        score: post.frontmatter.score,
        superlative: post.frontmatter.superlatives,
        description: post.frontmatter.description
    }))
}



// go to graphiql and see how to query for awards
export default useBlogs;