import * as React from "react"
import { Link, graphql } from "gatsby"
import '../sass/styles.scss'
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import useBlogs from "../hooks/use-blogs"


const BlogIndex = ({ data, location }) => {
  const blogs = useBlogs();
  const siteTitle = data.site.siteMetadata.title;
  const [posts, setPosts] = React.useState(blogs);
  const [query, setQuery] = React.useState('emptyQuery');
  if (blogs.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  const filterPosts = (event) => {
    const q = event.target.value;
    const newPosts = [];
    setQuery(q);
    const filteredPostList = posts.map((post) => {
      if(post.title.toLowerCase().includes(q.toLowerCase()) ||
      (post.author &&
        post.author.toLowerCase().includes(q.toLowerCase())) ||
      (post.tags &&
        post.tags.join('').toLowerCase().includes(q.toLowerCase()))){
          return newPosts.push(post);
        }
    });
    setPosts(newPosts);
    if(q === ""){
      setPosts(blogs);
      console.log('I ran on blank');
    }

    // set the component's state with our newly generated query and list variables
    console.log(filteredPostList);
  };

  // const { filteredPostList } = posts;
  // const hasSearchResults = filteredPostList && query !== 'emptyQuery';
  // const post = hasSearchResults ? filteredPostList : blogs;
  // console.log(post);

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <form name="search" rel="search">
      <input className="searchInput"
              type="search"
              aria-label="Search"
              placeholder="Filter blog posts by title or tag"
              onChange={(e) => filterPosts(e)}>

      </input>
      {/* <button type="submit" onClick={(e) => filterPosts(e)}> Search </button> */}
      </form>
      <ol>
        {posts.map(post => {
          const title = post.title || post.slug;
          const classNames = post.rating === 5 ? 'green' : 
            post.rating >= 3 ? 'yellow' : 'red';
          
          let image = getImage(post.image);
          const tags = post.tags !== undefined ? post.tags.map((tag) => {
                      return (
                        <small className={tag}>
                        {tag} { }
                        </small>
                      )
                    }) : 'No Tags Available';
          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.slug} itemProp="url">
                    <GatsbyImage image={image} className="book-cover-home" /> <br />
                      <span itemProp="headline" className="headline">{title}</span>
                    </Link>
                  </h2>
                  <small className="date">{post.date}</small>
                  <br />
                  <small>
                  Rating:
                  </small>
                  <button className={classNames}> {post.rating} out of 5</button>
                  <br />
                    {tags}
                </header>
              </article>
            </li>
          )
        })}
      </ol>
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
