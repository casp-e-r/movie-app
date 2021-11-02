import React from 'react'
import Row from '../Row/Row'
import {API_KEY} from '../../constants/constants'

function Tv() {
    let urlt = `/discover/tv?api_key=${API_KEY}&with_genres=10759`
    return (
        <div>
            <Row title='action' url={urlt} isTv/>
        </div>
    )
}

export default Tv
