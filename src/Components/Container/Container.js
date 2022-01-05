import React, { useState,useEffect, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import { LoadingContext } from '../../context'
import './Container.css'
import Movie from './Movie'
import Tv from './Tv'


function Container() {
    const [category, setCategory] = useState(0)
    useEffect(() => {
        const showData=window.localStorage.getItem('show')
        setCategory(JSON.parse(showData))    
    },[])
    useEffect(() => {
        window.localStorage.setItem('show',JSON.stringify(category))
        
    })
    const {GlobalLoading} = useContext(LoadingContext)
    
    console.log(GlobalLoading);
    return (
        <div className='c'>
           

            
                {GlobalLoading? null:
                <div className='toggle'>
                {/* <label type='checkbox' value='nnnn' onClick={()=>alert('?????')}>nnnnn</label> */}
                <button className={category===1?'active-category-toggle':'category-toggle'} onClick={() => setCategory(1)} >
                    tv
                </button>
                <button
                className={category===0?'active-category-toggle':'category-toggle'}
                onClick={() => setCategory(0)}>
                    movie
                </button>

            </div>}
            
                
            {category===0 ? <Movie /> : <Tv/> }



        </div>
    )
}

export default Container
