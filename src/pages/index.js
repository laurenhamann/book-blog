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
  const [asideVersion, setAside] = React.useState('author');
  const [asideTxt, setAsideTxt] = React.useState();
  let final = [];
  function asideText (texts) {
    let arr = [];
    blogs.map((txt) => {
      const v = texts === 'author' ? txt.author : texts === 'tags' ? txt.tags : txt.rating;
      if(texts === 'tags'){
        v.map((t, i) => {
          arr.push(t);
        })
      }else {
        arr.push(v);
      }
    })
    let count = 0;
    const lengthshortened = arr.length - 2;
    const length = arr.length - 1;
    console.log(lengthshortened, length);
    let uniquearr = [...new Set(arr)];
    uniquearr.forEach((t, i) => {
      arr.filter((d, index2) => {
        if(index2 <= lengthshortened) {
          if(t === d) {
            count = count + 1;
            // console.log(t, 'did match', d, count); 
          }else {
            // console.log(t, 'did not match', d);  
          }
        } else if(index2 === length) {
          final.push({
            name: t,
            count: count
          });
          count = 0;
        }
      })
    })
    const sorted = final.sort((a, b) => b.count - a.count);
    console.log(sorted);
  }


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
  }else {
    asideText(asideVersion);
  }

  const filterPosts = (event) => {
    const q = event.target.value === 0 ? event.target.textContent : event.target.value;
    const newPosts = [];
    setQuery(q);
    console.log(q);
    if(asideVersion === 'tags'){
      console.log('im here!')
      posts.map((post) => {
        post.tags.filter(t => {
          if(q === t){
            newPosts.push(post);
          }
        })
      })
    }else if(q === 1 | 2 | 3 | 4 | 5 ) {
      posts.map((post) => {
        console.log('wrong one')
        if(post.rating === q){
          return newPosts.push(post);
        }
      })
    }else {
      console.log('wrong one end')
      posts.map((post) => {
        if(post.title.toLowerCase().includes(q.toLowerCase()) ||
        (post.author &&
          post.author.toLowerCase().includes(q.toLowerCase())) ||
        (post.tags &&
          post.tags.join('').toLowerCase().includes(q.toLowerCase()))){
            return newPosts.push(post);
          }
      });
    }
    // const filteredPostList = posts.map((post) => {
    //   if(post.title.toLowerCase().includes(q.toLowerCase()) ||
    //   (post.author &&
    //     post.author.toLowerCase().includes(q.toLowerCase())) ||
    //   (post.tags &&
    //     post.tags.join('').toLowerCase().includes(q.toLowerCase()))){
    //       return newPosts.push(post);
    //     }
    // });
    setPosts(newPosts);
    if(q === "" || q === "reset"){
      setPosts(blogs);
    }

    // set the component's state with our newly generated query and list variables
  };

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
      <button value='reset' onClick={(e) => filterPosts(e)} type='button'>Reset</button>
      {/* <button type="submit" onClick={(e) => filterPosts(e)}> Search </button> */}
      </form>
      <div className="flex">
      <ol>
        {posts.map(post => {
          const title = post.title || post.slug;
          const classNames = post.rating === 5 ? 'green' : 
            post.rating >= 3 ? 'yellow' : 'red';
          
          let image = getImage(post.image);
          const tags = post.tags !== undefined ? post.tags.map((tag) => {
                      return (
                        <small className={tag}>
                        -{tag} { }
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
                      <span itemProp="headline" className="headline" key={post.slug}>{title}</span>
                    </Link>
                  </h2>
                  <p className="author">Written by: {post.author}</p>
                  <p className="biline">{post.biline}{post.series}</p>
                  <small className="date">Date Read: {post.date}</small>
                  <small className={classNames}> Rating: {post.rating} out of 5</small>
                    {tags}
                </header>
              </article>
            </li>
          )
        })}
      </ol>
      <aside className="aside" id={asideVersion}>
          <div id='authors'>
            <div className={asideVersion === 'author' ? 'tab selected' : 'tab'}
              onClick={()=> {
                setAside('author');
                asideText('author');
              }}>
                <small>Authors</small>
            </div>
            <div className={asideVersion === 'tags' ? 'tab selected' : 'tab'}
            onClick={()=> {
                setAside('tags');
                asideText('tags');
              }}>
                <small>Tags</small>
            </div>
            <div className={asideVersion === 'rating' ? 'tab selected' : 'tab'}
            onClick={()=> {
                setAside('rating');
                asideText('rating');
              }}>
                <small>Rating</small>
            </div>
            <div className="data">
              {final.map((t, i) => {
                return (
                  <div>
                    <li value={t.name} className="aside-list-item" onClick={(e) => filterPosts(e)}>
                      {t.name}
                    </li>
                    <small>
                        ({t.count})
                    </small>
                  </div>
                )
              })}
            </div>
          </div>
      </aside>
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
