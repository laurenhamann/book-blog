import React from 'react'
import { Link } from 'gatsby'



const Header = (props) => {
    return (

        <header className="global-header">{props.header}</header>
    )
}

export default Header;