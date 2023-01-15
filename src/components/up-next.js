import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import useNext from "../hooks/use-next";

const UpNext = () => {
    const blogs = useNext();
    const [posts, setPosts] = useState(blogs);
    return (
        <div className="up-next-container">
        <h4> On My Shelf </h4>
            <div className="shelf-container">
                {posts.map((f) => {
                    let image = getImage(f.image);
                    return (
                        <Link to={f.slug} itemProp="url">
                        <GatsbyImage image={image} 
                        alt=""
                        className="book-cover-home up-next" />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default UpNext;