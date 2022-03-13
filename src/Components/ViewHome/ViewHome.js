import React, { useEffect } from 'react'
import Banner from '../Banner/Banner'
import Container from '../Container/Container'


export default function ViewHome() {
    useEffect(() => {
        document.title = 'FX-FilmX'
     }, []);
    return (
        <div style={{'position':'relative'}}>
        
            <Banner />
            <Container />
         
        </div>
    )
}
