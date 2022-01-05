import React,{useContext, useEffect,useState} from 'react'
import "./Row.css"
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import {imageUrl} from '../../constants/constants'
import {IoIosMore} from 'react-icons/io'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { LoadingContext } from '../../context';



function Row({title,url,isLarge=false,more=true}) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    const isTv=window.localStorage.getItem('show')   
    const delay = ms => new Promise(res => setTimeout(res, ms));  
    const {setGlobalLoading} = useContext(LoadingContext)
    useEffect(() => {       
        async function fetch(){
            try{
                await axios.get(url).then(res=>{ 
                    setMovies(res.data.results) 
                })
            }catch(e){
                console.log(e);
            }finally{
                await delay(2000)
                setLoading(false)
                setGlobalLoading(false)
                
            }
        }
        fetch()
        return()=>{
            setGlobalLoading(true)
        }
            // axios.get(url).then(res=>{ 
            //     setMovies(res.data.results)  
            // }).catch(err=>console.log(err))
         
    }, [url,setMovies])



    return (
        
        <div className="row" >
            <SkeletonTheme baseColor=' #1c1c1c' highlightColor='#212121'>
            {loading? <Skeleton width={200} height={25}/>:<div className='row-header'>
            {more ? <div onClick={()=>{
                        history.push(`/${title}`,{page:1,url:url })     
                    }}>
                <h2>{title}</h2>
                <p><IoIosMore size={20}/></p>
                    </div>:<h2>{title}</h2>}
            </div>}
            <div className="posters">
                {movies && movies.map((obj)=>
                
                     <div className={isLarge ? 'card-backdrop':'card-poster'}>

                    {loading? (isLarge? <Skeleton height={'100%'} width={'100%'}/>:<Skeleton height={250} width={150}/>)
                    :<img className={isLarge ? 'img-backdrop':'img-poster'}
                    key={obj.id}
                    src={isLarge ? imageUrl+obj.backdrop_path : imageUrl+obj.poster_path} alt={obj.name}
                    onClick={()=>{
                        history.push(`/view/${obj.id}`,{id:obj.id})     
                    }}
                    /> }
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
