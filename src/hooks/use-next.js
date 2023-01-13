import { graphql, useStaticQuery } from 'gatsby';

const useNext = () => {
    const data = useStaticQuery(graphql`
    query {
        allMarkdownRemark(filter: {frontmatter: {description: {eq: "up next"}}}) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    image {
                        childImageSharp {
                        gatsbyImageData(blurredOptions: {width: 150}, height: 200, width: 200)
                        }
                    }
                }
            }
        }
    }
`)
console.log(data);
    return data.allMarkdownRemark.nodes.map(post => ({
        image: post.frontmatter.image,
        slug: post.fields.slug
    }))
}



// go to graphiql and see how to query for awards
export default useNext;