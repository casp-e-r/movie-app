import React,{useEffect,useState}from 'react'
import "./Banner.css"
import axios from "../../axios";
import {imageUrl} from '../../constants/constants'
import requests from "../../requests";
import { delay, shuffleArray, truncate } from "../../helpers/helper";
import { useHistory } from 'react-router';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import disableScroll from 'disable-scroll';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


function Banner() {

      const [movie, setMovie] = useState()
      const [loading, setLoading] = useState(true)
        let history = useHistory()
        const sliderSettings = {
            dots: false,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false,
            autoplay: true,
            autoplaySpeed: 10000,
            draggable: true,
            easing: 'easeInOutQuad',
            fade: true
          };
    useEffect(() => {
        async function fetch(){
            try{
                axios.get(requests.Trending).then((response)=>{
                    const s=shuffleArray(response.data.results)
                    setMovie(s)
                })
            }catch(e){
                console.log(e);
            }finally{
                await delay(400)
                 setLoading(false)
            }
        }
        fetch()
    }, [])
   
    useEffect(() => {
        if(loading){
        disableScroll.on();
        }else{
        disableScroll.off();

        }
    }, [loading])
    
    const handleView=(movie)=>{
        history.push(`/view/${movie.id}`,{id:movie.id})
        window.localStorage.setItem('show',JSON.stringify(movie.media_type==='tv' ? 1:0))
    }


    return (
        <>

        {(loading) ? <div className='banner-skl'>
        <SkeletonTheme baseColor=' #121212' highlightColor='#1c1c1c'>
            <Skeleton baseColor='#121212' highlightColor='#141414' height={'100%'} width={'100%'}/>
            <div className='banner-skl-content'>
            <Skeleton  height={'100%'} width={'50%'}/>
            <Skeleton count={3}  height={5} width={'100%'}/>
            </div>
         </SkeletonTheme>
        </div> 
        :
        <div className='banner'>
        <Slider {...sliderSettings}>
            
        {movie && movie.map(movie=>{
                
                return<div className='banner-content' >
                        <div className='banner-backdrop'>
                            <LazyLoadImage src={movie? imageUrl+movie.backdrop_path:""}
                            effect='opacity' alt={movie.id}
                            height={'100%'} width={'100%'}
                            />
                           
                        <div className='fade-bottom'></div>
                        </div>
                        <div className='banner-details'>
                            <h1>{movie ? movie.name || movie.original_name || movie.title :""}</h1>
                            <p>{truncate(movie.overview,200)}</p>
                            <button onClick={()=>handleView(movie)}  >View Details
                            </button>
                            
                        </div>

                    </div>
            
            })}  
            
        </Slider>
        </div>
        }
        </>

    )
}

export default Banner