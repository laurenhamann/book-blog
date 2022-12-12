import * as React from "react"
import { Link, graphql } from "gatsby"
import '../sass/styles.scss'
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import useBlogs from "../hooks/use-blogs"
import Header from "../components/header"

const BlogIndex = ({ data, location }) => {
  const blogs = useBlogs();
  const siteTitle = data.site.siteMetadata.title;
  const [posts, setPosts] = React.useState(blogs);
  const [query, setQuery] = React.useState('emptyQuery');
  const [asideVersion, setAside] = React.useState('author');
  //const [asideTxt, setAsideTxt] = React.useState();
  const [scrolling, setScrolling] = React.useState(false);
  const [scrollTop, setScrollTop] = React.useState(0);
  let final = [];

  React.useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  function asideText (texts) {
    let arr = [];

    // if author then return author ~ if tags then return tags ~ if narrator and not null return narrator ~ if narrator and narrators not null return narrators ~ if rating return rating

    blogs.map((txt, i) => {
      let v;

      if(texts === 'author'){
        v = txt.author
      }else if(texts === 'tags' || texts === 'favorites'){
        v = txt.tags
      }else if(texts === 'narrator' && txt.narrator !== null ) {
        v = txt.narrator 
      }else if(texts === 'narrator' && txt.narrators !== null){
        v = txt.narrators
      }else if(texts === 'rating'){
        v = txt.rating
      }else if(texts === 'superlatives' && txt.superlative !== null){
        v = txt.superlative
      }else {
        return;
      }

      //if V is an array seperate it and push to arr. 
      if(Array.isArray(v)){
        v.map((t, i) => {
          arr.push(t);
        }) 
      }else {
        arr.push(v);
      }
      return;
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
    final.sort((a, b) => b.count - a.count);
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
    }else if(asideVersion === 'favorites'){
      blogs.map((post) => {
        post.tags.filter(t => {
          if(q === t && post.score !== null){
            newPosts.push(post);
          }
        })
      })
      const sorted = newPosts.sort((a, b) => b.score - a.score);

    }else if(asideVersion === 'superlatives'){
      blogs.map((post) => {
        if(post.superlative !== null) {
          if(post.superlative.toLowerCase().includes(q.toLowerCase())){
            return newPosts.push(post)
          }
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
    }else if(asideVersion === 'favorites'){
      return `My Top 5 - ${query}`
    }else {
      return `Filter: ${query}`
    }
  }

  return (
    <Layout location={location} title={siteTitle} scroll={scrolling} filterPosts={filterPosts}>
      {/* <form name="search" rel="search" id="searchForm" className='search'>
      <input className="searchInput"
              type="search"
              aria-label="Search"
              placeholder="Filter blog posts by title or tag"
              onChange={(e) => filterPosts(e)}>

      </input>
      <button value='none' onClick={(e) => filterPosts(e)} type='button'>Reset</button>
      </form> */}
      <div className="query"><h1>{filteredHeader()}</h1></div>
      <div className="flex">
      <ol>
        {posts.map((post, i) => {
          const title = post.title || post.slug;
          //get book image
          let image = getImage(post.image);
          const key = `${post.slug}${i}`;
          if(asideVersion === 'favorites'){
            if(i <= 4){
              return (
              <li key={post.slug} className='flex'>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
                key={key}
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
                  <p className="score">rating:{post.score} </p>
                </header>
              </article>
            </li>
              )
            }else {
              return;
            }
          }else {
            //color changes based on rating score
          const classNames = post.rating === 5 ? 'green' : 
            post.rating >= 3 ? 'yellow' : 'red';

            //changes narrator singular to ensemble for multiple
            const narrator = 
            post.narrator !== null 
            ? 
            <p className="narrator">Narrated By: {post.narrator}</p> 
            : post.narrator === null && post.narrators === null 
            ? 
            ''
            : 
            <p className="narrator">Narratored By: Ensemble</p> ;


            const rated = 
            <small className={classNames}> Rating: {post.rating} out of 5</small>;
          const read =  <small className="date">Date Read: {post.date}</small>;

          const authors = <p className="author">Written by: {post.author}</p>;
            //series or byline 
            const either = 
            post.series !== null 
            ? 
            <p className="series">{post.series}</p> 
            : 
            post.biline !== null 
            ? 
            <p className="byline">{post.biline}</p> 
            : '';

          // get tags
          const tags = post.tags !== undefined ? post.tags.map((tag) => {
                      return (
                        <small className={tag}>
                        -{tag} { }
                        </small>
                      )
                    }) : 'Uncatagorized';

          const html = [authors, either, narrator, read, rated, tags]

          return (
            <li key={post.slug} className='flex'>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
                key={key}
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
                  {html.map((d) => {
                return d
              })}
                </header>
              </article>
            </li>
          )

          }
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
          <div id='Superlatives'>
            <div className={asideVersion === 'superlatives' ? 'tab selected' : 'tab'}
            onClick={()=> {
                setAside('superlatives');
                asideText('superlatives');
              }}>
                <small>Most Likely to</small>
            </div>
          </div>
          <div id='favorites'>
            <div className={asideVersion === 'favorites' ? 'tab selected' : 'tab'}
            onClick={()=> {
                setAside('favorites');
                asideText('favorites');
              }}>
                <small>Favorites</small>
            </div>
          </div>
            <div className="data">
              {final.map((t, i) => {
                const key = `${t.name}+${i}`;
                if(asideVersion === 'favorites'){
                  return (
                  <div className="data-container" key={key}>
                    <li value={t.name} className={query === t.name ? "aside-list-item selected" : "aside-list-item"} onClick={(e) => filterPosts(e)}>
                      {t.name}
                    </li>
                    <small>
                        (Top 5)
                    </small>
                  </div>
                )
                }else {
                return (
                  <div className="data-container" key={key}>
                    <li value={t.name} className={query === t.name ? "aside-list-item selected" : "aside-list-item"} onClick={(e) => filterPosts(e)}>
                      {t.name}
                    </li>
                    <small>
                        ({t.count})
                    </small>
                  </div>
                )
                }
              })}
            </div>
      </aside>
      </div>
      <Bio />
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
