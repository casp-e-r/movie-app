import React,{useEffect,useState} from 'react'
import "./Row.css"
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import {imageUrl} from '../../constants/constants'



function Row({title,url,isTv=false,isLarge=false}) {
    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState()
    let history = useHistory()
    console.log(title);
    useEffect(() => {
        
    }, [])
    
    useEffect(() => {  
        if(title=='Latest'){
        axios.get(url).then(res=>{
            console.log(res);
            setMovie(res.data)
        }) 
    }else{
            axios.get(url).then(res=>{ 
                setMovies(res.data.results)
                
            }).catch(err=>console.log(err))
        }  
    }, [url,setMovies])
//    console.log(movies,url,title,isTv,isLarge)


    return (
        
        <div className="row" >
            <h2>{title}</h2>
            <div className="posters">
                {movies && movies.map((obj)=>
                    

                    <img className={isLarge ? 'img-backdrop':'img-poster'}
                    key={obj.id}
                    src={isLarge ? imageUrl+obj.backdrop_path : imageUrl+obj.poster_path} alt={obj.name}
                    onClick={()=>{
                        history.push(`/${obj.id}`,{update:{isTv},id:obj.id})
                        
                    }}
                    />                          
                )}
                {movie && 
                    <img className={isLarge ? 'img-backdrop':'img-poster'}
                    key={movie.id}
                    src={isLarge ? imageUrl+movie.backdrop_path : imageUrl+movie.poster_path} alt={movie.name}
                    onClick={()=>{
                        history.push(`/${movie.id}`,{update:{isTv},id:movie.id})
                        
                    }}
                    />                          
                }
            </div>
  
           </div>
           
    )
}

export default Row
