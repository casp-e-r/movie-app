import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import requests from '../../requests'
import './ViewTitle.css'
import { imageUrl } from '../../constants/constants'

function ViewTitle() {
    const [TvMovie, setTvMovie] = useState('movie')
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)
    const location = useLocation()
    // const title=location.state.title
    const {title}=useParams()
    const url = location.state.url  
    const history=useHistory()
    const handleScroll=(e)=>{
        const {scrollTop,clientHeight,scrollHeight}=e.currentTarget
        console.log(scrollTop,clientHeight,scrollHeight);
    }
    useEffect(() => {
        axios.get(url+`&page=${page}`).then(e=>{
            console.log(e.data.results,page);
            setResults(results=>[...results,...e.data.results])
        })   
    }, [page,setResults,url])
    console.log(results);
    return (
        <div className='view-title' >
            <div className='view-title-header'>
                <h1>{title}</h1>
            </div>
            <div className='view-title-container' onScroll={handleScroll}>

            
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
