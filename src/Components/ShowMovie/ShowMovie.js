import React, { useContext, useState, useEffect } from 'react'
import './ShowMovie.css'
import  { TvContext } from '../../context';
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'
import unknown from "../../images/unknown.jpg"
import { useLocation } from 'react-router'


function ShowMovie() {
    

    const [country, setCountry] = useState('')
    const [cast, setCast] = useState([])
    const [movie, setMovie] = useState([])
    //const [seasons, setSeasons] = useState([])

    const {setTv} = useContext(TvContext)
    //to get Tv or Movie
    const location = useLocation()
    const state = location.state.update
    //console.log(state.isTv);

    const ID = location.state.id
    let TvMovie
    if (state.isTv) {
        TvMovie = 'tv'

    } else {
        TvMovie = 'movie'
    }
    useEffect(() => {
        axios.get(`/${TvMovie}/${ID}?api_key=${API_KEY}&language=en-US`).then(res => {
            setMovie(res.data)
            

        }).catch()
    }, [ID,TvMovie])
    useEffect(() => {
        if(movie && state.isTv){
            setTv(movie)    
        }
    })



    useEffect(() => {
        if (movie.origin_country && movie.origin_country.length !== 0) {
            axios.get(`/configuration/countries?api_key=${API_KEY}`).then(res => {
                let country = res.data

                let obj = country.find(o => o.iso_3166_1 === movie.origin_country[0])
                // console.log(movie.origin_country.length);
                setCountry(obj.english_name)
            }).catch()
        }


        //cast :seperate for tv and movie to get 'character name'
        axios.get(`/${TvMovie}/${ID}/${state.isTv ? 'aggregate_' : ''}credits?api_key=${API_KEY}&language=en-US`).then(res => {
            //console.log(res.data.cast);
            if (state.isTv) {
                let obj = res.data.cast.map(o => {
                    let ob = o.roles.map(ob => { return (ob.character) })
                    return ({
                        'name': o.original_name,
                        'character': ob[0],
                        'img': o.profile_path
                    })
                })
                setCast(obj)
            } else {
                let obj = res.data.cast.map(o => {
                    return ({
                        'name': o.original_name,
                        'character': o.character,
                        'img': o.profile_path
                    })
                })
                setCast(obj)
            }
        }).catch()

    }, [ID, TvMovie, country])
    // useEffect(() => {
    //     if (state.isTv && movie.seasons) {
    //         const obj = movie.seasons.map((obj, index) => {
    //             return { 'no': index + 1, 'Date': obj.air_date, 'episodes': obj.episode_count };


    //         });
    //         setSeasons(obj)
    //     }

    // })
    // console.log(movie.seasons);

    return (
        <div className="details-container" >
            <div className="inner-container">
                <div style={{ backgroundImage: `url(${imageUrl}${movie.backdrop_path})` }} className="moviebanner"  ><div className="fade-bottom"></div></div>

                <div className="movie-details">
                    <div className="movie-details-poster">
                        <img src={`${imageUrl}${movie.poster_path}`} alt=''></img>
                    </div>
                    <div className="movie-details-info">
                        <h1>{movie ? movie.name || movie.original_name || movie.title : ""}</h1>
                        <label >Overview</label>
                        <h5>{movie.overview}</h5>
                        <label >Release Date</label>
                        <p>{movie.first_air_date || movie.release_date}</p>
                        <p>{movie.vote_average}</p>
                        
                        {country && <p>origin country :{country}</p>}
                        
                        <div className="cast-container">
                            <h2>Cast</h2>
                            {movie && cast &&

                                <div className="cast-inner-container">

                                    {cast.map(obj =>
                                        <div className="cast">

                                            {obj.img ? <img src={`${imageUrl}${obj.img}`} alt='' /> : <img src={unknown} alt=''/>}
                                            <p>{obj.name}</p>
                                            <p>{obj.character}</p>
                                        </div>
                                    )}
                                </div>}
                        </div>
                    </div>
                    

                </div>
            </div>
        </div>

    )
}
export default ShowMovie