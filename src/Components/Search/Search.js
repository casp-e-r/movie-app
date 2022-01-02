import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import './Search.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'

function Search() {
    // const [tvPage, setTvPage] = useState(1)
    // const [moviePage, setMoviePage] = useState(1)
    const [tvPage, setTvPage] = useState(1)
    const [moviePage, setMoviePage] = useState(1)
    const [tvResults, setTvResults] = useState([])
    const [movieResults, setMovieResults] = useState([])
    const [count, setCount] = useState(0)
    const [state, setState] = useState(1)
    const history = useHistory()
    const location = useLocation()
    const { query } = useParams()
    
    useEffect(() => {
        setTvPage(location.state.page)
        setMoviePage(location.state.page)
    }, [])
    useEffect(() => {
        axios.get(`/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&page=${tvPage}&include_adult=false`).then(e => {
            // console.log(e.data);
            // setTvResults(tvResults=>[...tvResults,...e.data.results])
            setTvResults(e.data.results)
        })
        axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${moviePage}&include_adult=false`).then(e => {
            // console.log(e.data);
            setMovieResults(e.data.results)
        })
    }, [query,tvPage,moviePage])
    console.log(query, tvResults, movieResults, tvPage,moviePage);

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
                    
                    movieResults && movieResults.map((obj, index) =>
                    
                    // obj.poster_path && obj.backdrop_path &&
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
                    tvResults && tvResults.map((obj, index) =>
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
                {state ?
                <div><button 
                onClick={()=>history.push(`/${query}`,{page:moviePage+1})}
                // onClick={()=>setMoviePage(moviePage+1)}
                >MvPa</button></div>
                :
                <div><button 
                // onClick={()=>setTvPage(tvPage+1)}
                onClick={()=>history.push(`/${query}`,{page:tvPage+1})}
                >TvPa</button></div>
                }
            </div>
        </div>
    )
}

export default Search
