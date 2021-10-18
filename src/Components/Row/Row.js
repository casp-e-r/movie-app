import React,{useEffect,useState,useContext} from 'react'
import "./Row.css"
import axios from "../../axios";
//import requests from "../../requests";
import {imageUrl} from '../../constants/constants'
import Show from "../Show/Show";
import {MovieDetailsContext}  from "../../context";

function Row({title,url,isLargeRow=false}) {
    const [movies, setMovies] = useState([])
    const [show, setShow] = useState(false)
    const {MovieDetails,setMovieDetails} = useContext(MovieDetailsContext)
    
    function handleShow(){
        if(show===true){
            setShow(false)
        }else{
            setShow(!show)
        }

    }
    
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(url)
            setMovies(request.data.results) 
            return request
        }   
            fetchData()        
    }, [url])
   

    //Netflix originals contains wrong video content : Avoiding react-player(video) for largerow (netflix originals)


    return (
        <div className="row" >
            <h2>{title}</h2>
            <div className="posters">
                {movies.map((obj)=>
                    

                    <img className={`img ${isLargeRow &&"img-large"}`}
                    key={obj.id}
                    src={`${imageUrl}${ isLargeRow ? obj.poster_path :obj.backdrop_path}`} alt={obj.name} 
                    onClick={()=> {
                          handleShow()
                          setMovieDetails(obj)     
                    }}
                    
                    />   
                )}
            </div>
            {show && MovieDetails  ? <Show isLargeRow={isLargeRow}/>: null}
           </div>
    )
}

export default Row
