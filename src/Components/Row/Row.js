import React,{useEffect,useState} from 'react'
import "./Row.css"
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import {imageUrl} from '../../constants/constants'



function Row({title,url,isLarge=false}) {
    const [movies, setMovies] = useState([])
    let history = useHistory()
    const isTv=window.localStorage.getItem('show')   
    useEffect(() => {       
            axios.get(url).then(res=>{ 
                setMovies(res.data.results)  
            }).catch(err=>console.log(err))
         
    }, [url,setMovies])


    return (
        
        <div className="row" >
            <h2>{title}</h2>
            <div className="posters">
                {movies && movies.map((obj)=>
                     <div className='poster'>

                    <img className={isLarge ? 'img-backdrop':'img-poster'}
                    key={obj.id}
                    src={isLarge ? imageUrl+obj.backdrop_path : imageUrl+obj.poster_path} alt={obj.name}
                    onClick={()=>{
                        history.push(`/${obj.id}`,{update:{isTv},id:obj.id})
                        
                    }}
                    /> 
                    <div className='poster-overlay'>
                        <p>{obj ? obj.name || obj.original_name || obj.title : ""}</p>
                    </div>
                    </div>                          
                )}
                
            </div>
  
           </div>
           
    )
}

export default Row
