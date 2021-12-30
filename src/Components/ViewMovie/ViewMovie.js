import React, { useContext, useState, useEffect } from 'react'
import './ViewMovie.css'
import { TvContext } from '../../context';
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'
import unknown from "../../images/unknown.jpg"
import { useLocation } from 'react-router'
import { useHistory } from "react-router-dom";
import Trailer from './Trailer/Trailer';
import Row from '../Row/Row';




function ViewMovie() {

    const [country, setCountry] = useState('')
    const [recommend, setRecommend] = useState([])
    const [cast, setCast] = useState([])
    const [movie, setMovie] = useState([])
    const { setTv } = useContext(TvContext)
    const location = useLocation()
    let history = useHistory()
    const isTv=JSON.parse(window.localStorage.getItem('show'))   
    const ID = location.state.id
    const [TvMovie, setTvMovie] = useState('tv')
    
    useEffect(() => {
        
        if (isTv ===1 ) {
            setTvMovie('tv')
            // isTv=true
        } else if(isTv===0) {
            setTvMovie('movie')
            // isTv=false   
        }
    }, [isTv,setTvMovie])
    useEffect(() => {
        axios.get(`/${TvMovie}/${ID}?api_key=${API_KEY}&language=en-US`).then(res => {
            setMovie(res.data)
        }).catch()
    }, [ID, TvMovie,isTv])
    useEffect(() => {
        if (movie && isTv) { //state.isTv
            setTv(movie)
        }
    })
    
    
    useEffect(() => {
        if (movie.origin_country && movie.origin_country.length !== 0) {
            axios.get(`/configuration/countries?api_key=${API_KEY}`).then(res => {
                let c = res.data
                let obj = c.find(o => o.iso_3166_1 === movie.origin_country[0])
                setCountry(obj.english_name)
            }).catch(err=>console.log(err))
        }
        // axios.get(`/${TvMovie}/${ID}}/images?api_key=${API_KEY}&language=en-US&include_image_language=en,null`).then(res=>{
        //     console.log(res.data);
        // })
        
        axios.get(`/${TvMovie}/${ID}/recommendations?api_key=${API_KEY}&language=en-US&page=1`).then(e=>{
            setRecommend(e.data.results)
        })
        //cast :seperate for tv and movie to get 'character name'
        axios.get(`/${TvMovie}/${ID}/${isTv===1 ? 'aggregate_' : ''}credits?api_key=${API_KEY}&language=en-US`).then(res => {
            // console.log(res.data);
            if (isTv===1) { //state.isTv
                let obj = res.data.cast.map(o => {
                    let ob = o.roles.map(ob => { return (ob.character) })
                    return ({
                        'name': o.original_name,
                        'character': ob[0],
                        'img': o.profile_path})
                })
                setCast(obj)
            }else{
                let obj = res.data.cast.map(o => {
                    return ({
                        'name': o.original_name,
                        'character': o.character,
                        'img': o.profile_path})
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
                                    {/* <button>trailer</button> */}
                                    <Trailer 
                                    ID={ID} 
                                    TvMovie={TvMovie}
                                    releaseYear={movie?.release_date || movie.first_air_date ||'0'}
                                    name={movie ? movie.name || movie.original_name || movie.title : ""}
                                    />

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
                    <h1>created by</h1>
                {movie.created_by && 
                    <div className='creator'>
                            {movie.created_by.map(e=>{return<div className='profile-img'>
                                    <p>{e.name}</p>
                                    <img  src={imageUrl + e.profile_path} alt='' /> 
                                 </div>})}
                    </div>}
                    <h1>cast</h1>
                    <div className="cast">
                    {cast &&cast.slice(0,10).map(obj =>
                        <div className='profile-img' >
                            {obj.img ? <img src={`${imageUrl}${obj.img}`} alt='' /> : <img src={unknown} alt='' />}
                            <p>{obj.name}</p>
                            <p>{obj.character}</p>
                        </div>
                    )}
                    </div>
                    
                    
                </div>
            </div>
            <div className='inner-container-3'>
                <>
                    <Row title={'reccommended'} url={`/${TvMovie}/${ID}/recommendations?api_key=${API_KEY}&language=en-US&page=1`} more={false}/>
                </>
            </div>
        </div>

    )
}
export default ViewMovie