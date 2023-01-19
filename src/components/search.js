import React from "react";



const Search = ({ filter, clear }) => {
    return (
        <form name="search" rel="search" id="searchForm" className='search' data-test="search-form">
            <input className="searchInput"
                type="search"
                aria-label="Search"
                placeholder="Filter blog posts by title or tag"
                onChange={(e) => filter(e)}
                data-test="search-input"
                id="search-input">

            </input>
            <button value='none' onClick={(e) => clear(e)} type='button'
            data-test="search-btn">Reset</button>
        </form>
        )
}

export default Search;