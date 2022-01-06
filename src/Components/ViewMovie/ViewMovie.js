import React, { useContext, useState, useEffect } from 'react'
import './ViewMovie.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'
import unknown from "../../images/unknown.jpg"
import { useLocation, useParams } from 'react-router'
import { useHistory } from "react-router-dom";
import Trailer from './Trailer/Trailer';
import Row from '../Row/Row';
import {IoIosReturnLeft} from 'react-icons/io'
import {AiOutlineGlobal} from 'react-icons/ai'
import Cast from './Cast/Cast';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css'




function ViewMovie() {

    const [country, setCountry] = useState('')
    const [cast, setCast] = useState([])
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    let history = useHistory()
    const isTv=JSON.parse(window.localStorage.getItem('show'))   
    const ID = location.state.id
    const [TvMovie, setTvMovie] = useState('tv')
    useEffect(() => {
        location && window.scrollTo(0, 0);
        // const unlisten = history.listen(() => {
        //     window.scrollTo(0, 0);
        //   });
        //   return () => {
        //     unlisten();
        //   }
        return()=>{
            window.scrollTo(0,0)
        }
      
      }, [location,ID]);
    useEffect(() => {
        if (isTv ===1 ) {
            setTvMovie('tv')
        } else if(isTv===0) {
            setTvMovie('movie')  
        }
    }, [isTv,setTvMovie])
    useEffect(() => {
        async function fetch(){
            try{
                await axios.get(`/${TvMovie}/${ID}?api_key=${API_KEY}&language=en-US`).then(res => {   
                    setMovie(res.data)
                })
            }catch(e){
                console.log(e);
            }finally{
                
                setLoading(false)
            }
        }
        fetch()
        // axios.get(`/${TvMovie}/${ID}?api_key=${API_KEY}&language=en-US`).then(res => {
        //     setMovie(res.data)
        // }).catch(err=>console.log(err))
    }, [ID, TvMovie,isTv])
    // useEffect(() => {
    //     if (movie && isTv) { //state.isTv
    //         setTv(movie)
    //     }
    // })
    
    
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
        //cast :seperate for tv and movie to get 'character name'
        axios.get(`/${TvMovie}/${ID}/${isTv===1 ? 'aggregate_' : ''}credits?api_key=${API_KEY}&language=en-US`).then(res => {
            // console.log(res.data);
            if (isTv===1) { //state.isTv
                let obj = res.data.cast.map(o => {
                    let ob = o.roles.map(ob => { return (ob.character) })
                    return ({
                        'name': o.original_name,
                        'character': ob[0],
                        'img': o.profile_path,
                        'gender':o.gender
                    })
                })
                setCast(obj)
            }else{
                let obj = res.data.cast.map(o => {
                    return ({
                        'name': o.original_name,
                        'character': o.character,
                        'img': o.profile_path,
                        'gender':o.gender
                    })
                })
                setCast(obj)
            }
        }).catch(err=>console.log(err))
    }, [ID, TvMovie, country,movie.origin_country])
    // useEffect(() => {
    //     if (state.isTv && movie.seasons) {
    //         const obj = movie.seasons.map((obj, index) => {
    //             return { 'no': index + 1, 'Date': obj.air_date, 'episodes': obj.episode_count };
    //         });
    //         setSeasons(obj)
    //     }
    // })
    console.log(movie,imageUrl);
    

    return (
        <div>
           <SkeletonTheme borderRadius={3} duration={1.5} baseColor='#212121' highlightColor='#575757'> 

        
        <div className="details-container" >
            <div className="inner-container-1">
                <div className='viewbanner'>
                    <LazyLoadImage 
                        effect='opacity'
                     src={imageUrl + movie.backdrop_path}
                     height={'100%'} width={'100%'}/>
                    {/* <img src={imageUrl + movie.backdrop_path}></img>  */}
                    
                    
                </div>
                <div className='view-details-container'>
                        {loading? null :<div className='back'
                               onClick={history.goBack} 
                                >
                                <IoIosReturnLeft size={50}/>
                                <h1> back</h1>       
                        </div>}
                        <div className='view-details-wrapper'>
                            <div className='view-poster'>
                            {loading ? <Skeleton width={'100%'} height={'100%'}/>:
                            <LazyLoadImage 
                            effect='opacity'
                            src={imageUrl + movie.poster_path}
                            />
                            //  <img src={`${imageUrl}${movie.poster_path}`} alt={unknown}></img>
                             }
                            </div>
                            <div className='view-details'>
                                <div className='view-name'>
                                    {loading ? <Skeleton width={'20%'} height={'5%'}/>:
                                    <h1>{movie ? movie.name || movie.original_name || movie.title : ""}</h1>}
                                </div>
                                {movie.tagline &&
                                <div className='tagline' >
                                    <p>{movie.tagline}</p>
                                </div>
                                }
                                <div className='genres'>
                                    {movie.genres && movie.genres.map(e=>
                                    {return<p>{e.name}</p>})}
                                </div>
                                <div className='view-rating-genre'>
                                {!loading && <p>rating :{movie.vote_average}</p>}
                                </div>
                                {loading? <Skeleton count={5} width={'50%'} height={4}/>:<div className='view-overview'>
                                    <label>Overview</label>
                                    <h4>{movie.overview}</h4>
                                </div>}
                                <div className='view-btns'>
                                    {loading ? <Skeleton  width={'20%'} height={40}/>:<Trailer 
                                    ID={ID} 
                                    TvMovie={TvMovie}
                                    releaseYear={movie?.release_date || movie.first_air_date ||'0'}
                                    name={movie ? movie.name || movie.original_name || movie.title : ""}
                                    />}

                                </div>
                            </div>
                        </div>
                </div>
            </div>
            {loading ? null :<div className='inner-container-2'>
                <div className='view-more-info'>

                    <div>
                        <h5>release date</h5>
                        {isTv ? <p>{movie.first_air_date}</p>:<p>{movie.release_date}</p>}
                    </div>
                    {movie.homepage && movie.homepage.length!=0 ? <div>
                        <h5>home page</h5>
                        <a href={movie.homepage} target="_blank" rel="noopener noreferrer"><AiOutlineGlobal
                        style={{color:'#fff'}}/></a>
                    </div>:null}
                    <div>
                        <h5>genres</h5>
                        {movie.genres && movie.genres.map(e=>
                            {return<p>{e.name}</p>})}
                    </div>
                    <div>
                        <h5>language</h5>
                        <p>{movie.original_language}</p>
                    </div>
                    
                        {isTv ? <div>
                            <h5>number of seasons</h5>
                            <p>{movie.number_of_seasons}</p>
                            </div>
                            :<div> 
                                <h5>runtime</h5>
                                <p>{movie.runtime} minutes</p>
                            </div>}
                        
                    
                    {isTv ? <div>
                        <h5>origin country</h5>
                        {country && <p>{country}</p>}
                        {/* tv only */}
                    </div>:null}
                     
                    {movie.networks && movie.networks.map(e=>
                            {return<div>
                                 <img src={imageUrl + e.logo_path} width='90px'/>
                                <p>{e.name}</p>
                                </div>})}
                   
                </div>
                <Cast creator={movie.created_by} cast={cast}/>
            </div>}
            {loading ? null : <div className='inner-container-3'>
                <>
                    <Row title={'Reccommended'} url={`/${TvMovie}/${ID}/recommendations?api_key=${API_KEY}&language=en-US&page=1`} more={false}/>
                </>
            </div>}
        </div>
        </SkeletonTheme>
        </div>

    )
}
export default ViewMovie