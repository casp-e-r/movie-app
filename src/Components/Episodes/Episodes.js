import React, { useContext, useState, useEffect } from 'react'
import './Episodes.css'
import { useLocation } from 'react-router'
import { TvContext } from '../../context'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'


function Episodes() {
    const [season, setSeason] = useState([])
    const [ep, setEp] = useState([])
    const [sno, setSno] = useState('')
    const [s1ep, setS1ep] = useState([])
    const location = useLocation()
    const state = location.state.update
    const { tv } = useContext(TvContext)
    const TV = tv
    useEffect(() => {
        
        if (TV.seasons) {
            const obj = TV.seasons.map((obj) => {
                return (obj)
            })
            setSeason(obj)
        }

    }, [TV])
    useEffect(() => {
        window.scrollTo(null);
      },[]);
    //console.log(season);
    // useEffect(() => {
    //     setS1ep([])
    //     if (state.isTv && season) {
    //         const o=season.find(obj=>obj.season_number===1)
    //         //console.log(o);         
    //         if(o){
    //             for (let i = 1; i < o.episode_count+1; i++) {                       
    //                 axios.get(`/tv/${TV.id}/season/1/episode/${i}?api_key=${API_KEY}&language=en-US`).then(res=>{
    //                     // setS1ep(e=>[...e,res.data])
    //                     s1ep.push(res.data)
    //                     // console.log(res.data);
    //                 }).catch(err=>console.log(err))                
    //             }
    //         }
    //         // console.log(s1ep);
    //     } 
    // })
    // console.log(s1ep);

    function handleSeason(snum, count) {
        setEp([])
        for (let i = 1; i < count + 1; i = i + 1) {
            axios.get(`/tv/${TV.id}/season/${snum}/episode/${i}?api_key=${API_KEY}&language=en-US`).then(res => {
                setEp(e => [...e, res.data])
            }).catch(err => console.log(err))
        }
    }
    //console.log(ep); 
    // https://api.themoviedb.org/3/tv/1402/season/0/episode/1?api_key=57b782ed1e57b332740e30da5d75e862
    // useEffect(() => {
    //     // console.log(season);
    //     if (season) {        
    //         for (let i = 0; i < season.length; i++) {
    //             return(season.map(o=>{
    //                 for (let j = 1; j < o.episode_count+1; j++) {
    //                     console.log(i,j);
    //                     const s=axios.get(`/tv/${TV.id}/season/${i}/episode/${j}?api_key=${API_KEY}`).then(res=>{ 
    //                         console.log(res.data);                       
    //                         // setEp(s=>[...s,res.data])
    //                     }).catch() 
    //                 }               
    //             }))
    //         }
    //     }else{
    //         // console.log(season);
    //     }   
    // },[])
    // // console.log(ep);


    return (

        <div >
            {state.isTv &&
                <div className='season-container' >
                    <div className="season-number">
                        {season && season.map((obj) => {
                            if (obj.season_number !== 0) {  //some series contain season 0 - not neede info
                                return (
                                    <p><button onClick={() => { handleSeason(obj.season_number, obj.episode_count); setSno(obj.season_number) }} >{obj.name}</button></p>
                                )
                            } return null

                        })}
                    </div>
                    
                        {sno && season && season.map(obj => {
                            if (obj.season_number === sno) {
                                // console.log(obj.poster_path);
                                return (<div className='episode-container'>
                                    <div className='sno-poster'>
                                        <img src={`${imageUrl + obj.poster_path}`} />
                                    </div>
                                    <div className='ep-n'>
                                        {ep && ep.map(obj => {
                                            //console.log(obj);         
                                            return (
                                                <div className='ep'>
                                                    <p>{obj.air_date}</p>
                                                    <img src={`${imageUrl}${obj.still_path}`} alt='oops' />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>)
                            }
                        })
                        }
                    
                </div>

            }
        </div>
    )
}

export default Episodes
