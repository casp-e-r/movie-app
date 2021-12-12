import React, { useContext, useState, useEffect } from 'react'
import './ViewMovie.css'
import { TvContext } from '../../context';
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'
import unknown from "../../images/unknown.jpg"
import { useLocation } from 'react-router'
import { useHistory } from "react-router-dom";




function ViewMovie() {


    const [country, setCountry] = useState('')
    const [cast, setCast] = useState([])
    const [movie, setMovie] = useState([])
    //const [seasons, setSeasons] = useState([])

    const { setTv } = useContext(TvContext)
    //to get Tv or Movie
    const location = useLocation()
    const state = location.state.update
    //console.log(state.isTv);
    let history = useHistory()

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
    }, [ID, TvMovie])
    useEffect(() => {
        if (movie && state.isTv) {
            setTv(movie)
        }
    })
    useEffect(() => {
        if (movie.origin_country && movie.origin_country.length !== 0) {
            axios.get(`/configuration/countries?api_key=${API_KEY}`).then(res => {
                let c = res.data
                console.log(res.data);
                let obj = c.find(o => o.iso_3166_1 === movie.origin_country[0])
                // console.log(movie.origin_country.length);
                setCountry(obj.english_name)
            }).catch()
        }
        // axios.get(`/${TvMovie}/${ID}}/images?api_key=${API_KEY}&language=en-US&include_image_language=en,null`).then(res=>{
        //     console.log(res.data);
        // })
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

    }, [ID, TvMovie, country,movie.origin_country])
    // useEffect(() => {
    //     if (state.isTv && movie.seasons) {
    //         const obj = movie.seasons.map((obj, index) => {
    //             return { 'no': index + 1, 'Date': obj.air_date, 'episodes': obj.episode_count };


    //         });
    //         setSeasons(obj)
    //     }

    // })
    // console.log(movie.seasons);
    console.log(movie);

    return (
        <div className="details-container" >
            <div className="inner-container-1">
                <div className='viewbanner'>
                    <img src={imageUrl + movie.backdrop_path}></img>
                    
                </div>
                <div className='view-details-container'>
                        <div className='back'>
                            <h1>back</h1>
                        </div>
                        <div className='view-details-wrapper'>
                            <div className='view-poster'>
                                <img src={`${imageUrl}${movie.poster_path}`} alt={unknown}></img>
                            </div>
                            <div className='view-details'>
                                <div className='view-name'>
                                    <h1>{movie ? movie.name || movie.original_name || movie.title : ""}</h1>
                                </div>
                                {movie.tagline &&
                                <div >
                                    <p>{movie.tagline}</p>
                                </div>
                                }
                                <div style={{display:'flex'}}>
                                    {movie.genres && movie.genres.map(e=>
                                    {return<p>{e.name}</p>})}
                                </div>
                                <div className='view-rating-genre'>
                                        <p>rating :{movie.vote_average}</p>
                                </div>
                                <div className='view-overview'>
                                    <label>Overview</label>
                                    <h5>{movie.overview}</h5>
                                </div>
                                <div className='view-btns'>
                                    <button>trailer</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className='inner-container-2'>
                <div className='view-more-info'>

                    <div>
                        <p>release date</p>
                        <p>{movie.first_air_date}</p>
                    </div>
                    <div>
                        <p>home page</p>
                        <a href={movie.homepage} target="_blank" rel="noopener noreferrer">h</a>
                    </div>
                    <div>
                        <p>genres</p>
                        {movie.genres && movie.genres.map(e=>
                            {return<p>{e.name}</p>})}
                    </div>
                    <div>
                        <p>language</p>
                        <p>{movie.original_language}</p>
                    </div>
                    <div>
                        <p>runtime/no of seasons</p>
                    </div>
                    <div>
                        <p>origin country</p>
                        {country && <p>{country}</p>}
                        {/* tv only */}
                    </div>
                    <div> 
                        {movie.networks && movie.networks.map(e=>
                            {return<div>
                                 <img src={imageUrl + e.logo_path} width='90px'/>
                                </div>})}
                    </div>
                </div>
                
                <div className='view-cast-creator'>
                {movie.created_by && 
                    <div className='creator'>
                            {movie.created_by.map(e=>{return<div className='profile-img'>
                                    <p>{e.name}</p>
                                    <img  src={imageUrl + e.profile_path} alt='' /> 
                                 </div>})}
                    </div>}
                    
                    <div className="cast">
                    {cast.slice(0,10).map(obj =>
                        <div className='profile-img' >
                            {obj.img ? <img src={`${imageUrl}${obj.img}`} alt='' /> : <img src={unknown} alt='' />}
                            <p>{obj.name}</p>
                            <p>{obj.character}</p>
                        </div>
                    )}
                    </div>
                    
                    
                </div>
            </div>
                {/* <div className="movie-details">
                     */}
                    {/* <div className='movie-details-info'>
                        <h1>{movie ? movie.name || movie.original_name || movie.title : ""}</h1>
                        <label >Overview</label>
                        <h5>{movie.overview}</h5>
                        
                        <div className='btn'>
                            <button>mm</button>
                            <button>mm</button>
                        </div>
                    </div> */}
                {/* </div> */}
                {/* <div className='movie-details-2'>
                    <div className='movie-details-info-2'>
                        <div>
                            <label >Release Date</label>
                            <p>{movie.first_air_date || movie.release_date}</p>
                        </div>
                        <div>
                            <p>Rating</p>
                            <p>{movie.vote_average}</p>
                        </div>
                    </div>
                    <div>

                    </div>

                </div> */}
    
                    
                    {/* <div className="movie-details-poster">
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

                                            {obj.img ? <img src={`${imageUrl}${obj.img}`} alt='' /> : <img src={unknown} alt='' />}
                                            <p>{obj.name}</p>
                                            <p>{obj.character}</p>
                                        </div>
                                    )}
                                </div>}
                        </div>
                    </div> */}


                
            {/* </div>   */}
        </div>

    )
}
export default ViewMovie