import React from 'react'
import  Row  from "../Row/Row";
import  requests  from "../../requests";
import  './C.css'
import axios from '../../axios';
import { API_KEY } from '../../constants/constants';

function Movie() {

    
    return (
        <div>
            <Row title='Popular' url={requests.movie.Popular} isLarge />
            <Row title='Top Rated' url={requests.movie.TopRated} />
            {/* <Row title='Latest' url={requests.movie.Latest} /> */}
            
            <Row title='Adventure' url={requests.movie.Adventure} />
            <Row title='Action' url={requests.movie.Action} />
            <Row title='Thriller' url={requests.movie.Thriller} />
            <Row title='Crime' url={requests.movie.Crime} />
            <Row title='Drama' url={requests.movie.Drama} />
            <Row title='History' url={requests.movie.History} />
            <Row title='Horror' url={requests.movie.Horror} />
            <Row title='Romance' url={requests.movie.Romance} />
            <Row title='Scifi' url={requests.movie.Scifi} />
            <Row title='War' url={requests.movie.War} />

            <Row title='Animation' url={requests.movie.TvMovie} />


        </div>
    )
}

export default Movie
