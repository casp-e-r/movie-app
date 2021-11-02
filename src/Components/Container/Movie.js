import React from 'react'
import  Row  from "../Row/Row";
import  requests  from "../../requests";
import  './C.css'

function Movie() {
    return (
        <div>
            <Row title='action' url={requests.Action} />
            <Row title='Drama' url={requests.Drama} />
        </div>
    )
}

export default Movie
