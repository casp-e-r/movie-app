import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './Search.css'
import SearchMovie from './SearchMovie'
import SearchTv from './SearchTv'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

function Search() {

    const [state, setState] = useState(1)
    const { query } = useParams()
    const [category, setCategory] = useState(1)
    // useEffect(() => {
    //     const showData=window.localStorage.getItem('search')
    //     setCategory(JSON.parse(showData))    
    // },[])
    // useEffect(() => {
    //     window.localStorage.setItem('search',JSON.stringify(category))
        
    // })
    


    return (
        <div className='search-view-container'>
            <div className='search-view-inner'>
                <div className='search-header'>
                    <p>Search Results for  {query}</p>
                </div>
                <div className='search-tab-container'>
                    <LazyLoadComponent effect='blur'>
                    <div className={state?'active-search-tab' :'search-tab' }>
                        <p onClick={()=>setState(1)} className={state && 'active-tab'}>Movie</p>
                        <p onClick={()=>setState(0)} className={!state && 'active-tab'}>Tv Shows</p>
                    </div>
                    </LazyLoadComponent>
                </div>                
                {state ? <SearchMovie/> : <SearchTv/> }         
            </div>
        </div>
    )
}

export default Search
