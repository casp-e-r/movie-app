import React from 'react'
import Row from '../Row/Row'
import {API_KEY} from '../../constants/constants'
import requests from '../../requests'

function Tv() {
    // console.log(requests.tv.Latest);
    return (
        <div>
            <Row title='Popular' url={requests.tv.Popular} isLarge />
            <Row title='Latest' url={requests.tv.Latest} />

            <Row title='Action' url={requests.tv.Drama} />
            <Row title='Comedy' url={requests.tv.Comedy} />
            <Row title='Drama' url={requests.tv.Drama} />
            <Row title='Horror' url={requests.tv.Horror} />
            <Row title='Romance' url={requests.tv.Romance} />
            <Row title='Scifi' url={requests.tv.Scifi} />
            
        </div>
    )
}

export default Tv
