import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import './Search.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'

function Search() {
    const [tvPage, setTvPage] = useState(1)
    const [moviePage, setmoviePage] = useState(1)
    const [tvResults, setTvResults] = useState({})
    const [movieResults, setMovieResults] = useState({})
    const history= useHistory()
    const location=useLocation()
    const {query}=useParams()
    useEffect(() => {
        axios.get(`/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&page=${tvPage}&include_adult=false`).then(e=>{
            setTvResults(e.data)
        })
        axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${moviePage}&include_adult=false`).then(e=>{
            setMovieResults(e.data)
        })
    }, [query])
    
    console.log(query,tvResults,movieResults);
    return (
        <div>
            <div className='search-header'>

            </div>
            <div className='search-grid-wrapper'>
            {tvResults.results && tvResults.results.map((obj)=>
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
            
        </div>
    )
}

export default Search
