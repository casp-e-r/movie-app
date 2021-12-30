import axios from '../../../axios'
import {getYear} from '../../../helpers/helper'
import React, { useEffect, useState } from 'react'
import { API_KEY } from '../../../constants/constants'
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './Trailer.css'
import {BsFillPlayFill} from 'react-icons/bs'
import {ImYoutube2} from 'react-icons/im'



function Trailer({TvMovie,ID,name,releaseYear}) {
    const [video, setVideo] = useState([])
    const [VideoModal, setVideoModal] = useState(false)
    const [modal, setModal] = useState(false)
    useEffect(() => {
        setVideo([])
        axios.get(`/${TvMovie}/${ID}}/videos?api_key=${API_KEY}&language=en-US`).then(res=>{
            res.data.results.map(e=>{
                if (e.type==='Trailer' || 'Teaser'  && e.site==='Youtube') {
                    setVideo(e)
                }
            })
        }).catch(err=>console.log(err))
        
    }, [ID,TvMovie,window])
    const youtube = 'https://www.youtube.com/results?search_query=';
   
    const modalStyle = {
        modal: {
          // background: '#0f1214',
          background:'#000',
          padding: '50px',
          borderRadius: '6px'
        },
        closeButton: {
          top: '10px',
          right: '10px'
        },
        closeIcon: {
          fill: '#fff'
        }
      };

    // video[0] && console.log(video[0].key.length)
    return (
        <div className='Trailer-outer'>
            {/* {console.log(video,ID)} */}
            <div className='trailer-search'>
            <ModalVideo
            channel="youtube"
            modalVideo="movie-modal-video"
            isOpen={VideoModal}
            onClose={()=>setVideoModal(false)}
            // playlist={!movie ? null : movie.videos.results[0] ? movie.videos.results.map(video => video.key) : null}
            videoId={video.length!=0 && video.key}
             />
              <Modal
              className='Modal'
                center
                onClose={()=>setModal(false)}
                open={modal}
                styles={modalStyle}
                >
        <h2>No Trailer Found</h2>
        <p>View in youtube instead</p>
        
        
        <a
          className="modal__link"
          href={`${youtube + name +' '  + getYear(releaseYear)}`}
          target="_blank">
        <ImYoutube2 
          color='red' 
          size={70}/>
          
        </a>
        
      </Modal>
            <button className='btn' onClick={()=>video.length===0?setModal(true):setVideoModal(true)}>
              T R A I L E R 
              <BsFillPlayFill/></button>
            </div>
        </div>
    )
}

export default Trailer
