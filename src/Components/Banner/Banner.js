import React,{useEffect,useState}from 'react'
import "./Banner.css"
import axios from "../../axios";
import {imageUrl} from '../../constants/constants'
import requests from "../../requests";
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { shuffleArray } from "../../helpers/helper";
import { useHistory } from 'react-router';
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel/index';

function Banner() {
      const [movie, setMovie] = useState()
        let history = useHistory()

    useEffect(() => {
 
        axios.get(requests.Trending).then((response)=>{
            const s=shuffleArray(response.data.results)
            setMovie(s)
            // const responses=response.data.results[Math.floor(Math.random()*response.data.results.length-1)]
        }).catch(err=>{console.log(err);}) 
        
    }, [])
    function truncate(string, n){
        return string?.length>n ?string.substr(0,n-1) +'...':string;
    }
    const handleView=(movie)=>{
        history.push(`/view/${movie.id}`,{id:movie.id})
        window.localStorage.setItem('show',JSON.stringify(movie.media_type==='tv' ? 1:0))
    }
//     let [transition, setTransition ] = useState('width-carousel')

// const handleTransition= ()=>{
//     setTransition('width-carousel fade-in-image')

//     setTimeout(()=>{
//         setTransition('width-carousel')
//     }, 2000)
// }

    return (
        <div className='banner'>
        <Carousel
        className='carousel'
        autoPlay
        infiniteLoop
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
        emulateTouch={true}
        transitionTime={500}
        swipeScrollTolerance={10}
        swipeable={true}
        transitionTime={500}
        stopOnHover={true}
        // onChange={handleTransition}
        >
            
        {movie && movie.map(movie=>{
                
                return<div className='banner-content' >
                        <div className='banner-backdrop'>
                            <img src={movie? imageUrl+movie.backdrop_path:""}/>
                        <div className='fade-bottom'></div>
                        </div>
                        <div className='banner-details'>
                            <h1>{movie ? movie.name || movie.original_name || movie.title :""}</h1>
                            <p>{truncate(movie.overview,200)}</p>
                            <button onClick={()=>handleView(movie)}  >View Movie </button>
                        </div>

                    </div>
            
            })}  
            
        </Carousel>
        </div>
    )
}

export default Banner