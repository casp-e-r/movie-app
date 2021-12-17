import React from 'react'
import  Row  from "../Row/Row";
import  requests  from "../../requests";
import  './C.css'

function Movie() {


    return (
        <div>
            <Row title='Popular' url={requests.movie.Popular} isLarge />
            <Row title='Top Rated' url={requests.movie.TopRated} isLarge/>
            <Row title='Latest' url={requests.movie.Latest} />
            

            <Row title='Action' url={requests.movie.Drama} />
            <Row title='Comedy' url={requests.movie.Comedy} />
            <Row title='Drama' url={requests.movie.Drama} />
            <Row title='Horror' url={requests.movie.Horror} />
            <Row title='Romance' url={requests.movie.Romance} />
            <Row title='Scifi' url={requests.movie.Scifi} />
            <Row title='Animation' url={requests.movie.TvMovie} />


        </div>
    )
}

export default Movie
