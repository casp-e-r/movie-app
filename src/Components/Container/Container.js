import React, { useState,useEffect} from 'react'
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
    
    return (
        <div className='c'>
           

            
            <div>
              
                <div className='toggle'>
                <button
                className={category===0?'active-category-toggle':'category-toggle'}
                onClick={() => setCategory(0)}>
                   MOVIE
                </button>
                <button className={category===1?'active-category-toggle':'category-toggle'} onClick={() => setCategory(1)} >
                        TV 
                </button>

                </div>
                </div>
            
                
            {category===0 ? <Movie /> : <Tv/> }



        </div>
    )
}

export default Container
