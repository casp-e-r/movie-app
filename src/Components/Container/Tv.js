import React from 'react'
import Row from '../Row/Row'
import requests from '../../requests'

function Tv() {
    return (
        <div>
            <Row title='Popular' url={requests.tv.Popular} isLarge />

            <Row title='Action and Adventure' url={requests.tv.ActionAdventure} />
            <Row title='Comedy' url={requests.tv.Comedy} />
            <Row title='Drama' url={requests.tv.Drama} />
            <Row title='Family' url={requests.tv.Family} />
            <Row title='Kids' url={requests.tv.Kids} />
            <Row title='Documentry' url={requests.tv.Documentary} />
            <Row title='Scifi Fantasy' url={requests.tv.ScifiFantasy} />
            <Row title='War and Politics' url={requests.tv.WarPolitics} />

            
        </div>
    )
}

export default Tv
