import axios from '../../../axios'
import React, { useEffect, useState } from 'react'
import { API_KEY } from '../../../constants/constants'

function Trailer({TvMovie,ID}) {
    const [video, setVideo] = useState([])
    useEffect(() => {
        axios.get(`/${TvMovie}/${ID}}/videos?api_key=${API_KEY}&language=en-US`).then(res=>{
            res.data.results.map(e=>{
                if (e.type==='Trailer' || 'Teaser'  && e.site==='Youtube') {
                    setVideo([...video,e])
                }
            })
        })
    }, [ID,TvMovie])

    console.log(video[0].key.length)
    
    return (
        <div>
            {console.log(video[0])}
            <div>
                <h1>s</h1>
            </div>
        </div>
    )
}

export default Trailer
