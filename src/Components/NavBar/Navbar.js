import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import "./Navbar.css"
import { BiSearchAlt2 } from "react-icons/bi";
import  axios  from "../../axios";
import { API_KEY, imageUrl } from '../../constants/constants';
import { delay, getYear } from '../../helpers/helper';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Navbar() {
    let history = useHistory()
    const [show, handleShow] = useState(false)
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    const page=1
    async function fetch(value){
        try{
            await axios.get(`/search/multi?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`).then(e => {  
                setResults(e.data.results)
                console.log(e.data.results);
            })}
        catch(e){console.log(e);}
        finally{
            await delay(500)
            // setLoading(false)
        }
    }
    useEffect(() => {  
        search.length>2 && fetch(search)
        return ()=>{
            setResults([])
        }
    }, [search])
     
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }
    const handleSubmit=(e)=>{
            search.length!=0  && 
            history.push(`/search/${search}`,{page:page})
            return()=> setSearch(''),setResults()
    }
  const handleSuggestSubmit=(e)=>{
        history.push(`/view/${e.id}`,{id:e.id,media:e.media_type})
    }
   
    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)

        return () => {
            window.removeEventListener('scroll', transitionNavBar)
        }
    }, [])
    
 
    

    return (
        <div className={`nav ${ show && 'nav_black'}`}>
            <div className="nav_content">
                <div className='logo-outer'>
                    <img className="logo" src="" alt="logo" onClick={() => history.push('/')} />
                    {/* <img className="avatar" src="" alt="avatar" /> */}
                </div>
                
                <div class="search-box">
                    <div className='dummy'></div>
                    <button class="btn-search"
                    onClick={handleSubmit}>
                    <BiSearchAlt2 />
                    </button> 
                    <input 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    type="text" class="input-search" placeholder=" Search..." />
                    
                {results && results.length>0 && <div className='auto-search'>
                    {results.map((e,i)=>{
                        
                           return <div  className='auto-div' onClick={()=>handleSuggestSubmit(e)} >
                               <div className='auto-suggest-poster'>
                                    <LazyLoadImage src={imageUrl+e.poster_path} height={'100%'} width={'100%'} />
                               </div>
                               <div>
                               <p>{e.name || e.original_name || e.title}</p>
                               <p>{getYear(e?.release_date || e.first_air_date)}</p>
                                <p>{e.rating}</p>
                                <p>{e.media_type}</p>
                               </div>
                                 </div>
                            
                    
                    }) }
                    {results.length===20 && <p className='auto-suggest-search-more' onClick={()=>handleSubmit()}>Search '{search}'</p>}
                
                </div>}
                </div>
                


            </div>
        </div>
    )
}

export default Navbar
