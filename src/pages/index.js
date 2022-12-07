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

    // if author then return author ~ if tags then return tags ~ if narrator and not null return narrator ~ if narrator and narrators not null return narrators ~ if rating return rating

    blogs.map((txt) => {
      const v = texts === 'author' ? txt.author 
      : 
      texts === 'tags' ? txt.tags 
      : 
      texts === 'narrator' && txt.narrator !== null ? txt.narrator 
      : 
      texts === 'narrator' && txt.narrators !== null ? txt.narrators 
      : 
      txt.rating;

      //Map over tags to separate 
      if(texts === 'tags'){
        v.map((t) => {
          arr.push(t);
        })
        //Map over narrator to separate 
      }else if(texts === 'narrator' && txt.narrators !== null){
        v.map((t) => {
          arr.push(t);
        })
      }else if(texts === 'narrator' && txt.narrator === null && txt.narrators === null){

      }else {
        arr.push(v);
      }
    })
    let count = 0;
    const lengthshortened = arr.length - 2;
    const length = arr.length - 1;
    let uniquearr = [...new Set(arr)];
    uniquearr.forEach((t, i) => {
      arr.filter((d, index2) => {
        if(index2 <= lengthshortened) {
          if(t === d) {
            count = count + 1;
          }else { 
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
    if(asideVersion === 'tags'){
      blogs.map((post) => {
        post.tags.filter(t => {
          if(q === t){
            newPosts.push(post);
          }
        })
      })
    }else if(q === 1 || q === 2 || q === 3 || q === 4 || q === 5 ) {
      blogs.map((post) => {
        if(post.rating === q){
          return newPosts.push(post);
        }
      })
    }else if(asideVersion === 'narrator'){
      blogs.map((post) => {
        if(post.narrator !== null && post.narrator.toLowerCase().includes(q.toLowerCase())){
          return newPosts.push(post)
        }else if(post.narrators !== null){
          post.narrators.map((e) => {
            if(e.toLowerCase().includes(q.toLowerCase())){
              return newPosts.push(post)
            }
          })
        }
      })
    }else {
      blogs.map((post) => {
        if(post.title.toLowerCase().includes(q.toLowerCase()) ||
        (post.author &&
          post.author.toLowerCase().includes(q.toLowerCase())) ||
        (post.tags &&
          post.tags.join('').toLowerCase().includes(q.toLowerCase()))){
            return newPosts.push(post);
          }
      });
    }
    console.log(q)
    setPosts(newPosts);
    if(q === "" || q === "none"){
      setPosts(blogs);
      setAside('author');
    }
    // set the component's state with our newly generated query and list variables
  };
  const filteredHeader = () => {
    if(query === 'emptyQuery' || query === 'none'){
      return;
    }else{
      return `Filter: ${query}`
    }
  }

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
      <button value='none' onClick={(e) => filterPosts(e)} type='button'>Reset</button>
      {/* <button type="submit" onClick={(e) => filterPosts(e)}> Search </button> */}
      </form>
      <div className="query"><h1>{filteredHeader()}</h1></div>
      <div className="flex">
      <ol>
        {posts.map(post => {
          const title = post.title || post.slug;

          //color changes based on rating score
          const classNames = post.rating === 5 ? 'green' : 
            post.rating >= 3 ? 'yellow' : 'red';

            //changes narrator singular to ensemble for multiple
            const narrator = post.narrator !== null ? `Narrated By: ${post.narrator}` :post.narrator === null && post.narrators === null ? 'Written Word' : 'Narratored By: Ensemble';
          
          let image = getImage(post.image);
          const tags = post.tags !== undefined ? post.tags.map((tag) => {
                      return (
                        <small className={tag}>
                        -{tag} { }
                        </small>
                      )
                    }) : 'Uncatagorized';
          return (
            <li key={post.slug} className='flex'>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.slug} itemProp="url">
                    <GatsbyImage image={image} 
                    alt=""
                    className="book-cover-home" /> <br />
                      <span itemProp="headline" className="headline" key={post.slug}>{title}</span>
                    </Link>
                  </h2>
                  <p className="biline">{post.biline}{post.series}</p>
                  <p className="author">Written by: {post.author}</p>
                  <p className="narrator">{narrator}</p>
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
          </div>
          <div id='narrators'>
            <div className={asideVersion === 'narrator' ? 'tab selected' : 'tab'}
              onClick={()=> {
                setAside('narrator');
                asideText('narrator');
              }}>
                <small>Narrators</small>
            </div>
          </div>
          <div id='tags'>
            <div className={asideVersion === 'tags' ? 'tab selected' : 'tab'}
            onClick={()=> {
                setAside('tags');
                asideText('tags');
              }}>
                <small>Tags</small>
            </div>
          </div>
          <div id='rating'>
            <div className={asideVersion === 'rating' ? 'tab selected' : 'tab'}
            onClick={()=> {
                setAside('rating');
                asideText('rating');
              }}>
                <small>Rating</small>
            </div>
          </div>
            <div className="data">
              {final.map((t, i) => {
                return (
                  <div className="data-container">
                    <li value={t.name} className={query === t.name ? "aside-list-item selected" : "aside-list-item"} onClick={(e) => filterPosts(e)}>
                      {t.name}
                    </li>
                    <small>
                        ({t.count})
                    </small>
                  </div>
                )
              })}
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
