import React,{useEffect,useState} from 'react'
import "./Row.css"
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import {imageUrl} from '../../constants/constants'



function Row({title,url,isTv=false}) {
    const [movies, setMovies] = useState([])
  
   

    
    let history = useHistory()
    
    
    useEffect(() => {   
            axios.get(url).then(res=>{ 
                setMovies(res.data.results)
            }).catch(err=>console.log(err))
            
    }, [url,setMovies])


    return (
        
        <div className="row" >
            <h2>{title}</h2>
            <div className="posters">
                {movies.map((obj)=>
                    

                    <img className="img-large"
                    key={obj.id}
                    src={`${imageUrl}${ obj.poster_path }`} alt={obj.name} 
                    onClick={()=>{
                        history.push(`/${obj.id}`,{update:{isTv},id:obj.id})
                        
                    }}
                    /> 
                    
                )}
            </div>
  
           </div>
           
    )
}

export default Row
