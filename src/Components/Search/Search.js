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
    const [count, setCount] = useState(0)
    const [state, setState] = useState(1)
    const history = useHistory()
    const location = useLocation()
    const { query } = useParams()
    useEffect(() => {
        axios.get(`/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&page=${tvPage}&include_adult=false`).then(e => {
            setTvResults(e.data)
        })
        axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${moviePage}&include_adult=false`).then(e => {
            setMovieResults(e.data)
        })
    }, [query])
    useEffect(() => {
        axios.get(`/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`).then(e => {
            console.log(e.data);

            //     e.data.results && e.data.results.map((obj,index)=>{
            //     if(obj.poster_path && obj.backdrop_path){
            //         setCount(index+1)
            //     } 
            // })
        })
    }, [])

    console.log(query, tvResults, movieResults, count);
    return (
        <div className='search-view-container'>
            <div className='search-view-inner'>
                <div className='search-header'>
                    <p>Search Results for  {query}</p>
                </div>
                <div className='search-tab-container'>
                    <div className={state?'active-search-tab' :'search-tab' }>
                        <p onClick={()=>setState(1)} className={state && 'active-tab'}>Movie</p>
                        <p onClick={()=>setState(0)} className={!state && 'active-tab'}>Tv Shows</p>
                    </div>

                </div>
                <div className='search-grid-wrapper'>
                    {state ? 
                    movieResults.results && movieResults.results.map((obj, index) =>
                    obj.poster_path && obj.backdrop_path &&
                    <div className='poster'>
                        <img className='img-poster'
                            key={obj.id}
                            src={imageUrl + obj.poster_path} alt={obj.name}
                            onClick={() => {
                                history.push(`/view/${obj.id}`, { id: obj.id })
                            }}
                        />
                    </div>
                )
                    :
                    tvResults.results && tvResults.results.map((obj, index) =>
                        obj.poster_path && obj.backdrop_path &&
                        <div className='poster'>
                            <img className='img-poster'
                                key={obj.id}
                                src={imageUrl + obj.poster_path} alt={obj.name}
                                onClick={() => {
                                    history.push(`/view/${obj.id}`, { id: obj.id })
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search
