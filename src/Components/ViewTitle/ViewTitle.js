import axios from '../../axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import requests from '../../requests'
import './ViewTitle.css'
import { imageUrl } from '../../constants/constants'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'

function ViewTitle() {
    const [TvMovie, setTvMovie] = useState('movie')
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [initLoading, setInitLoading] = useState(true)

    const {title}=useParams()
    const url = location.state.url 
    // const page =location.state.page 
    const history=useHistory()
    const observer= useRef()
    const delay = ms => new Promise(res => setTimeout(res, ms));  
    useEffect(() => {
        async function fetch(){
            try{
                await axios.get(url+`&page=${page}`).then(e => {
                setResults(results=>[...results,...e.data.results])
                })
            }catch(e){
                console.log(e);
            }finally{
                // await delay(3000)
                setInitLoading(false)
            }
        }
        fetch()
    }, [page,setResults,url])
    // useEffect(() => {
    //     axios.get(url+`&page=${page}`).then(e=>{
    //             // setResults(e.data.results)            
    //         setResults(results=>[...results,...e.data.results])
    //     }).catch(err=>console.log(err))   
    // }, [page,setResults,url])
   
    const yourFunction = async () => {
        setLoading(true)
        await delay(3500);
        setPage(page=>page+1)
        setLoading(false)
    };
    const last=useCallback(
        (e) => {
            if (observer.current) observer.current.disconnect()
            observer.current=new IntersectionObserver(e=>{
                    if(e[0].isIntersecting){
                        
                        yourFunction()
                        // setLoading(true) 
                        // setTimeout(setPage(page=>page+1),50000)
                        
                    }
            })
            if(e) observer.current.observe(e)
        },
        [],
    )
   
    console.log(results);
    return (
        <div className='view-title' >
            <div className='view-title-header'>
                {initLoading ? 
                <Skeleton width={'50%'} height={20}/>
                    :<h1>{title}</h1>}
            </div>
            {initLoading ?
            <>
            <Skeleton width={'20%'} height={2}/>
            <Skeleton width={'30%'} height={2}/>
            <Skeleton width={'40%'} height={2}/></>
            :
            <div className='view-title-container' >

            
            {results && results.map((obj,i)=>{
                if(results.length===i+1){
                    return<div ref={last} className='poster'> 
                    <img className='img-poster'
                    key={obj.id}
                    src={imageUrl+obj.poster_path} alt={obj.name}
                    onClick={()=>{
                        history.push(`/view/${obj.id}`,{id:obj.id})     
                    }}
                    />
                    </div>
                }else{
                    return <div className='poster'>
                    <img className='img-poster'
                    key={obj.id}
                    src={imageUrl+obj.poster_path} alt={obj.name}
                    onClick={()=>{
                        history.push(`/view/${obj.id}`,{id:obj.id})     
                    }}
                    />
                    </div>}
            })}
            </div>}
            <div className='loading-outer' >
            {loading && <div className='loading'>
                        <p><AiOutlineLoading3Quarters/></p>      
                        </div>}
            {/* <button 
            // onClick={()=>setPage(page+1)}
            onClick={()=>history.push(`/${title}`,{page:page+1,url:url })}
            >+</button> */}
            </div>
        </div>
    )
}

export default ViewTitle
