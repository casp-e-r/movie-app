import React,{useEffect,useState}from 'react'
import "./Banner.css"
import axios from "../../axios";
import {imageUrl} from '../../constants/constants'
import requests from "../../requests";
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { shuffleArray } from "../../helpers/helper";

function Banner() {
      const [movie, setMovie] = useState()
      
    //   const [category, setCategory] = useState(1)
    //   //const [url, setUrl] = useState()
    //   useEffect(() => {
    //     const showData=window.localStorage.getItem('show')
    //     setCategory(JSON.parse(showData))    
    // },[])
    useEffect(() => {
        
        axios.get(requests.Trending).then((response)=>{
            console.log(response.data.results);
            const s=shuffleArray(response.data.results)
            setMovie(s)
            // const responses=response.data.results[Math.floor(Math.random()*response.data.results.length-1)]
            // setMovie(responses)
        }).catch(err=>{console.log(err);}) 
        
    }, [])
    function truncate(string, n){
        return string?.length>n ?string.substr(0,n-1) +'...':string;
    }
    
    return (
        <div className='banner'>
        <Carousel
        className='carousel'
        autoPlay
        infiniteLoop
        showArrows={false}
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        interval={5000}
        swipeable={true}>
        {movie && movie.map(movie=>{
                
                return<div className='banner-content' 
                style={{
                    backgroundBlendMode:'normal',
                    backgroundSize:'cover',
                    backgroundImage:`url(${movie? imageUrl+movie.backdrop_path:""})`,  
                   }}
                >
                        {/* <div className='banner-backdrop'>
                            <img src={movie? imageUrl+movie.backdrop_path:""}/>
                        </div> */}
                        <div className='banner-details'>
                            <h1>{movie ? movie.name || movie.original_name || movie.title :""}</h1>
                        </div>
                        <div className='fade-bottom'></div>

                    </div>
            
            })}  
            
        </Carousel>
        </div>
    )
}

export default Banner
