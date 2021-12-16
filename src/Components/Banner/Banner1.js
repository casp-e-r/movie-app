// import React,{useEffect,useState}from 'react'
// import "./Banner1.css"
// import axios from "../../axios";
// import {imageUrl} from '../../constants/constants'
// import requests from "../../requests";
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.css";



// function Banner1() {
//       const [movie, setMovie] = useState()
      
        

//     useEffect(() => {
        
//         axios.get(requests.Trending).then((response)=>{
//             // console.log(response.data.results);
//             // const responses=response.data.results[Math.floor(Math.random()*response.data.results.length-1)]
//             // setMovie(responses)
//             setMovie(response.data.results.slice(0,10))
//         }).catch(err=>{console.log(err);}) 
        
//     }, [])
//     console.log(movie);
//     function truncate(string, n){
//         return string?.length>n ?string.substr(0,n-1) +'...':string;
//     }
//     return (
//         // <div className='banner-container'>
        
//             <Carousel className='Ca'

//             >
              
                                                         
//             {movie && movie.map(movie=>{
                
//                 return<div className='banner-content' 
//                 style={{
//                     backgroundBlendMode:'normal',
//                     backgroundSize:'cover',
//                     backgroundImage:`url(${movie? imageUrl+movie.backdrop_path:""})`,  
//                    }}
//                 >
//                         {/* <div className='banner-backdrop'>
//                             <img src={movie? imageUrl+movie.backdrop_path:""}/>
//                         </div> */}
//                         <div className='banner-details'>
//                             <h1>{movie ? movie.name || movie.original_name || movie.title :""}</h1>
//                         </div>

//                     </div>
            
//             })}   
//             </Carousel>  
//         // </div> 
        
//     )
// }

// export default Banner1
