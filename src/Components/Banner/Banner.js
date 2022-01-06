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

function Banner() {
    
      const {GlobalLoading} = useContext(LoadingContext)
      const [movie, setMovie] = useState()
      const [loading, setLoading] = useState(true)
      const [imgLoad, setImgLoad] = useState(false)
        let history = useHistory()
    
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
                 setLoading(true)
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
//     let [transition, setTransition ] = useState('width-carousel')

// const handleTransition= ()=>{
//     setTransition('width-carousel fade-in-image')

//     setTimeout(()=>{
//         setTransition('width-carousel')
//     }, 2000)
// }

    return (
        <>

        {/* {(loading && GlobalLoading) ? <div className='banner-skl'>
        <SkeletonTheme baseColor=' #1c1c1c' highlightColor='#212121'>
            <Skeleton baseColor='#121212' highlightColor='#141414' height={'100%'} width={'100%'}/>
            <div className='banner-skl-content'>
            <Skeleton  height={'100%'} width={'50%'}/>
            <Skeleton count={3}  height={5} width={'100%'}/>
            </div>
         </SkeletonTheme>
        </div> 
        : */}
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
            
        </Carousel>
        </div>
        {/* } */}
        </>

    )
}

export default Banner