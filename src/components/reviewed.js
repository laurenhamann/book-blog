import React from "react";


const Review = ({ review }) => {
    console.log(review)
    const div = {
        dot: '.',
        h2: 'Typing'
    }
    const html = `<h2>${div.h2}</h2><span>${div.dot}</span><span>${div.dot}</span><span>${div.dot}</span>`;
    return (
        <div id="isReviewed" dangerouslySetInnerHTML={{ __html: html }}></div>
    )
}


export default Review;