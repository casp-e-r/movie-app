import React,{useEffect,useState}from 'react'
import "./Banner.css"
import axios from "../../axios";
import {imageUrl} from '../../constants/constants'
import requests from "../../requests";

function Banner() {
      const [movie, setMovie] = useState()

    useEffect(() => {
        axios.get(requests.Trending).then((response)=>{
            console.log(response.data);
            const responses=response.data.results[Math.floor(Math.random()*response.data.results.length-1)]
            //setMovie(response.data.results.sort(function(a,b){return 0.5-Math.random()})[0])
            setMovie(responses)
        }) 
        
    }, [])
    return (
        <div
         style={{
             backgroundSize:"cover",
             backgroundImage:`url(${movie? imageUrl+movie.backdrop_path:""})`,
             
            }}
         className="banner">
            
            <div className="content">
                <h1 className="title">{movie ? movie.original_name || movie.name || movie.title :""}</h1>
                <div className="banner-buttons">
                    <button className="button">s</button>
                    <button className="button">d</button>
                </div>
                <h2 className="description">{movie ? movie.overview :""}</h2>
            </div>
            <div className="fade-bottom"></div>
    
        </div>
    )
}

export default Banner
