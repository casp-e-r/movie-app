import React,{useContext, useEffect,useState}from 'react'
import "./Banner.css"
import axios from "../../axios";
import {imageUrl} from '../../constants/constants'
import requests from "../../requests";
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { shuffleArray } from "../../helpers/helper";
import { useHistory } from 'react-router';
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel/index';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import disableScroll from 'disable-scroll';
import  { LoadingContext } from '../../context';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Banner() {
    
      const {GlobalLoading} = useContext(LoadingContext)
      const [movie, setMovie] = useState()
      const [loading, setLoading] = useState(true)
      const [imgLoad, setImgLoad] = useState(false)
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
                // await delay(3000)
                 setLoading(false)
            }
        }
        fetch()
    }, [])
    const handleImageLoaded=()=> {
        setImgLoad(true)
    }
    useEffect(() => {
        if(loading){
        document.body.style.scrollMargin='0'
        // disableScroll.on();
        }else{
        disableScroll.off();

        }
    }, [loading])
    function truncate(string, n){
        return string?.length>n ?string.substr(0,n-1) +'...':string;
    }
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
                            {/* <img src={movie? imageUrl+movie.backdrop_path:""} onLoad={()=>handleImageLoaded}/> */}
                        <div className='fade-bottom'></div>
                        </div>
                        <div className='banner-details'>
                            <h1>{movie ? movie.name || movie.original_name || movie.title :""}</h1>
                            <p>{truncate(movie.overview,200)}</p>
                            <button onClick={()=>handleView(movie)}  >View Movie </button>
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