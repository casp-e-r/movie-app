import React,{useEffect,useState}from 'react'
import "./Banner.css"
import axios from "../../axios";
import {imageUrl} from '../../constants/constants'
import requests from "../../requests";

function Banner() {
      const [movie, setMovie] = useState({})

    useEffect(() => {
        axios.get(requests.Trending).then((response)=>{
            console.log(response.data);
            const responses=response.data.results[Math.floor(Math.random()*response.data.results.length-1)]
            setMovie(responses)
        }).catch(err=>{console.log(err);}) 
        
    }, [])
    function truncate(string, n){
        return string?.length>n ?string.substr(0,n-1) +'...':string;
    }
    return (
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
    
        </div>
    )
}

export default Banner
