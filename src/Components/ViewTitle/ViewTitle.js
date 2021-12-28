import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import requests from '../../requests'
import './ViewTitle.css'
import { imageUrl } from '../../constants/constants'

function ViewTitle() {
    const [TvMovie, setTvMovie] = useState('movie')
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)
    const location = useLocation()
    const title=location.state.title
    const url = location.state.url  
    const history=useHistory()
    
    useEffect(() => {
        axios.get(url+`&page=${page}`).then(e=>{
            console.log(e.data.results,page);
            setResults(results=>[...results,e.data.results])
        })   
    }, [page,setResults,url])
    console.log(results);
    return (
        <div >
            <div className='view-title-container'>

            
            {results && results.map((obj)=>
                     <div className='poster'>

                    <img className='img-poster'
                    key={obj.id}
                    src={imageUrl+obj.poster_path} alt={obj.name}
                    onClick={()=>{
                        history.push(`/view/${obj.id}`,{id:obj.id})     
                    }}
                    />
                    </div>
            )}
            </div>
            <button onClick={()=>setPage(page+1)}>+</button>
        </div>
    )
}

export default ViewTitle
