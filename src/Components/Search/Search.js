import React from 'react'
import { useLocation, useParams } from 'react-router'
import './Search.css'

function Search() {
    const location=useLocation()
    // const query=location.state.query
    const {query}=useParams()
    console.log(query);
    return (
        <div>
            
        </div>
    )
}

export default Search
