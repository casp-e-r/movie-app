import axios from '../../axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import requests from '../../requests'
import './ViewTitle.css'
import { imageUrl } from '../../constants/constants'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { delay, getYear } from "../../helpers/helper";
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
    useEffect(() => {
        async function fetch(){
            try{
                await axios.get(url+`&page=${page}`).then(e => {
                setResults(results=>[...results,...e.data.results])
                })
            }catch(e){
                console.log(e);
            }finally{
                await delay(500)
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
        // setPage(page=>page+1)
        setLoading(true)
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
            <SkeletonTheme borderRadius={3} duration={1.5} baseColor='#121212' highlightColor='#1c1c1c'> 
            <div className='view-title-header'>
                {initLoading ? 
                <Skeleton width={'50%'} height={20}/>
                    :<h1>{title}</h1>}
            </div>
            <div className='view-title-container' >

            
            {results && results.map((obj,i)=>{
                if(results.length===i+1){
                    return<div ref={last} className='card-poster'> 
                    {initLoading ? 
                        <Skeleton height={'100%'} width={'100%'}/>
                        :<LazyLoadImage
                        className='img-poster'
                        src={imageUrl+obj.poster_path} alt={obj.name}
                        height={'100%'} width={'100%'}
                        effect='opacity'
                        onClick={()=>{
                            history.push(`/view/${obj.id}`,{id:obj.id})     
                        }}/>}
                    {initLoading ? null:<div className='card-name'>
                    <p>{obj ? obj.name || obj.original_name || obj.title : ""}</p>
                    <p>{getYear(obj?.release_date || obj.first_air_date)}</p>
                    </div>}
                    </div>
                }else{
                    return <div className='card-view'>
                    <div className='card-poster'>
                    {initLoading ? 
                        <Skeleton height={'100%'} width={'100%'}/>
                        :<LazyLoadImage
                        className='img-poster'
                        src={imageUrl+obj.poster_path} alt={obj.name}
                        height={'100%'} width={'100%'}
                        effect='opacity'
                        onClick={()=>{
                         history.push(`/view/${obj.id}`,{id:obj.id})     
                        }} />}
                    </div>
                    {initLoading ? null:<div className='card-name'>
                    <p>{obj ? obj.name || obj.original_name || obj.title : ""}</p>
                    <p>{getYear(obj?.release_date || obj.first_air_date)}</p>
                    </div>}
                    </div>}
            })}
            </div>
            <div className='loading-outer' >
            {loading && 
            // <div className='loading'>
            //             <p><AiOutlineLoading3Quarters/></p>      
            //             </div>
            <div className=' skl-load-grid'>
                <Skeleton className='card-poster' height={'100%'} width={'100%'}/>
                <Skeleton className='card-poster' height={'100%'} width={'100%'}/>
                <Skeleton className='card-poster' height={'100%'} width={'100%'}/>
            </div>
                        }
            
            </div>
            </SkeletonTheme>
        </div>
    )
}

export default ViewTitle
