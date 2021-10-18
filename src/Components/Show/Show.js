import React,{useContext,useEffect,useState} from 'react'
import { MovieDetailsContext } from '../../context'
import './Show.css'
import ReactPlayer from "react-player/youtube";
import axios from '../../axios'
import { API_KEY} from '../../constants/constants'
import { imageUrl } from '../../constants/constants';




function Show({isLargeRow}) {
    
    const {MovieDetails} = useContext(MovieDetailsContext)
    const [videoId, setVideoId] = useState()
    // const [country, setCountry] = useState('')
    // const [language, setLanguage] = useState('')
    // const [cast, setCast] = useState()
    

//    if(MovieDetails.origin_country){
//     axios.get(`/configuration/countries?api_key=${API_KEY}`).then(res=>{
//         let country=res.data
//         let obj=country.find(o=>o.iso_3166_1===MovieDetails.origin_country[0])
//         setCountry(obj.english_name) 
//         })
//    }
//    axios.get(`/configuration/languages?api_key=${API_KEY}`).then(res=>{
//     let obj=res.data.find(o=>o.iso_639_1===MovieDetails.original_language)
//     setLanguage(obj.english_name)
//    })

    // if (isLargeRow){
    //     axios.get(`/tv/${MovieDetails.id}/credits?api_key=${API_KEY}&language=en-US`).then(res=>{
    //         console.log(res.data.cast);
    //         let obj=res.data.cast.find(o=>setCast({'name':o.original_name,'character':o.character}))
    //     })
    // }
    // console.log(cast);
    
   
   
  

      
    axios.get(`/movie/${MovieDetails.id}/videos?api_key=${API_KEY}`).then((response)=>{   
        //console.log(response.data.results[0].key);
        if(response.data.results.length>0){
            setVideoId(response.data.results[0].key)
        }
        
    }).catch(err=>{
       
    })
    //console.log(videoId);

   


    
    return (
        <div className='container-s'
        style={{
            backgroundSize:'contain',
            backgroundImage:`url(${isLargeRow ? imageUrl+MovieDetails.backdrop_path:imageUrl+MovieDetails.poster_path})`,
            backgroundRepeat:'no-repeat',
            backgroundBlendMode:'color'
            
        }}
        
        >
            
            <div className="details">
            
            <h1>{MovieDetails ? MovieDetails.name || MovieDetails.original_name ||  MovieDetails.title :""}</h1>
            <h5>{MovieDetails.overview}</h5>
            <p>{MovieDetails.first_air_date || MovieDetails.release_date }</p>
            <p>{MovieDetails.popularity}</p>
            <p>{MovieDetails.vote_average}</p>
            <p>Language:{language}</p>
            {country && <p>origin country :{country}</p>}
            {/* <img className={`img-p${isLargeRow && "img-b"}`} src={`${imageUrl}${ isLargeRow ? MovieDetails.backdrop_path :MovieDetails.poster_path}`} alt=''></img> */}
            </div>
                
            {videoId &&  isLargeRow===false &&
            <div className="video">
                
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId} `} 
            light={true} 
            width={540} height={200}
            config={{youtube: {playerVars: { showinfo: 1}} }} 
            list={null}
            controls={true}
            loop={true}
            pip={false}
            
            />
            </div>
            }
            
        </div>
    )
}

export default Show
