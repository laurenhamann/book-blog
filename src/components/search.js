import React from "react";



const Search = ({ filter }) => {
    console.log(filter)
    return (
        <form name="search" rel="search" id="searchForm" className='search'>
            <input className="searchInput"
                type="search"
                aria-label="Search"
                placeholder="Filter blog posts by title or tag"
                onChange={(e) => filter(e)}>

            </input>
            <button value='none' onClick={(e) => filter(e)} type='button'>Reset</button>
        </form>
        )
}

export default Search;