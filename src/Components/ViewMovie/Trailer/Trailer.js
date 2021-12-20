import axios from '../../../axios'
import React, { useEffect, useState } from 'react'
import { API_KEY } from '../../../constants/constants'
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.css'


function Trailer({TvMovie,ID}) {
    const [video, setVideo] = useState([])
    const [VideoModal, setVideoModal] = useState(false)
    useEffect(() => {
        axios.get(`/${TvMovie}/${ID}}/videos?api_key=${API_KEY}&language=en-US`).then(res=>{
            res.data.results.map(e=>{
                if (e.type==='Trailer' || 'Teaser'  && e.site==='Youtube') {
                    setVideo(e)
                }
            })
        })
        
    }, [ID,TvMovie])
    

    // video[0] && console.log(video[0].key.length)
    
    return (
        <div className='Trailer-outer'>
            {console.log(video)}
            <div>
            <ModalVideo
            channel="youtube"
            modalVideo="movie-modal-video"
            isOpen={VideoModal}
            onClose={()=>setVideoModal(false)}
            // playlist={!movie ? null : movie.videos.results[0] ? movie.videos.results.map(video => video.key) : null}
            videoId={video.length!=0 && video.key}
      />
                <button onClick={()=>setVideoModal(true)}>s</button>
            </div>
        </div>
    )
}

export default Trailer
