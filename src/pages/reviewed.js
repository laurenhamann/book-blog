import React from "react";
import { Link, graphql } from "gatsby"
import useBlogs from "../hooks/use-blogs"
import '../sass/styles.scss'
import Layout from "../components/layout";

const Reviewed = ({ location, data }) => {
    const blogs = useBlogs()
    const siteTitle = data.site.siteMetadata.title;
    return (
        <Layout location={location} title={siteTitle}>
            <ul>
                {blogs.map((b, i) => {
                    if(b.reviewed) {
                        const title = b.title;
                        const slug = b.slug;
                        const key = i;
                        return (
                            <Link to={slug}>
                                <li key={key}>
                                    {title}
                                </li>
                            </Link>
                        )
                    }
                })}
            </ul>
        </Layout>
    )
}

export default Reviewed;

export const pageQuery = graphql`
    {
        site {
        siteMetadata {
            title
        }
        }
    }
`