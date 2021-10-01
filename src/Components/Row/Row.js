import React,{useEffect,useState} from 'react'
import "./Row.css"
import axios from "../../axios";
//import requests from "../../requests";
import {imageUrl} from '../../constants/constants'

function Row({title,url,isLargeRow=false}) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        //axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
            
       /*  axios.get(requests.url).then((response)=>{
            console.table(response.data);
            setMovies(response.data.results)
            
        }).catch(err=>{

        }) */
        async function fetchData(){
            const request = await axios.get(url)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [url])
    return (
        <div className="row" >
            <h2>{title}</h2>
            <div className="posters">
                {movies.map((obj)=>
                    

                    <img className={`img ${isLargeRow &&"img-large"}`}
                    key={obj.id}
                    src={`${imageUrl}${ isLargeRow ? obj.poster_path :obj.backdrop_path}`} alt={obj.name} />

                    
                )}
            </div>
            
            
            
        </div>
    )
}

export default Row
