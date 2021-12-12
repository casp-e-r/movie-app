import React,{useEffect,useState}from 'react'
import "./Banner.css"
import axios from "../../axios";
import {imageUrl} from '../../constants/constants'
import requests from "../../requests";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { shuffleArray } from "../../helpers/helper";

function Banner() {
      const [movie, setMovie] = useState()
      console.log(movie);
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
            console.log(s);
            setMovie(s)
            // const responses=response.data.results[Math.floor(Math.random()*response.data.results.length-1)]
            // setMovie(responses)
        }).catch(err=>{console.log(err);}) 
        
    }, [])
    function truncate(string, n){
        return string?.length>n ?string.substr(0,n-1) +'...':string;
    }
    console.log(movie);
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
        interval={5000}>
        {movie && movie.map(movie=>{

        
        return(
        <div
         style={{
             backgroundSize:"cover",
             backgroundImage:`url(${movie? imageUrl+movie.backdrop_path:""})`,  
            }}
         className="banner">
            
            <div className="content">
                <h1 className="title">{movie ? movie.name || movie.original_name || movie.title :""}</h1>
                <h2 className="description">{truncate(movie ? movie.overview :"",250)}</h2>
            </div>
            <div className="fade-bottom"></div>
    
        </div>)
        })}
        </Carousel>
        </div>
    )
}

export default Banner
