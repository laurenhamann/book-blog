import React from "react";
import useBlogs from "../hooks/use-blogs";
import { Link } from "gatsby";
const PrevReads = ({data, title}) => {
const author = data;
const tit = title;
const blogs = useBlogs();
let count = 0;
const map = blogs.map((b, i) => {
    if(author === b.author && tit !== b.title ){
        count = count + 1;
        return <Link to={b.slug} itemProp="url">
                <p>{b.title}</p>
                </Link>
    }
})

// const h = () => {
//     if(count == 0){
//         console.log('in 0')
//         return <p> This is my first read by {data}</p>
//     }else{
//         console.log('in 1')
//         return  <>
//                     <h2> Previous reads from {data}</h2>
//                     {map}
//                 </>
//     }
// }
const h = count == 0 ? <h2> This is my first read by {data}</h2> : <>
<h2> Previous reads from {data}</h2>
{map}
</>;

return (
    <div className="prev-reads">
        {h}
    </div>
)
}


export default PrevReads