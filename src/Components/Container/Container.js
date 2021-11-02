import React, { useState,useEffect } from 'react'
import './Container.css'
import Movie from './Movie'
import Tv from './Tv'


function Container() {
    const [category, setCategory] = useState(1)
    useEffect(() => {
        const showData=window.localStorage.getItem('show')
        setCategory(JSON.parse(showData))    
    },[])
    useEffect(() => {
        window.localStorage.setItem('show',JSON.stringify(category))
        
    })
    
    
    return (
        <div className='c'>
           

            
                <div className='toggle'>
                {/* <label type='checkbox' value='nnnn' onClick={()=>alert('?????')}>nnnnn</label> */}
                <button onClick={() => setCategory(0)}>
                    tv
                </button>
                <button onClick={() => setCategory(1)}>
                    movie
                </button>

            </div>
            
                
            {category===1 ? <Movie /> : <Tv/> }



        </div>
    )
}

export default Container
