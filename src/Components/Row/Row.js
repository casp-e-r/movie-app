import React,{ useEffect,useState} from 'react'
import "./Row.css"
import axios from "../../axios";
import {  useHistory } from "react-router-dom";
import {imageUrl,imageUrl3} from '../../constants/constants'
import {AiOutlineSwapRight} from 'react-icons/ai'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css'
import { delay } from "../../helpers/helper";

function Row({title,url,isLarge=false,more=true}) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()   
  
    useEffect(() => {       
        async function fetch(){
            try{
                await axios.get(url).then(res=>{ 
                    setMovies(res.data.results) 
                })
            }catch(e){
                console.log(e);
            }finally{
                await delay(800)
                setLoading(false)  
            }
        }
        fetch()
        return()=>{
        }  
    }, [url,setMovies])



    return (
        
        <div className="row" >
            <SkeletonTheme baseColor=' #121212' highlightColor='#1c1c1c'>
            {loading ? <Skeleton width={200} height={25}/>: movies.length!==0?<div className='row-header'>
            {more ? <div onClick={()=>{
                        history.push(`/${title}`,{page:1,url:url })     
                    }}>
                <h2>{title}</h2>
                <p><AiOutlineSwapRight className='direction-icon' size={20}/></p>
                    </div>:<h2>{title}</h2>}
            </div>:null}
            <div className="posters">
                {movies && movies.map((obj)=>
                 (isLarge ? obj.backdrop_path : obj.poster_path) &&
                     <div className={isLarge ? 'card-backdrop':'card-poster'}>

                    {loading&&!movies? (isLarge? <Skeleton height={'100%'} width={'100%'}/>:<Skeleton height={250} width={150}/>)
                    :
                    <LazyLoadImage 
                    src={isLarge ? (imageUrl3 || imageUrl) +obj.backdrop_path : (imageUrl3 || imageUrl)+obj.poster_path}
                    effect="opacity"
                    threshold={50}
                    delayTime={2000}
                    beforeLoad={()=>setLoading(true)}
                    afterLoad={()=>setLoading(false)}
                    placeholder={<Skeleton height={'100%'} width={'100%'}/>}
                    className={isLarge ? 'img-backdrop':'img-poster poster-hover-t'}
                    onClick={()=>{
                        history.push(`/view/${obj.id}`,{id:obj.id})     
                    }}
                    >
                    </LazyLoadImage>
                       } 
                    {isLarge && <div className='poster-overlay'>
                        <p>{obj ? obj.name || obj.original_name || obj.title : ""}</p>
                    </div>}
                    </div> 
                                      
                )}
                
            </div>
            </SkeletonTheme>
           </div>
           
    )
}

export default Row
