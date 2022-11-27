import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import useFilter from '../hooks/use-filter'


export default function RatingFilter() {
    const [fullPostList, setFullPostList] = React.useState([]);
    const localSitePosts = useFilter();
    const getAndFormatAllPosts = (posts) => {
        const postList = posts.allMarkdownRemark.nodes.map(post => ({
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
        setFullPostList(postList);
    }

    React.useEffect(() => {
        getAndFormatAllPosts(localSitePosts);
    }, []);

    const emptyQuery = '';
    const [state, setState] = React.useState({
        filteredPostList: [],
        query: emptyQuery
    });

    const filterPosts = (event) => {
        const query = event.target.value;
        const filteredPostList = fullPostList.filter((post) => {
            return (
                post.title.toLowerCase().includes(query.toLowerCase()) || (post.subTitle && post.subTitle.toLowerCase().includes(query.toLowerCase())) || (post.tags && post.tags.join('').toLowerCase().includes(query.toLowerCase()))
            );
        });
        setState({
            query,
            filteredPostList
        });
    }

    const { filteredPostList, query } = state;
    const hasSearchResults = filteredPostList && query !== emptyQuery;
    const posts = hasSearchResults ? filteredPostList : fullPostList;

    return (
        <>
            {!posts.length && query === emptyQuery && (
                <span className='post-wrapper'>
                    <span className='post-search-wrapper page-body'>
                        <input 
                            className='searchInput' 
                            type='search'
                            aria-label='Search'
                            placeholder='Filter blog posts by title or tag'
                            onChange={(e) => filterPosts(e)}>
                            </input>
                    </span>
                    <div className='posts-wrapper wide-page-body'>
                    {posts.map(post => {
                        const title = post.title || post.slug;
                        const classNames = post.rating === 5 ? 'green' : 
                            post.rating >= 3 ? 'yellow' : 'red';
                        
                        let image = getImage(post.image);
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
                                    {post.tags.map((tag) => {
                                    return (
                                        <small className={tag}>
                                        {tag} { }
                                        </small>
                                    )
                                    })}
                                </header>
                            </article>
                            </li>
                        )
                        })}
                    </div>
                </span>
            )}
        </>
    );
}



// export const query = graphql`
//     fragment PostFragments on MarkdownRemark {
//         frontmatter {
//             author
//             biline
//             blogauthor
//             date(formatString: "MMMM DD, YYYY")
//             description
//             rating
//             series
//             tags
//             title
//             img {
//             childImageSharp {
//                 gatsbyImageData(blurredOptions: {width: 150}, height: 200, width: 200)
//             }
//             }
//             omit
//         }
//         excerpt(pruneLength: 50)
//         fields {
//                 slug
//             }
// }`